import React, { Fragment, useState } from "react";
import gambar1 from "../assets/images/gambar1.jpg";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import FloatingChat from "../components/layout/FloatingChat";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Rice Sunscreen",
      price: 18.71,
      quantity: 1,
      imageUrl: gambar1,
      selected: false,
    },
    {
      id: 2,
      name: "Honey Lip Balm",
      price: 13.86,
      quantity: 1,
      imageUrl: gambar1,
      selected: false,
    },
  ]);

  const handleQuantityChange = (id, amount) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + amount) }
          : item
      )
    );
  };

  const handleSelectItem = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };

  // Hitung subtotal berdasarkan item yang dicentang
  const subtotal = cartItems
    .filter((item) => item.selected)
    .reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <Fragment>
      <Header />
      <div className="container mx-auto p-8 bg-1">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Cart Items */}
          <div className="flex-1 bg-white shadow p-6 rounded-lg">
            <h1 className="text-2xl font-semibold mb-6">Shopping Cart</h1>
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border-b pb-4 mb-4"
              >
                <input
                  type="checkbox"
                  checked={item.selected}
                  onChange={() => handleSelectItem(item.id)}
                  className="mr-4"
                />
                <img src={item.imageUrl} alt={item.name} className="w-20 h-20" />
                <div className="flex-grow ml-4">
                  <h2 className="font-semibold text-lg">{item.name}</h2>
                  <p className="text-gray-500">${item.price.toFixed(2)}</p>
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
              </div>
            ))}
          </div>

          {/* Order Summary and Form */}
          <div className="w-full md:w-1/3 bg-white shadow p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="border-t border-gray-300 py-4">
              <div className="flex justify-between mb-2">
                <span className="text-gray-500">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
            </div>

            <h2 className="text-xl font-semibold mt-6 mb-4">Shipping Information</h2>
            <form>
              <div className="grid grid-cols-1 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Nme"
                  className="input input-bordered w-full"
                />
                <input
                  type="tel"
                  placeholder="Phone"
                  className="input input-bordered w-full"
                />
                <input
                  type="text"
                  placeholder="Address"
                  className="input input-bordered w-full"
                />
              </div>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input type="radio" name="shipping" value="standard" />
                  JNT Hemat (5-7 days) - Free
                </label>
                <label className="flex items-center gap-2">
                  <input type="radio" name="shipping" value="express" />
                  JNT Express (1-3 days) - Rp.10.000
                </label>
              </div>
            </form>

            <h2 className="text-xl font-semibold mt-6 mb-4">Payment Method</h2>
            <form>
              <label className="flex items-center gap-2 mb-4">
                <input type="radio" name="payment" value="card" />
                Gopay
              </label>
              <label className="flex items-center gap-2 mb-4">
                <input type="radio" name="payment" value="paypal" />
                Dana
              </label>
              <div className="grid grid-cols-1 gap-4">
                <input
                  type="text"
                  placeholder="Name"
                  className="input input-bordered w-full"
                />
                <input
                  type="text"
                  placeholder="Number"
                  className="input input-bordered w-full"
                />
              </div>
            </form>
            <button className="mt-6 w-full bg-1 text-white py-2 rounded hover:bg-3">
              Complete Purchase
            </button>
          </div>
        </div>
      </div>
      <Footer />
      <FloatingChat/>
    </Fragment>
  );
};

export default CartPage;
