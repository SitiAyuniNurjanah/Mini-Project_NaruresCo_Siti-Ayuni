// import React, { useState, useEffect } from "react";
// import { useParams, Link } from "react-router-dom";
// import Header from "../components/layout/Header";
// import Footer from "../components/layout/Footer";
// import FloatingChat from "../components/layout/FloatingChat";
// import { getProductById } from "../services/sup-product";
// import supabase from "../services/supabaseClient";

// const DetailProduct = () => {
//   const { productId } = useParams();
//   const [product, setProduct] = useState(null);
//   const [quantity, setQuantity] = useState(1);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [userId, setUserId] = useState(null);
//   const [notification, setNotification] = useState("");
//   const [isNotificationVisible, setIsNotificationVisible] = useState(false); // Untuk menampilkan/hilangkan notifikasi

//   const formatRupiah = (value) => {
//     return new Intl.NumberFormat("id-ID", {
//       style: "currency",
//       currency: "IDR",
//     }).format(value);
//   };

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const data = await getProductById(productId);
//         if (!data) {
//           throw new Error("Produk tidak ditemukan.");
//         }
//         setProduct(data);
//       } catch (err) {
//         setError(err.message || "Terjadi kesalahan saat memuat data.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProduct();
//   }, [productId]);

//   useEffect(() => {
//     const fetchUser = async () => {
//       const {
//         data: { user },
//       } = await supabase.auth.getUser();
//       console.log("Current User:", user);
//       if (user) {
//         setUserId(user.id);
//       } else {
//         console.log("User not logged in");
//       }
//     };

//     fetchUser();
//   }, []);

//   const handleQuantityChange = (delta) => {
//     setQuantity((prevQuantity) => Math.max(1, prevQuantity + delta));
//   };

//   const handleAddToCart = async () => {
//     if (!userId || !product) {
//       setNotification("Gagal menambahkan ke keranjang. Silakan coba lagi.");
//       return;
//     }

//     const totalPrice = product.price * quantity;

//     try {
//       const { data, error } = await supabase.from("cart").insert([
//         {
//           user_id: userId,
//           product_id: product.id,
//           quantity: quantity,
//           price: totalPrice,
//           created_at: new Date().toISOString(),
//         },
//       ]);

//       if (error) {
//         throw new Error("Gagal menambahkan produk ke keranjang.");
//       }

//       setNotification("Berhasil menambahkan ke keranjang!");
//     } catch (err) {
//       setNotification(err.message || "Terjadi kesalahan.");
//     }
//   };

//   // Menampilkan notifikasi dan kemudian menghilangkannya setelah 1 detik
//   useEffect(() => {
//     if (notification) {
//       setIsNotificationVisible(true);
//       const timer = setTimeout(() => {
//         setIsNotificationVisible(false);
//         setNotification(""); // Reset notifikasi setelah 1 detik
//       }, 2000);

//       return () => clearTimeout(timer);
//     }
//   }, [notification]);

//   if (loading) {
//     return (
//       <div>
//         <Header />
//         <div className="flex items-center justify-center min-h-screen">
//           <div className="loader"></div> {/* Spinner */}
//           <p className="ml-4 text-lg font-semibold">
//             Sedang memuat detail produk...
//           </p>
//         </div>
//         <Footer />
//         <FloatingChat />
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div>
//         <Header />
//         <div className="container mx-auto p-8 text-center">
//           <p className="text-red-500 font-semibold">{error}</p>
//           <Link to="/catalog" className="text-gray-600 underline">
//             Kembali ke Katalog
//           </Link>
//         </div>
//         <Footer />
//         <FloatingChat />
//       </div>
//     );
//   }

//   const isOutOfStock = product.quantity === 0;

//   return (
//     <div>
//       <Header />
//       <div className="container mx-auto p-8 flex space-x-10">
//         {/* Bagian Gambar Produk */}
//         <div className="w-1/2">
//           <img
//             src={product.image_url}
//             alt={product.name}
//             className="w-[600px] h-[400px] object-cover rounded-lg shadow-lg"
//           />
//         </div>

//         {/* Bagian Detail Produk */}
//         <div className="w-1/2 space-y-4">
//           <h1 className="text-3xl font-semibold">{product.name}</h1>
//           <p className="text-gray-700">{product.description}</p>
//           <p className="text-3xl font-bold text-green-600">
//             {formatRupiah(product.price)}
//           </p>

//           {/* Kontrol Stok dan Quantity */}
//           {isOutOfStock ? (
//             <p className="text-red-600 font-bold">Stok Habis</p>
//           ) : (
//             <div className="flex items-center space-x-4 mt-4">
//               <button
//                 onClick={() => handleQuantityChange(-1)}
//                 className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
//               >
//                 -
//               </button>
//               <span className="text-xl">{quantity}</span>
//               <button
//                 onClick={() => handleQuantityChange(1)}
//                 className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
//               >
//                 +
//               </button>
//             </div>
//           )}

