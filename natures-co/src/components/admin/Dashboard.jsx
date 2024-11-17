import React, { Fragment, useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import supabase from "../../services/supabaseClient";

const Dashboard = () => {
  const [adminName, setAdminName] = useState("");
  const [adminPhoto, setAdminPhoto] = useState("");  // Menyimpan foto admin
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalCategories: 0,
    totalStock: 0,  // Untuk menyimpan total stok
  });

  useEffect(() => {
    const fetchAdminNameAndStats = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (session) {
        // Ambil data admin berdasarkan ID user (session.user.id)
        const { data, error } = await supabase
          .from("users")
          .select("name, image")  // Mengambil foto admin juga
          .eq("guid", session.user.id)
          .single();

        if (error) {
          console.error("Error fetching admin data:", error);
        } else {
          setAdminName(data.name); // Simpan nama admin
          setAdminPhoto(data.image);  // Simpan URL foto profil admin
        }

        // Ambil jumlah produk
        const { count: productCount, error: productError } = await supabase
          .from("product")
          .select("*", { count: "exact" });

        if (productError) {
          console.error("Error fetching product count:", productError);
        } else {
          setStats((prevStats) => ({
            ...prevStats,
            totalProducts: productCount,
          }));
        }

        // Ambil jumlah kategori
        const { count: categoryCount, error: categoryError } = await supabase
          .from("category")
          .select("*", { count: "exact" });

        if (categoryError) {
          console.error("Error fetching category count:", categoryError);
        } else {
          setStats((prevStats) => ({
            ...prevStats,
            totalCategories: categoryCount,
          }));
        }

        // Menghitung total stok produk
        const { data: products, error: productStockError } = await supabase
          .from("product")
          .select("quantity");

        if (productStockError) {
          console.error("Error fetching product stock:", productStockError);
        } else {
          // Hitung jumlah total stok dari semua produk
          const totalStock = products.reduce((acc, product) => acc + (product.quantity || 0), 0);
          setStats((prevStats) => ({
            ...prevStats,
            totalStock,
          }));
        }
      }
    };

    fetchAdminNameAndStats();
  }, []);

  return (
    <Fragment>
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 bg-5 p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
            </div>
          </div>

          {/* Welcome Section */}
          <div className="bg-2 p-6 rounded-xl mb-8 flex items-center">
            <div>
              <h2 className="text-3xl font-bold text-1">Hi, {adminName}</h2>
              <p className="text-1 text-sm">
                Kamu bisa menambah dan mengedit produk.
              </p>
            </div>
            <div className="ml-auto">
              <div
                className="h-20 w-20 rounded-full bg-cover bg-center"
                style={{
                  backgroundImage: `url(${adminPhoto || "/default-profile.jpg"})`, // Gambar admin atau fallback
                }}
              />
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            <div className="flex justify-center items-center">
              <div className="p-6 bg-yellow-300 rounded-lg shadow-md text-center w-full max-w-xs">
                <p>Product</p>
                <h3 className="text-xl font-bold">{stats.totalProducts}</h3>
              </div>
            </div>
            <div className="flex justify-center items-center">
              <div className="p-6 bg-blue-300 rounded-lg shadow-md text-center w-full max-w-xs">
                <p>Category</p>
                <h3 className="text-xl font-bold">{stats.totalCategories}</h3>
              </div>
            </div>
            <div className="flex justify-center items-center">
              <div className="p-6 bg-pink-300 rounded-lg shadow-md text-center w-full max-w-xs">
                <p>Total Stock</p>
                <h3 className="text-xl font-bold">{stats.totalStock}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Dashboard;
