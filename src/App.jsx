// import { useState } from 'react'

// import './App.css'
// import Home from './pages/Home'
// import Navbar from './component/Navber'
// import { Route, Routes } from 'react-router-dom'
// import Signup from './pages/Signup'
// import Login from './pages/Login'
// import AdminDashboard from './pages/AdminDashboard'
// import AdminLogin from './pages/AdminLogin'
// import ProductPage from './pages/ProductPage'
// import CartPage from './pages/Card'
// import Checkout from './pages/Checkout'
// import UserOrders from './pages/UserOrders'
// import AdminOrders from './pages/AdminOrders'

// function App() {

//   return (
//     <>
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<Home />} />
//          <Route path="/products" element={<ProductPage />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/admin" element={<AdminLogin />} />
//         <Route path="/admin/dashboard" element={<AdminDashboard />} />
//         <Route path="/cart" element={<CartPage />} />
//         <Route path="/checkout" element={<Checkout />} />
//         <Route path="/orders" element={<UserOrders />} />
//         <Route path="/admin/orders" element={<AdminOrders />} />
        

//       </Routes>
//     </>
//   )
// }

// export default App
import { useLocation } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';

import './App.css';
import Navbar from './component/Navbar';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import AdminLogin from './pages/AdminLogin';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/Card';
import Checkout from './pages/Checkout';
import UserOrders from './pages/UserOrders';
import AdminOrders from './pages/AdminOrders';
import Footer from './pages/Footer';
import AdminSignup from './pages/AdminSignup';

function App() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <>
      <Navbar />

      {isHome ? (
        // Home page - already has background image inside Home.jsx
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      ) : (
        // All other pages wrapped with gold background
        <div style={{ backgroundColor: '#fff8e1', minHeight: '100vh', paddingTop: '60px' }}>
          <Routes>
            <Route path="/products" element={<ProductPage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/orders" element={<UserOrders />} />
            <Route path="/admin/orders" element={<AdminOrders />} />
            <Route path="/admin/addAdmin" element={<AdminSignup />} />
          </Routes>
          <Footer/>
        </div>
      )}
    </>
  );
}

export default App;