//           {/* Tombol Add to Cart */}
//           <div className="flex space-x-4 mt-4">
//             <button
//               onClick={handleAddToCart}
//               className={`bg-yellow-600 text-white px-5 py-2 rounded ${
//                 isOutOfStock
//                   ? "opacity-50 cursor-not-allowed"
//                   : "hover:bg-yellow-700"
//               }`}
//               disabled={isOutOfStock}
//             >
//               Add to Cart
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Notifikasi */}
//       {isNotificationVisible && notification && (
//         <div
//           className="fixed bottom-7 right-24 transform transition-all duration-500 bg-gray-800 text-white px-4 py-2 rounded shadow-lg"
//           onClick={() => setNotification("")}
//         >
//           {notification}
//         </div>
//       )}

//       <Footer />
//       <FloatingChat />
//     </div>
//   );
// };

// export default DetailProduct;
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
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);
  const [notification, setNotification] = useState("");
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);

  useEffect(() => {
    fetchProductDetails(productId);
    fetchUserDetails();
  }, [productId]);

  const fetchProductDetails = async (productId) => {
    try {
      const data = await getProductById(productId);
      if (!data) throw new Error("Produk tidak ditemukan.");
      setProduct(data);
    } catch (err) {
      setError(err.message || "Terjadi kesalahan saat memuat data.");
    } finally {
      setLoading(false);
    }
  };

  const fetchUserDetails = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      setUserId(user.id);
    }
  };

  const handleQuantityChange = (delta) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  const handleAddToCart = async () => {
    if (!userId || !product) {
      showNotification("Gagal menambahkan ke keranjang. Silakan coba lagi.");
      return;
    }

    try {
      const totalPrice = product.price * quantity;
      await addToCart(userId, product.id, quantity, totalPrice);
      showNotification("Berhasil menambahkan ke keranjang!");
    } catch (err) {
      showNotification(err.message || "Terjadi kesalahan.");
    }
  };

  const addToCart = async (userId, productId, quantity, totalPrice) => {
    const { error } = await supabase.from("cart").insert([
      { user_id: userId, product_id: productId, quantity, price: totalPrice, created_at: new Date().toISOString() },
    ]);
    if (error) throw new Error("Gagal menambahkan produk ke keranjang.");
  };

  const showNotification = (message) => {
    setNotification(message);
    setIsNotificationVisible(true);
    setTimeout(() => {
      setIsNotificationVisible(false);
      setNotification("");
    }, 2000);
  };

  const formatRupiah = (value) => {
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(value);
  };

  if (loading) {
    return renderLoadingState();
  }

  if (error) {
    return renderErrorState();
  }

  const isOutOfStock = product.quantity === 0;

  return (
    <div>
      <Header />
      <div className="container mx-auto p-8 flex space-x-10">
        {renderProductImage()}
        {renderProductDetails(isOutOfStock)}
      </div>
      {renderNotification()}
      <Footer />
      <FloatingChat />
    </div>
  );

  function renderLoadingState() {
    return (
      <div>
        <Header />
        <div className="flex items-center justify-center min-h-screen">
          <div className="loader"></div> {/* Spinner */}
          <p className="ml-4 text-lg font-semibold">Sedang memuat detail produk...</p>
        </div>
        <Footer />
        <FloatingChat />
      </div>
    );
  }

  function renderErrorState() {
    return (
      <div>
        <Header />
        <div className="container mx-auto p-8 text-center">
          <p className="text-red-500 font-semibold">{error}</p>
          <Link to="/catalog" className="text-gray-600 underline">
            Kembali ke Katalog
          </Link>
        </div>
        <Footer />
        <FloatingChat />
      </div>
    );
  }

  function renderProductImage() {
    return (
      <div className="w-1/2">
        <img
          src={product.image_url}
          alt={product.name}
          className="w-[600px] h-[400px] object-cover rounded-lg shadow-lg"
        />
      </div>
    );
  }

  function renderProductDetails(isOutOfStock) {
    return (
      <div className="w-1/2 space-y-4">
        <h1 className="text-3xl font-semibold">{product.name}</h1>
        <p className="text-gray-700">{product.description}</p>
        <p className="text-3xl font-bold text-green-600">{formatRupiah(product.price)}</p>
        {renderStockAndQuantityControl(isOutOfStock)}
        {renderAddToCartButton(isOutOfStock)}
      </div>
    );
  }

  function renderStockAndQuantityControl(isOutOfStock) {
    return isOutOfStock ? (
      <p className="text-red-600 font-bold">Stok Habis</p>
    ) : (
      <div className="flex items-center space-x-4 mt-4">
        <button
          onClick={() => handleQuantityChange(-1)}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          -
        </button>
        <span className="text-xl">{quantity}</span>
        <button
          onClick={() => handleQuantityChange(1)}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          +
        </button>
      </div>
    );
  }

  function renderAddToCartButton(isOutOfStock) {
    return (
      <div className="flex space-x-4 mt-4">
        <button
          onClick={handleAddToCart}
          className={`bg-yellow-600 text-white px-5 py-2 rounded ${
            isOutOfStock ? "opacity-50 cursor-not-allowed" : "hover:bg-yellow-700"
          }`}
          disabled={isOutOfStock}
        >
          Add to Cart
        </button>
      </div>
    );
  }

  function renderNotification() {
    return (
      isNotificationVisible && notification && (
        <div
          className="fixed bottom-7 right-24 transform transition-all duration-500 bg-gray-800 text-white px-4 py-2 rounded shadow-lg"
          onClick={() => setNotification("")}
        >
          {notification}
        </div>
      )
    );
  }
};

export default DetailProduct;
