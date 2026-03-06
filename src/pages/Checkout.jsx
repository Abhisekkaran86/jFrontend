


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/api";
import "../style/checkout.css";

export default function CheckoutPage() {
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem("cart")) || []);
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Calculate total price from cart
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Increment quantity
  const incrementQty = (productId) => {
    const updatedCart = cart.map((item) =>
      item._id === productId ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Decrement quantity
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

  // Remove item from cart
  const removeItem = (productId) => {
    const updatedCart = cart.filter((item) => item._id !== productId);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Place order function with auth token
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

      // Prepare products array in required format for backend
      const productsPayload = cart.map(({ _id, title, price, image, quantity }) => ({
        product: { _id, title, price, image },
        quantity,
      }));

      const res = await API.post(
        "/orders",
        {
          products: productsPayload,
          total,
          address,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send JWT token here
          },
        }
      );

      alert("Order placed successfully!");
      localStorage.removeItem("cart");
      setCart([]);
      setAddress("");
      navigate("/");
    } catch (error) {
      console.error("Failed to place order:", error);
      alert("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return <div className="checkout-container"><h2>Your cart is empty.</h2></div>;
  }

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <div className="cart-items">
        {cart.map((item) => (
          <div key={item._id} className="cart-item">
            <img src={item.image} alt={item.title} />
            <div className="item-details">
              <h4>{item.title}</h4>
              <p>Price: ${item.price}</p>
              <div className="quantity-control">
                <button onClick={() => decrementQty(item._id)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => incrementQty(item._id)}>+</button>
              </div>
              <p>Subtotal: ${(item.price * item.quantity).toFixed(2)}</p>
              <button className="remove-btn" onClick={() => removeItem(item._id)}>Remove</button>
            </div>
          </div>
        ))}
      </div>

      <div className="order-summary">
        <h3>Total: ${total.toFixed(2)}</h3>
        <textarea
          placeholder="Enter your shipping address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          rows={4}
        />
        <button onClick={handlePlaceOrder} disabled={loading}>
          {loading ? "Placing Order..." : "Place Order"}
        </button>
      </div>
    </div>
  );
}
