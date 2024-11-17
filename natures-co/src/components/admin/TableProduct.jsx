import React, { Fragment, useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { getAllProducts, deleteProduct } from "../../services/sup-product";
import Sidebar from "./Sidebar";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";

const TableProduct = () => {
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetchProducts();
    if (location.state && location.state.message) {
      setMessage(location.state.message);
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await getAllProducts();
      setProducts(data);
    } catch (err) {
      console.error("Error fetching products:", err.message);
      setMessage("Gagal memuat data produk");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id) => {
    setProductToDelete(id);
    setModalOpen(true);
  };

  const confirmDelete = async () => {
    setLoading(true);
    deleteProduct(productToDelete, async (success) => {
      if (success) {
        setMessage("Produk berhasil dihapus.");
        fetchProducts();
      } else {
        setMessage("Gagal menghapus produk.");
      }
      setLoading(false);
      setModalOpen(false);
    });
  };

  const handleEdit = (product) => {
    navigate("/form", { state: { product } });
  };

  // Fungsi format harga menjadi Rupiah
  const formatRupiah = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(value);
  };

  return (
    <Fragment>
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 bg-gray-100 p-6 overflow-auto">
          <div className="max-w-5xl mx-auto p-6 bg-white rounded-xl shadow-xl border border-gray-300">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-5">
              Daftar Produk
            </h2>
            {loading && <p className="text-center">Memuat data...</p>}
            {message && <p className="text-center text-green-600">{message}</p>}

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
              <tbody>
                {products.map((product, index) => (
                  <tr key={product.id} className="text-center">
                    <td className="border border-gray-300 px-4 py-2">
                      {index + 1}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {product.name}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-left">
                      <p className="whitespace-normal">{product.description}</p>
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {formatRupiah(product.price)}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {product.quantity}
                    </td>
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
                          <FaTrash size={20} />
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
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal Konfirmasi Hapus */}
      <input
        type="checkbox"
        id="my-modal"
        className="modal-toggle"
        checked={modalOpen}
        readOnly
      />
      <div className="modal">
        <div className="modal-box">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Konfirmasi Penghapusan
          </h2>
          <p className="mb-4">Apakah Anda yakin ingin menghapus produk ini?</p>
          <div className="modal-action">
            <button className="btn btn-error" onClick={confirmDelete}>
              Hapus
            </button>
            <label
              htmlFor="my-modal"
              className="btn"
              onClick={() => setModalOpen(false)}
            >
              Batal
            </label>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default TableProduct;
