import React, { Fragment, useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import supabase from "../../services/supabaseClient";

const Dashboard = () => {
  const [adminData, setAdminData] = useState({
    name: "",
    photo: "",
    stats: {
      totalProducts: 0,
      totalCategories: 0,
      totalStock: 0,
    },
  });

  // Fungsi untuk mengambil data admin
  const fetchAdminData = async (userId) => {
    const { data, error } = await supabase
      .from("users")
      .select("name, image")
      .eq("guid", userId)
      .single();

    if (error) {
      console.error("Error fetching admin data:", error);
      return;
    }

    return { name: data.name, photo: data.image };
  };

  // Fungsi untuk mengambil jumlah produk
  const fetchProductCount = async () => {
    const { count, error } = await supabase
      .from("product")
      .select("*", { count: "exact" });

    if (error) {
      console.error("Error fetching product count:", error);
      return 0;
    }

    return count;
  };

  // Fungsi untuk mengambil jumlah kategori
  const fetchCategoryCount = async () => {
    const { count, error } = await supabase
      .from("category")
      .select("*", { count: "exact" });

    if (error) {
      console.error("Error fetching category count:", error);
      return 0;
    }

    return count;
  };

  // Fungsi untuk menghitung total stok produk
  const fetchProductStock = async () => {
    const { data, error } = await supabase.from("product").select("quantity");

    if (error) {
      console.error("Error fetching product stock:", error);
      return 0;
    }

    return data.reduce((acc, product) => acc + (product.quantity || 0), 0);
  };

  // Mengambil data dan statistik saat komponen pertama kali dimuat
  useEffect(() => {
    const fetchAdminNameAndStats = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        const admin = await fetchAdminData(session.user.id);
        const productCount = await fetchProductCount();
        const categoryCount = await fetchCategoryCount();
        const totalStock = await fetchProductStock();

        // Memperbarui state dengan data yang diperoleh
        setAdminData({
          name: admin.name,
          photo: admin.photo || "/default-profile.jpg", // fallback jika foto tidak ada
          stats: {
            totalProducts: productCount,
            totalCategories: categoryCount,
            totalStock,
          },
        });
      }
    };

    fetchAdminNameAndStats();
  }, []);

  return (
    <Fragment>
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 bg-gray-100 p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
            </div>
          </div>

          {/* Welcome Section */}
          <div className="bg-4 p-6 rounded-xl mb-8 flex items-center">
            <div>
              <h2 className="text-3xl font-bold text-1">Hi, {adminData.name}</h2>
              <p className="text-1 text-sm mt-2">
                Kamu bisa menambah dan mengedit produk.
              </p>
            </div>
            <div className="ml-auto">
              <div
                className="h-20 w-20 rounded-full bg-cover bg-center"
                style={{
                  backgroundImage: `url(${adminData.photo})`,
                }}
              />
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            <div className="flex justify-center items-center">
              <div className="p-6 bg-yellow-300 rounded-lg shadow-md text-center w-full max-w-xs">
                <p>Product</p>
                <h3 className="text-xl font-bold">{adminData.stats.totalProducts}</h3>
              </div>
            </div>
            <div className="flex justify-center items-center">
              <div className="p-6 bg-blue-300 rounded-lg shadow-md text-center w-full max-w-xs">
                <p>Category</p>
                <h3 className="text-xl font-bold">{adminData.stats.totalCategories}</h3>
              </div>
            </div>
            <div className="flex justify-center items-center">
              <div className="p-6 bg-pink-300 rounded-lg shadow-md text-center w-full max-w-xs">
                <p>Total Stock</p>
                <h3 className="text-xl font-bold">{adminData.stats.totalStock}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Dashboard;
