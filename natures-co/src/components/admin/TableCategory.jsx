import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import { deleteCategory, getAllCategories } from '../../services/sup-category';
import { useNavigate } from 'react-router-dom';
import { FaTrashCan } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";

const TableCategory = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [modalOpen, setModalOpen] = useState(false); 
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const data = await getAllCategories();
      setCategories(data);
    } catch (err) {
      console.error('Error fetching categories:', err.message);
      setMessage('Gagal memuat data kategori');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setCategoryToDelete(id);
    setModalOpen(true);
  };

  const confirmDelete = async () => {
    setLoading(true);
    deleteCategory(categoryToDelete, async (success) => {
      if (success) {
        setMessage('Kategori berhasil dihapus.');
        fetchCategories();
      } else {
        setMessage('Gagal menghapus kategori.');
      }
      setLoading(false);
      setModalOpen(false);
    });
  };

  const handleEdit = (category) => {
    navigate('/form-category', { state: { category, isEdit: true } });
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 bg-gray-100 p-6 overflow-auto">
        <div className="max-w-5xl mx-auto p-6 bg-white rounded-xl shadow-xl border border-gray-300">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-5">Daftar Kategori</h2>
          {loading && <p className="text-center">Memuat data...</p>}
          {message && <p className="text-center text-green-600">{message}</p>}
          <table className="table-auto w-full border-collapse border border-gray-300 mt-5">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="border border-gray-300 px-4 py-2 w-12">#</th>
                <th className="border border-gray-300 px-4 py-2">Nama</th>
                <th className="border border-gray-300 px-4 py-2 w-2/5">Deskripsi</th>
                <th className="border border-gray-300 px-4 py-2">Gambar</th>
                <th className="border border-gray-300 px-4 py-2">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category, index) => (
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
                        onClick={() => handleDelete(category.id)}
                        className="p-2 bg-red-200 rounded hover:bg-red-300"
                      >
                        <FaTrashCan size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Konfirmasi Hapus */}
      <input type="checkbox" id="my-modal" className="modal-toggle" checked={modalOpen} readOnly />
      <div className="modal">
        <div className="modal-box">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Konfirmasi Penghapusan</h2>
          <p className="mb-4">Apakah Anda yakin ingin menghapus kategori ini?</p>
          <div className="modal-action">
            <button
              className="btn btn-error"
              onClick={confirmDelete}
            >
              Hapus
            </button>
            <label htmlFor="my-modal" className="btn" onClick={() => setModalOpen(false)}>
              Batal
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableCategory;
