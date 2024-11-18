import React, { useState, useEffect, Fragment } from "react";
import supabase from "../services/supabaseClient";
import { FaTrashAlt } from "react-icons/fa";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import FloatingChat from "../components/layout/FloatingChat";
import Swal from "sweetalert2";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [userId, setUserId] = useState(null);
  const [subtotal, setSubtotal] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    shipping: "",
    payment: ""
  });
  const [isLoading, setIsLoading] = useState(true);

  const formatRupiah = (value) => new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR"
  }).format(value);

  const isFormValid = Object.values(formData).every(value => value.trim() !== "");

  // Mendapatkan ID pengguna yang sedang login
  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) setUserId(user.id);
    };
    fetchUser();
  }, []);

  // Mengambil item keranjang dari database Supabase
  useEffect(() => {
    if (!userId) return;

    const fetchCartItems = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from("cart")
          .select("*, product (*)")
          .eq("user_id", userId);

        if (error) {
          console.error("Error fetching cart items:", error.message);
        } else {
          setCartItems(data || []);
          updateSubtotal(data || []);
        }
      } catch (error) {
        console.error("Error fetching cart items:", error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCartItems();
  }, [userId]);

  const updateSubtotal = (items) => {
    const total = items.reduce((acc, item) => (
      item.selected ? acc + item.product.price * item.quantity : acc
    ), 0);
    setSubtotal(total);
  };

  const handleQuantityChange = (cartId, change) => {
    const updatedItems = cartItems.map(item => (
      item.id === cartId ? { ...item, quantity: Math.max(item.quantity + change, 1) } : item
    ));
    setCartItems(updatedItems);
    updateSubtotal(updatedItems);
  };

  const handleSelectItem = (cartId) => {
    const updatedItems = cartItems.map(item => (
      item.id === cartId ? { ...item, selected: !item.selected } : item
    ));
    setCartItems(updatedItems);
    updateSubtotal(updatedItems);
  };

  const handleRemoveFromCart = async (cartId) => {
    try {
      const { error } = await supabase.from("cart").delete().eq("id", cartId);
      if (error) throw new Error(error.message);

      const updatedItems = cartItems.filter(item => item.id !== cartId);
      setCartItems(updatedItems);
      updateSubtotal(updatedItems);
    } catch (error) {
      console.error("Error removing item:", error.message);
    }
  };

  const handleCheckout = async () => {
    if (!isFormValid) return;

    try {
      await processOrder();
      resetCart();
      Swal.fire({
        icon: "success",
        title: "Checkout Berhasil!",
        text: "Pesanan Anda telah berhasil diproses.",
        confirmButtonText: "OK",
      });
    } catch (error) {
      console.error("Error during checkout:", error.message);
    }
  };

  const processOrder = async () => {
    for (const item of cartItems) {
      if (!item.selected) continue;

      const { data: product, error: productError } = await supabase
        .from("product")
        .select("quantity")
        .eq("id", item.product_id)
        .single();

      if (productError || product.quantity < item.quantity) {
        alert(`Stok untuk produk ${item.product.name} tidak mencukupi.`);
        throw new Error("Stok tidak mencukupi");
      }

      await supabase.from("product")
        .update({ quantity: product.quantity - item.quantity })
        .eq("id", item.product_id);
    }

    const selectedIds = cartItems.filter(item => item.selected).map(item => item.id);
    if (selectedIds.length > 0) {
      const { error: deleteError } = await supabase
        .from("cart")
        .delete()
        .in("id", selectedIds);
      if (deleteError) throw new Error(deleteError.message);
    }
  };

  const resetCart = () => {
    setCartItems(cartItems.filter(item => !item.selected));
    setFormData({
      name: "",
      phone: "",
      address: "",
      shipping: "",
      payment: ""
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Fragment>
      <Header />
      <div className="container mx-auto min-h-screen p-8 bg-1">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 bg-white shadow p-6 rounded-lg overflow-y-auto max-h-[600px]">
            <h1 className="text-2xl font-semibold mb-6">Shopping Cart</h1>
            {isLoading ? (
              <div className="text-center py-10 text-gray-500">Sedang memuat keranjang...</div>
            ) : cartItems.length === 0 ? (
              <p>Keranjang Anda kosong.</p>
            ) : (
              cartItems.map(item => (
                <div key={item.id} className="flex items-center justify-between border-b pb-4 mb-4">
                  <input
                    type="checkbox"
                    checked={item.selected || false}
                    onChange={() => handleSelectItem(item.id)}
                    className="mr-4"
                  />
                  <img
                    src={item.product?.image_url || ""}
                    alt={item.product?.name || "Product"}
                    className="w-20 h-20"
                  />
                  <div className="flex-grow ml-4">
                    <h2 className="font-semibold text-lg">{item.product?.name || "Product"}</h2>
                    <p className="text-gray-500">{formatRupiah(item.product?.price || 0)}</p>
                  </div>
                  <div className="flex items-center">
                    <button onClick={() => handleQuantityChange(item.id, -1)} className="px-2">-</button>
                    <span className="px-2">{item.quantity}</span>
                    <button onClick={() => handleQuantityChange(item.id, 1)} className="px-2">+</button>
                  </div>
                  <button onClick={() => handleRemoveFromCart(item.id)} className="text-red-500">
                    <FaTrashAlt size={15} />
                  </button>
                </div>
              ))
            )}
          </div>

          <div className="w-full md:w-1/3 bg-white shadow p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="border-t border-gray-300 py-4">
              <div className="flex justify-between mb-2">
                <span className="text-gray-500">Subtotal</span>
                <span>{formatRupiah(subtotal)}</span>
              </div>
            </div>

            <h2 className="text-xl font-semibold mt-6 mb-4">Shipping Information</h2>
            <form>
              <div className="grid grid-cols-1 gap-4 mb-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  className="input input-bordered w-full"
                  value={formData.name}
                  onChange={handleInputChange}
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone"
                  className="input input-bordered w-full"
                  value={formData.phone}
                  onChange={handleInputChange}
                  pattern="[0-9]*"
                  maxLength="15"
                  onKeyPress={(e) => { if (!/[0-9]/.test(e.key)) e.preventDefault(); }}
                />
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  className="input input-bordered w-full"
                  value={formData.address}
                  onChange={handleInputChange}
                />
                <select
                  name="shipping"
                  className="input input-bordered w-full"
                  value={formData.shipping}
                  onChange={handleInputChange}
                >
                  <option value="">Shipping Method</option>
                  <option value="standard">Standard Shipping</option>
                  <option value="express">Express Shipping</option>
                </select>
                <select
                  name="payment"
                  className="input input-bordered w-full"
                  value={formData.payment}
                  onChange={handleInputChange}
                >
                  <option value="">Payment Method</option>
                  <option value="credit_card">Credit Card</option>
                  <option value="bank_transfer">Bank Transfer</option>
                  <option value="cod">Cash on Delivery</option>
                </select>
              </div>
            </form>

            <button
              onClick={handleCheckout}
              disabled={!isFormValid}
              className={`btn w-full bg-1 text-white hover:bg-2 hover:text-1 ${isFormValid ? "btn" : "btn-disabled"}`}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
      <FloatingChat />
      <Footer />
    </Fragment>
  );
};

export default CartPage;
