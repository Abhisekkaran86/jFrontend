
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Add this
import "../style/homes.css"

export default function Home() {
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem("cart")) || []);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate(); // Hook from react-router

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setIsLoggedIn(!!user);
  }, []);

  const handleShopNow = () => {
    navigate("/products"); // Navigate to ProductPage
  };

  return (
    <div className="home-hero">
      <div className="hero-content">
        <h1>Elegant Jewelry for Every Occasion</h1>
        <p>Explore our exclusive collection of gold, diamond, and silver jewelry.</p>
        <button onClick={handleShopNow}>Shop Now</button>
        
      </div>
    </div>
  );
}
