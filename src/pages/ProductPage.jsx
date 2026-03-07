import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/api";

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
        console.log(res.data);
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
    <div className="min-h-screen px-[6%] py-16 bg-gradient-to-b from-[#fffdf5] to-[#fff6d9]">

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-9">

        {products.map((product) => (
          <div
            key={product._id}
            className="relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
          >

            {/* Badge */}
            <span className="absolute top-3 left-3 bg-yellow-600 text-white text-xs px-2 py-1 rounded">
              New
            </span>

            {/* Image */}
            <div className="overflow-hidden">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-[240px] object-cover transition-transform duration-500 hover:scale-110"
              />
            </div>

            {/* Content */}
            <div className="text-center p-4">

              <h3 className="text-[1.05rem] text-gray-800 mb-1 font-medium">
                {product.title}
              </h3>

              <p className="text-yellow-600 font-bold text-lg mb-3">
                ₹{product.price}
              </p>

              <div className="flex justify-center gap-3 pb-2">

                <button
                  onClick={() => handleBuyNow(product)}
                  className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white text-sm font-semibold px-4 py-2 rounded-md hover:from-yellow-600 hover:to-yellow-700 transition"
                >
                  Buy Now
                </button>

                <button
                  onClick={() => handleAddToCart(product)}
                  className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white text-sm font-semibold px-4 py-2 rounded-md hover:from-yellow-600 hover:to-yellow-700 transition"
                >
                  Add to Cart
                </button>

              </div>

            </div>
          </div>
        ))}

      </div>
    </div>
  );
}