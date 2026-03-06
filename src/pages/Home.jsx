// import React, { useState, useEffect } from "react";
// import API from "../utils/api";
// import "../style/Home.css";

// export default function Home() {
//   const [products, setProducts] = useState([]);
//   const [showProducts, setShowProducts] = useState(false);
//   const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem("cart")) || []);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   useEffect(() => {
//     // Assume user data is stored in localStorage after login
//     const user = JSON.parse(localStorage.getItem("user"));
//     setIsLoggedIn(!!user); // true if user exists
//   }, []);

//   const handleShopNow = () => {
//     API.get("/products")
//       .then((res) => {
//         setProducts(res.data);
//         setShowProducts(true);
//       })
//       .catch((err) => {
//         console.error("Failed to fetch products:", err);
//       });
//   };

//   const handleAddToCart = (product) => {
//     const existing = cart.find((item) => item._id === product._id);
//     let updatedCart;

//     if (existing) {
//       updatedCart = cart.map((item) =>
//         item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
//       );
//     } else {
//       updatedCart = [...cart, { ...product, quantity: 1 }];
//     }

//     setCart(updatedCart);
//     localStorage.setItem("cart", JSON.stringify(updatedCart));
//     alert(`Added "${product.title}" to cart!`);
//   };

//   const handleBuyNow = (product) => {
//     alert(`Proceeding to buy "${product.title}"`);
//   };

//   return (
//     <div className="home-hero">
//       <div className="hero-content">
//         <h1>Elegant Jewelry for Every Occasion</h1>
//         <p>Explore our exclusive collection of gold, diamond, and silver jewelry.</p>
//         <button onClick={handleShopNow}>Shop Now</button>
//         {isLoggedIn && (
//           <p className="cart-count">🛒 Cart: {cart.reduce((sum, item) => sum + item.quantity, 0)} items</p>
//         )}
//       </div>

//       {showProducts && (
//         <div className="product-grid">
//           {products.map((product) => (
//             <div key={product._id} className="product-card">
//               <img src={product.image} alt={product.title} />
//               <h3>{product.title}</h3>
//               <p>${product.price}</p>

//               {isLoggedIn ? (
//                 <>
//                   <button onClick={() => handleBuyNow(product)}>Buy Now</button>
//                   <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
//                 </>
//               ) : (
//                 <p style={{ color: "#facc15", fontWeight: "bold" }}>Login to buy</p>
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Add this
import "../style/Home.css";

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
