


import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/api";
import "../style/productPage.css";

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem("cart")) || []);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
  const user = JSON.parse(localStorage.getItem("user"));
  setIsLoggedIn(!!user);

  API.get("/products")
    .then((res) => {
      console.log(res.data); // 👈 check image here
      setProducts(res.data);
    })
    .catch((err) => console.error("Failed to fetch products:", err));
}, []);

  const saveCart = (updatedCart) => {
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleAddToCart = (product) => {
    if (!isLoggedIn) {
      alert("Please login to add items to cart.");
      navigate("/login");
      return;
    }

    const existing = cart.find((item) => item._id === product._id);
    const updatedCart = existing
      ? cart.map((item) =>
          item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        )
      : [...cart, { ...product, quantity: 1 }];

    saveCart(updatedCart);
    alert(`Added "${product.title}" to cart!`);
  };

  const handleBuyNow = (product) => {
    if (!isLoggedIn) {
      alert("Please login to continue checkout.");
      navigate("/login");
      return;
    }

    const singleProductCart = [{ ...product, quantity: 1 }];
    localStorage.setItem("cart", JSON.stringify(singleProductCart));
    navigate("/checkout");
  };

  return (
    <div className="product-page">
      <div className="product-grid">
        {products.map((product) => (
          <div key={product._id} className="product-card">
            <img src={product.image} alt={product.title} />
            <h3>{product.title}</h3>
            <p>₹{product.price}</p>
            <button onClick={() => handleBuyNow(product)}>Buy Now</button>
            <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}
