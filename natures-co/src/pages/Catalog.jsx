import React, { Fragment, useState, useEffect } from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import FloatingChat from "../components/layout/FloatingChat";
import { Link } from "react-router-dom";
import { getAllProducts } from '../services/sup-product';
import { useLocation } from "react-router-dom";
import supabase from "../services/supabaseClient";

const Catalog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('default');
  const [selectedCategory, setSelectedCategory] = useState('Semua Kategori');
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getAllProducts();
      setProducts(data);
    };
    fetchProducts();

    if (location.state && location.state.message) {
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase.from('category').select('*');
      if (error) {
        console.error("Error fetching categories:", error);
        return;
      }
      setCategories(data);
    };
    fetchCategories();
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const filteredProducts = products
    .filter((product) => {
      const matchesCategory = selectedCategory === 'Semua Kategori' || product.category_id === selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortOrder === 'highest') return b.price - a.price;
      if (sortOrder === 'lowest') return a.price - b.price;
      return 0;
    });

  const isLoading = categories.length === 0;

  return (
    <Fragment>
      <Header />

      {/* Section untuk Filter dan Search */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row justify-between items-center p-4 bg-gray-100 rounded-lg shadow-md">
          <input
            type="text"
            placeholder="Search products..."
            className="p-2 border rounded-lg w-full sm:w-1/2 md:w-1/3 mr-4 shadow-sm focus:outline-none focus:ring focus:border-blue-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="p-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="default">Sort by</option>
            <option value="lowest">Price: Low to High</option>
            <option value="highest">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Kategori */}
      <section className="container mx-auto px-4 my-10" id="category">
        <div className="text-black text-2xl my-6 text-center">
          <h1 className="font-bold">Kategori</h1>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {isLoading ? (
            Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="flex flex-col items-center gap-2 animate-pulse"
              >
                <div className="rounded-full w-24 h-24 md:w-32 md:h-32 bg-gray-200"></div>
                <div className="h-4 w-16 bg-gray-200 rounded"></div>
              </div>
            ))
          ) : (
            categories.map((item, index) => (
              <div
                key={index}
                onClick={() => handleCategoryClick(item.id)}
                className="flex flex-col items-center justify-center cursor-pointer"
              >
                <div className="relative w-20 h-20 md:w-28 md:h-28 rounded-full overflow-hidden border-2 border-gray-300 shadow-lg hover:scale-105 transition-transform">
                  <img
                    className="w-full h-full object-cover"
                    src={item.image_url}
                    alt={item.name || 'image'}
                  />
                </div>
                <p className="text-center mt-2 text-sm font-medium">{item.name}</p>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Grid Produk */}
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white p-4 rounded-lg shadow-lg transform hover:scale-105 transition-transform hover:shadow-2xl"
            >
              <Link to={`/detail/${product.id}`} className="block">
                <div className="overflow-hidden rounded-lg">
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-40 object-cover cursor-pointer"
                  />
                </div>
                <div className="mt-4">
                  <h2 className="text-lg font-semibold text-gray-800 truncate">{product.name}</h2>
                  <p className="text-xl font-bold text-green-600 mb-2">
                    ${product.price}
                  </p>
                  <p className="text-sm text-gray-500">{product.description}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <Footer />
      <FloatingChat />
    </Fragment>
  );
};

export default Catalog;
