import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import FloatingChat from "../components/layout/FloatingChat";
import { getProductById } from "../services/sup-product";

const DetailProduct = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(productId);
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  const handleQuantityChange = (delta) => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity + delta));
  };

  if (loading) return <p>Loading...</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <div>
      <Header />
      <div className="container mx-auto p-8 flex space-x-10">
        {/* Bagian Gambar Produk */}
        <div className="w-1/2">
          <img
            src={product.image_url}
            alt={product.name}
            className="w-[600px] h-[400px] object-cover"
          />
        </div>

        {/* Bagian Detail Produk */}
        <div className="w-1/2 space-y-4">
          <h1 className="text-3xl font-semibold">{product.name}</h1>
          <p className="text-gray-700">{product.description}</p>

          {/* Dimensi Produk */}
          <div className="flex space-x-4 my-4">
            <div>
              <p className="text-gray-500">Height</p>
              <p className="font-semibold">{product.height} in</p>
            </div>
            <div>
              <p className="text-gray-500">Width</p>
              <p className="font-semibold">{product.width} in</p>
            </div>
          </div>

          <p className="text-3xl font-bold text-green-600">
            ${product.price.toFixed(2)}
          </p>

          {/* Kontrol Quantity */}
          <div className="flex items-center space-x-4 mt-4">
            <button
              onClick={() => handleQuantityChange(-1)}
              className="px-4 py-2 bg-gray-200 rounded"
            >
              -
            </button>
            <span className="text-xl">{quantity}</span>
            <button
              onClick={() => handleQuantityChange(1)}
              className="px-4 py-2 bg-gray-200 rounded"
            >
              +
            </button>
          </div>

          {/* Tombol Add to Cart */}
          <div className="flex space-x-4 mt-4">
            <button className="bg-yellow-600 text-white px-5 py-2 rounded">
              Add to Cart
            </button>
          </div>

          {/* Link Go Back */}
          <Link to="/catalog" className="text-gray-600 underline block mt-4">
            Go Back
          </Link>
        </div>
      </div>
      <Footer />
      <FloatingChat />
    </div>
  );
};

export default DetailProduct;
