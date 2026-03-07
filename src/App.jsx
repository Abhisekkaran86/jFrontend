
import { useLocation } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';

import './App.css';
import Navbar from '../src/component/Navbar';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import AdminLogin from './pages/AdminLogin';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/Cart';
import Checkout from './pages/Checkout';
import UserOrders from './pages/UserOrders';
import AdminOrders from './pages/AdminOrders';
import Footer from './component/Footer';
import AdminSignup from './pages/AdminSignup';

function App() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className="flex flex-col min-h-screen">

      {/* Fixed Header */}
      <Navbar />

      {/* Page Content */}
      <main className="flex-grow pt-[70px]">

        {isHome ? (
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        ) : (
          <div style={{ backgroundColor: '#fff8e1', minHeight: '100%' }}>
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
          </div>
        )}

      </main>

      {/* Footer on all pages */}
      <Footer />

    </div>
  );
}

export default App;