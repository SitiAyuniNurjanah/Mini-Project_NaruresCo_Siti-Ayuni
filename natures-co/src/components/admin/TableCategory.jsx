import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { deleteCategory, getAllCategories } from "../../services/sup-category";
import { useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import Swal from "sweetalert2";

const TableCategory = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    loadCategories();
  }, []);

  // Fetch category dari API
  const loadCategories = async () => {
    setLoading(true);
    try {
      const data = await getAllCategories();
      setCategories(data);
      setErrorMessage("");
    } catch (error) {
      console.error("Error fetching categories:", error);
      setErrorMessage("Gagal memuat data kategori.");
    } finally {
      setLoading(false);
    }
  };

  //fungsi untuk menghapus category
  const confirmDeleteCategory = (id) => {
    Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Kategori yang dihapus tidak dapat dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteCategoryById(id);
      }
    });
  };

  const deleteCategoryById = async (id) => {
    setLoading(true);
    try {
      const success = await deleteCategory(id);
      if (success) {
        Swal.fire("Terhapus!", "Kategori berhasil dihapus.", "success");
        loadCategories();
      } else {
        Swal.fire("Gagal!", "Kategori gagal dihapus.", "error");
      }
    } catch (error) {
      console.error("Error deleting category:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (category) => {
    navigate("/form-category", { state: { category, isEdit: true } });
  };

  // Render untuk memuat pesan kesalah
  const renderLoading = () =>
    loading && <p className="text-center">Memuat data...</p>;

  const renderErrorMessage = () =>
    errorMessage && <p className="text-center text-red-600">{errorMessage}</p>;

  const renderTableRows = () =>
    categories.map((category, index) => (
      <tr key={category.id} className="text-center">
        <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
        <td className="border border-gray-300 px-4 py-2">{category.name}</td>
        <td className="border border-gray-300 px-4 py-2 text-left">
          <p className="whitespace-normal">{category.description}</p>
        </td>
        <td className="border border-gray-300 px-4 py-2">
          {category.image_url && (
            <img
              src={category.image_url}
              alt={category.name}
              className="w-16 h-16 object-cover rounded-md mx-auto"
            />
          )}
        </td>
        <td className="border border-gray-300 px-4 py-2">
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => handleEdit(category)}
              className="p-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              <FaEdit size={20} />
            </button>
            <button
              onClick={() => confirmDeleteCategory(category.id)}
              className="p-2 bg-red-200 rounded hover:bg-red-300"
            >
              <FaTrashCan size={20} />
            </button>
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
            Daftar Kategori
          </h2>
          {renderLoading()}
          {renderErrorMessage()}
          <table className="table-auto w-full border-collapse border border-gray-300 mt-5">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="border border-gray-300 px-4 py-2 w-12">No</th>
                <th className="border border-gray-300 px-4 py-2">Nama</th>
                <th className="border border-gray-300 px-4 py-2 w-2/5">
                  Deskripsi
                </th>
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

export default TableCategory;
