import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/api";

export default function CheckoutPage() {
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem("cart")) || []);
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const incrementQty = (productId) => {
    const updatedCart = cart.map((item) =>
      item._id === productId ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const decrementQty = (productId) => {
    const updatedCart = cart
      .map((item) =>
        item._id === productId
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item
      )
      .filter((item) => item.quantity > 0);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeItem = (productId) => {
    const updatedCart = cart.filter((item) => item._id !== productId);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handlePlaceOrder = async () => {
    if (!address.trim()) {
      alert("Please enter a shipping address.");
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first.");
        navigate("/login");
        return;
      }

      const productsPayload = cart.map(({ _id, title, price, image, quantity }) => ({
        product: { _id, title, price, image },
        quantity,
      }));

      await API.post(
        "/orders",
        { products: productsPayload, total, address },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Order placed successfully!");
      localStorage.removeItem("cart");
      setCart([]);
      setAddress("");
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-[900px] mx-auto mt-12 p-8 bg-white rounded-2xl shadow-lg text-center">
        <h2 className="text-2xl font-semibold text-gray-700">Your cart is empty.</h2>
      </div>
    );
  }

  return (
    <div className="max-w-[900px] mx-auto mt-12 p-8 bg-white rounded-2xl shadow-lg">

      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">
        Checkout
      </h2>

      <div className="flex flex-col gap-5">
        {cart.map((item) => (
          <div
            key={item._id}
            className="flex items-center gap-5 bg-gray-50 p-4 rounded-xl shadow-sm"
          >

            <img
              src={item.image}
              alt={item.title}
              className="w-[100px] h-[100px] object-cover rounded-lg border"
            />

            <div className="flex-1">

              <h4 className="text-lg font-semibold text-gray-800">
                {item.title}
              </h4>

              <p className="text-gray-600">Price: ${item.price}</p>

              <div className="flex items-center gap-3 my-2">

                <button
                  onClick={() => decrementQty(item._id)}
                  className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 text-lg"
                >
                  -
                </button>

                <span className="font-medium">{item.quantity}</span>

                <button
                  onClick={() => incrementQty(item._id)}
                  className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 text-lg"
                >
                  +
                </button>

              </div>

              <p className="text-gray-700">
                Subtotal: ${(item.price * item.quantity).toFixed(2)}
              </p>

              <button
                className="text-red-500 text-sm mt-1 underline"
                onClick={() => removeItem(item._id)}
              >
                Remove
              </button>

            </div>
          </div>
        ))}
      </div>

      <div className="bg-gray-100 mt-10 p-6 rounded-xl">

        <h3 className="text-xl font-semibold mb-4 text-gray-800">
          Total: ${total.toFixed(2)}
        </h3>

        <textarea
          placeholder="Enter your shipping address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          rows={4}
          className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:border-blue-500"
        />

        <button
          onClick={handlePlaceOrder}
          disabled={loading}
          className={`w-full mt-4 py-3 rounded-lg text-white font-semibold transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Placing Order..." : "Place Order"}
        </button>

      </div>
    </div>
  );
}