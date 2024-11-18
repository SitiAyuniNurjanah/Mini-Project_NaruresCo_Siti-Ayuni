import React, { useState, useEffect } from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import FloatingChat from "../components/layout/FloatingChat";
import { Link, useLocation } from "react-router-dom";
import { getAllProducts } from "../services/sup-product";
import supabase from "../services/supabaseClient";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import { FaSearch } from "react-icons/fa";

// dungsi buat format rupiah
const formatRupiah = (value) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(value);

const truncateText = (text, maxLength) =>
  text.length > maxLength ? text.substring(0, maxLength) + "..." : text;

const Catalog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("default");
  const [selectedCategory, setSelectedCategory] = useState("Semua Kategori");
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const location = useLocation();

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getAllProducts();
      setProducts(data);
    };
    fetchProducts();

    if (location.state?.message) {
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase.from("category").select("*");
      if (error) {
        console.error("Error fetching categories:", error);
        return;
      }
      setCategories(data);
    };
    fetchCategories();
  }, []);

  // Handle untuk kategori
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  // fungsi untuk search dan sort by price
  const filteredProducts = products
    .filter((product) => {
      const matchesCategory =
        selectedCategory === "Semua Kategori" ||
        product.category_id === selectedCategory;
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortOrder === "highest") return b.price - a.price;
      if (sortOrder === "lowest") return a.price - b.price;
      return 0;
    });

  const isLoading = categories.length === 0;

  return (
    <>
      <Header />

      {/* Filter and Search Section */}
      <div className="container mx-auto">
        <div className="flex flex-col sm:flex-row justify-center items-center p-4 bg-2 rounded-lg shadow-md space-y-4 sm:space-y-0 sm:space-x-4">
          {/* Search Input */}
          <div className="relative w-full sm:w-3/4 lg:w-1/2">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full p-3 pl-10 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Sort Dropdown */}
          <select
            className="p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-300"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="default">Sort by</option>
            <option value="lowest">Price: Low to High</option>
            <option value="highest">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Categories Section */}
      <section className="my-30 container mx-auto px-2 py-2">
        <div className="my-15 container mx-auto mt-8">
          {isLoading ? (
            <div className="text-center">Loading categories...</div>
          ) : (
            <Swiper
              modules={[Pagination, Navigation]}
              spaceBetween={30}
              slidesPerView={3}
              breakpoints={{
                640: { slidesPerView: 3, spaceBetween: 20 },
                768: { slidesPerView: 4, spaceBetween: 30 },
                1024: { slidesPerView: 6, spaceBetween: 40 },
              }}
            >
              {categories.map((item) => (
                <SwiperSlide key={item.id}>
                  <div
                    className="tooltip tooltip-top"
                    data-tip={item.name}
                    onClick={() => handleCategoryClick(item.id)}
                  >
                    <div className="relative w-40 h-40 md:w-48 md:h-48 p-6">
                      <img
                        className="mx-auto rounded-full object-cover w-full h-full shadow-lg cursor-pointer"
                        src={item.image_url}
                        alt={item.name || "image"}
                      />
                      <p className="text-center mt-4 text-sm">{item.name}</p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </section>

      {/* Products Grid */}
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white p-4 rounded-lg shadow-lg transform hover:scale-105 transition-transform hover:shadow-2xl"
            >
              <Link to={`/detail/${product.id}`}>
                <div className="overflow-hidden rounded-lg">
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-40 object-cover"
                  />
                </div>
                <div className="mt-4">
                  <h2 className="text-lg font-semibold text-gray-800 truncate">
                    {product.name}
                  </h2>
                  <p className="text-xl font-bold text-green-600 mb-2">
                    {formatRupiah(product.price)}
                  </p>
                  <p className="text-sm text-gray-500 mb-1">
                    Stok: {product.quantity}
                  </p>
                  <p className="text-sm text-gray-500">
                    {truncateText(product.description, 50)}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <Footer />
      <FloatingChat />
    </>
  );
};

export default Catalog;
