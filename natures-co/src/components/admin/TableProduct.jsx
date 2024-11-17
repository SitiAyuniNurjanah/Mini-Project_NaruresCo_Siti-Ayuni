import React, { Fragment, useEffect, useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { getAllProducts, deleteProduct } from '../services/sup-product';
import HeaderAdmin from '../components/Sidebar';
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";

const TableProduct = () => {
  const [products, setProducts] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getAllProducts();
      setProducts(data); // Mengatur data produk yang diterima ke state
    };
    fetchProducts();

    if (location.state && location.state.message) {
      setSuccessMessage(location.state.message);
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (confirmDelete) {
      deleteProduct(id, (success) => {
        if (success) {
          setProducts(products.filter(product => product.id !== id));
          setSuccessMessage("Product deleted successfully!");
        }
      });
    }
  };

  const handleEdit = (product) => {
    navigate('/form', { state: { product } });
  };

  // Fungsi format harga menjadi Rupiah
  const formatRupiah = (value) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(value);
  };

  return (
    <Fragment>
      <div className="flex h-screen">
        <HeaderAdmin /> {/* Sidebar di kiri */}
        <div className="flex-1 bg-5 p-8"> {/* TableProduct di kanan */}
          <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>

          {successMessage && (
            <div className="alert alert-success shadow-lg mb-4">
              <div>
                <span className='text-white'>{successMessage}</span>
              </div>
            </div>
          )}

          <div className="overflow-x-auto mt-6">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={product.image_url}
                            alt={product.name}
                            className="object-cover"
                          />
                        </div>
                      </div>
                    </td>
                    <td>{product.name}</td>
                    <td>{formatRupiah(product.price)}</td>
                    <td>{product.quantity}</td>
                    <td>{product.description}</td>
                    <td className="flex items-center space-x-2">
                      <button
                        onClick={() => handleEdit(product)}
                        className="btn btn-primary btn-xs flex items-center"
                        title="Edit"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="btn btn-error btn-xs flex items-center"
                        title="Delete"
                      >
                        <FaTrash />
                      </button>
                      <Link
                        to={`/detail/${product.id}`}
                        className="btn btn-info btn-xs flex items-center"
                        title="View Details"
                      >
                        <FaEye />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default TableProduct;
