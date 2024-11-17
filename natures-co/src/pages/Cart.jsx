import React, { useState, useEffect, Fragment } from "react";
import supabase from "../services/supabaseClient";
import { FaTrashAlt } from "react-icons/fa";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import FloatingChat from "../components/layout/FloatingChat";
import { Link } from "react-router-dom";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [userId, setUserId] = useState(null);
  const [subtotal, setSubtotal] = useState(0);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [shipping, setShipping] = useState("");
  const [payment, setPayment] = useState("");

  const formatRupiah = (value) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(value);
  };
  
  const isFormValid =
    name.trim() !== "" &&
    phone.trim() !== "" &&
    address.trim() !== "" &&
    shipping !== "" &&
    payment !== "";

  // Mendapatkan ID pengguna yang sedang login
  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
      } else {
        console.log("User not logged in");
      }
    };
    fetchUser();
  }, []);

  // Mengambil item keranjang dari Supabase
  useEffect(() => {
    if (userId) {
      const fetchCartItems = async () => {
        try {
          const { data, error } = await supabase
            .from("cart")
            .select("*, product (*)")
            .eq("user_id", userId);

          if (error) {
            console.error("Error fetching cart items:", error.message);
          } else {
            setCartItems(data || []);
            updateSubtotal(data);
          }
        } catch (error) {
          console.error("Error fetching cart items:", error.message);
        }
      };

      fetchCartItems();
    }
  }, [userId]);

  // Fungsi untuk menghitung subtotal (hanya untuk item yang terpilih)
  const updateSubtotal = (items) => {
    const total = items.reduce((acc, item) => {
      if (item.selected) {
        acc += item.product.price * item.quantity;
      }
      return acc;
    }, 0);
    setSubtotal(total);
  };

  // Fungsi untuk memilih/deselect item dari keranjang
  const handleSelectItem = (cartId) => {
    const updatedItems = cartItems.map((item) =>
      item.id === cartId ? { ...item, selected: !item.selected } : item
    );
    setCartItems(updatedItems);
    updateSubtotal(updatedItems);
  };

  // Fungsi untuk mengubah jumlah produk
  const handleQuantityChange = async (cartId, change) => {
    const updatedItems = cartItems.map((item) => {
      if (item.id === cartId) {
        const newQuantity = Math.max(item.quantity + change, 1);

        // Update stok produk di database
        const updateStock = async () => {
          try {
            const { data: product, error: fetchError } = await supabase
              .from("product")
              .select("quantity")
              .eq("id", item.product_id)
              .single();

            if (fetchError) {
              console.error(
                "Error fetching product stock:",
                fetchError.message
              );
              return;
            }
            const updatedStock =
              product.quantity - (newQuantity - item.quantity);
            if (updatedStock < 0) {
              alert("Insufficient stock available!");
              return;
            }

            const { error: updateError } = await supabase
              .from("product")
              .update({ quantity: updatedStock })
              .eq("id", item.product_id);

            if (updateError) {
              console.error(
                "Error updating product stock:",
                updateError.message
              );
              return;
            }
            console.log("Stock updated successfully!");
          } catch (error) {
            console.error("Error updating stock:", error.message);
          }
        };

        updateStock();
        return {
          ...item,
          quantity: newQuantity,
        };
      }
      return item;
    });
    setCartItems(updatedItems);
    updateSubtotal(updatedItems);
  };

  // Fungsi untuk menghapus item dari keranjang saat di checkout
  const handleRemoveFromCart = async (cartId) => {
    try {
      const { error } = await supabase.from("cart").delete().eq("id", cartId);

      if (error) {
        console.error("Error removing from cart:", error.message);
      } else {
        const updatedItems = cartItems.filter((item) => item.id !== cartId);
        setCartItems(updatedItems);
        updateSubtotal(updatedItems);
      }
    } catch (error) {
      console.error("Error removing item from cart:", error.message);
    }
  };

  // Fungsi untuk checkout
  const handleCheckout = async () => {
    if (!isFormValid) return;

    try {
      const { data: cartItemsToUpdate, error: fetchError } = await supabase
        .from("cart")
        .select("product_id, quantity");

      if (fetchError) {
        console.error(
          "Error fetching cart items for update:",
          fetchError.message
        );
        return;
      }

      console.log("Cart items to update:", cartItemsToUpdate);

      for (const item of cartItemsToUpdate) {
        const { data: product, error: fetchProductError } = await supabase
          .from("product")
          .select("quantity")
          .eq("id", item.product_id)
          .single();

        if (fetchProductError) {
          console.error(
            `Error fetching product quantity for ID ${item.product_id}:`,
            fetchProductError.message
          );
          return;
        }

        const newQuantity = product.quantity - item.quantity;

        if (newQuantity < 0) {
          console.error(
            `Insufficient stock for product ID ${item.product_id}.`
          );
          alert(
            `Stock for product "${item.product_id}" is insufficient. Please adjust your cart.`
          );
          return;
        }
        const { error: updateQuantityError } = await supabase
          .from("product")
          .update({ quantity: newQuantity })
          .eq("id", item.product_id);

        if (updateQuantityError) {
          console.error(
            `Error updating quantity for product ID ${item.product_id}:`,
            updateQuantityError.message
          );
          return;
        }
      }
      console.log("Product quantities updated successfully!");

      const { error: clearCartError } = await supabase
        .from("cart")
        .delete()
        .eq("user_id", userId);

      if (clearCartError) {
        console.error("Error clearing cart:", clearCartError.message);
        return;
      }
      setCartItems([]);
      setSubtotal(0);
    } catch (error) {
      console.error("Error during checkout process:", error.message);
    }
  };

  return (
    <Fragment>
      <Header />
      <div className="container mx-auto p-8 bg-1">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 bg-white shadow p-6 rounded-lg">
            <h1 className="text-2xl font-semibold mb-6">Shopping Cart</h1>
            {cartItems.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between border-b pb-4 mb-4"
                >
                  <input
                    type="checkbox"
                    checked={item.selected || false}
                    onChange={() => handleSelectItem(item.id)}
                    className="mr-4"
                  />
                  {item.product ? (
                    <>
                      <img
                        src={item.product.image_url}
                        alt={item.product.name}
                        className="w-20 h-20"
                      />
                      <div className="flex-grow ml-4">
                        <h2 className="font-semibold text-lg">
                          {item.product.name}
                        </h2>
                        <p className="text-gray-500">{formatRupiah(item.product.price)}</p>
                      </div>
                      <div className="flex items-center">
                        <button
                          onClick={() => handleQuantityChange(item.id, -1)}
                          className="px-2"
                        >
                          -
                        </button>
                        <span className="px-2">{item.quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(item.id, 1)}
                          className="px-2"
                        >
                          +
                        </button>
                      </div>
                    </>
                  ) : (
                    <p>Product information not available</p>
                  )}
                  <button
                    onClick={() => handleRemoveFromCart(item.id)}
                    className="remove-button"
                  >
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

            <h2 className="text-xl font-semibold mt-6 mb-4">
              Shipping Information
            </h2>
            <form>
              <div className="grid grid-cols-1 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Name"
                  className="input input-bordered w-full"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  type="tel"
                  placeholder="Phone"
                  className="input input-bordered w-full"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Address"
                  className="input input-bordered w-full"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="shipping"
                    value="standard"
                    onChange={(e) => setShipping(e.target.value)}
                  />
                  JNT Hemat (5-7 days) - Free
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="shipping"
                    value="express"
                    onChange={(e) => setShipping(e.target.value)}
                  />
                  JNT Express (1-3 days) - Rp.10.000
                </label>
              </div>
            </form>

            <h2 className="text-xl font-semibold mt-6 mb-4">Payment Method</h2>
            <form>
              <label className="flex items-center gap-2 mb-4">
                <input
                  type="radio"
                  name="payment"
                  value="gopay"
                  onChange={(e) => setPayment(e.target.value)}
                />
                Gopay
              </label>
              <label className="flex items-center gap-2 mb-4">
                <input
                  type="radio"
                  name="payment"
                  value="dana"
                  onChange={(e) => setPayment(e.target.value)}
                />
                Dana
              </label>
            </form>
            <Link to="/success">
              <button
                className={`mt-6 w-full bg-1 text-white py-2 rounded ${
                  !isFormValid ? "opacity-50 cursor-not-allowed" : "hover:bg-3"
                }`}
                onClick={handleCheckout}
                disabled={!isFormValid}
              >
                Complete Purchase
              </button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
      <FloatingChat />
    </Fragment>
  );
};

export default CartPage;
