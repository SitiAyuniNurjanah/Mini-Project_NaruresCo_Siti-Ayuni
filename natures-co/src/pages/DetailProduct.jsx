import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import FloatingChat from "../components/layout/FloatingChat";
import { getProductById } from "../services/sup-product";
import supabase from "../services/supabaseClient";

const DetailProduct = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  const formatRupiah = (value) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(value);
  };

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

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      console.log("Current User:", user);
      if (user) {
        setUserId(user.id);
      } else {
        console.log("User not logged in");
      }
    };

    fetchUser();
  }, []);

  const handleQuantityChange = (delta) => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity + delta));
  };

  const handleAddToCart = async () => {
    if (!userId) {
      return;
    }

    const totalPrice = product.price * quantity;

    console.log("User ID:", userId);
    console.log("Product ID:", product.id);
    console.log("Quantity:", quantity);
    console.log("Total Price:", totalPrice);

    try {
      const { data, error } = await supabase.from("cart").insert([
        {
          user_id: userId,
          product_id: product.id,
          quantity: quantity,
          price: totalPrice,
          created_at: new Date().toISOString(),
        },
      ]);

      if (error) {
        console.error("Error adding to cart:", error.message);
      } else {
        console.log("Data added to cart:", data);
      }
    } catch (error) {
      console.error("Error adding to cart:", error.message);
    }
  };

  const isOutOfStock = product.quantity === 0;

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

          <p className="text-3xl font-bold text-green-600">
            {formatRupiah(product.price)}
          </p>

          {/* Kontrol Stok dan Quantity */}
          {isOutOfStock ? (
            <p className="text-red-600 font-bold">Stok Habis</p>
          ) : (
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
          )}

          {/* Tombol Add to Cart */}
          <div className="flex space-x-4 mt-4">
            <button
              onClick={handleAddToCart}
              className={`bg-yellow-600 text-white px-5 py-2 rounded ${
                isOutOfStock ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isOutOfStock}
            >
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
