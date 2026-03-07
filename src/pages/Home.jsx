import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem("cart")) || []);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setIsLoggedIn(!!user);
  }, []);

  const handleShopNow = () => {
    navigate("/products");
  };

  return (
    <div
      className="h-screen flex items-center justify-center text-center text-white bg-cover bg-center"
      style={{ backgroundImage: "url('/golden-wave-bg.png')" }}
    >
      <div className="bg-black/60 p-8 rounded-xl max-w-[600px]">

        <h1 className="text-[2.5rem] font-serif text-yellow-400 mb-4">
          Elegant Jewelry for Every Occasion
        </h1>

        <p className="text-[1.2rem] mb-6">
          Explore our exclusive collection of gold, diamond, and silver jewelry.
        </p>

        <button
          onClick={handleShopNow}
          className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-bold text-base hover:bg-yellow-300 transition"
        >
          Shop Now
        </button>

      </div>
    </div>
  );
}