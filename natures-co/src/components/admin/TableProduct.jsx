import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { getAllProducts, deleteProduct } from "../../services/sup-product";
import Sidebar from "./Sidebar";
import { FaEdit, FaEye } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import Swal from "sweetalert2";

const TableProduct = () => {
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetchProducts();

    if (location.state?.message) {
      setMessage(location.state.message);
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await getAllProducts();
      setProducts(data);
      setMessage("");
    } catch (err) {
      console.error("Error fetching products:", err);
      setMessage("Gagal memuat data produk.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Produk yang dihapus tidak dapat dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoading(true);
        try {
          const success = await deleteProduct(id);
          if (success) {
            Swal.fire("Terhapus!", "Produk berhasil dihapus.", "success");
            fetchProducts();
          } else {
            Swal.fire("Gagal!", "Produk gagal dihapus.", "error");
          }
        } catch (error) {
          console.error("Error deleting product:", error);
        } finally {
          setLoading(false);
        }
      }
    });
  };

  const handleEdit = (product) => {
    navigate("/form", { state: { product } });
  };

  const formatRupiah = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(value);
  };

  const renderLoading = () =>
    loading && <p className="text-center">Memuat data...</p>;

  const renderMessage = () =>
    message && <p className="text-center text-green-600">{message}</p>;

  const renderTableRows = () =>
    products.map((product, index) => (
      <tr key={product.id} className="text-center">
        <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
        <td className="border border-gray-300 px-4 py-2">{product.name}</td>
        <td className="border border-gray-300 px-4 py-2 text-left">
          <p className="whitespace-normal">{product.description}</p>
        </td>
        <td className="border border-gray-300 px-4 py-2">
          {formatRupiah(product.price)}
        </td>
        <td className="border border-gray-300 px-4 py-2">{product.quantity}</td>
        <td className="border border-gray-300 px-4 py-2">
          {product.image_url && (
            <img
              src={product.image_url}
              alt={product.name}
              className="w-16 h-16 object-cover rounded-md mx-auto"
            />
          )}
        </td>
        <td className="border border-gray-300 px-4 py-2">
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => handleEdit(product)}
              className="p-2 bg-gray-200 rounded hover:bg-gray-300"
              title="Edit"
            >
              <FaEdit size={20} />
            </button>
            <button
              onClick={() => handleDelete(product.id)}
              className="p-2 bg-red-200 rounded hover:bg-red-300"
              title="Delete"
            >
              <FaTrashCan size={20} />
            </button>
            <Link
              to={`/detail/${product.id}`}
              className="p-2 bg-blue-200 rounded hover:bg-blue-300"
              title="View Details"
            >
              <FaEye size={20} />
            </Link>
          </div>
        </td>
      </tr>
    ));

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 bg-gray-100 p-6 overflow-auto">
        <div className="max-w-5xl mx-auto p-6 bg-white rounded-xl shadow-xl border border-gray-300">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-5">
            Daftar Produk
          </h2>
          {renderLoading()}
          {renderMessage()}
          <table className="table-auto w-full border-collapse border border-gray-300 mt-5">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="border border-gray-300 px-4 py-2 w-12">No</th>
                <th className="border border-gray-300 px-4 py-2">Nama</th>
                <th className="border border-gray-300 px-4 py-2 w-2/5">
                  Deskripsi
                </th>
                <th className="border border-gray-300 px-4 py-2">Harga</th>
                <th className="border border-gray-300 px-4 py-2">Stok</th>
                <th className="border border-gray-300 px-4 py-2">Gambar</th>
                <th className="border border-gray-300 px-4 py-2">Aksi</th>
              </tr>
            </thead>
            <tbody>{renderTableRows()}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TableProduct;
