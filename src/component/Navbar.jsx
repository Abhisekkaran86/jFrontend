import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../../src/style/navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const adminStatus = localStorage.getItem("isAdmin") === "true";

    setIsLoggedIn(!!user);
    setIsAdmin(adminStatus);
  }, [location]);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setIsAdmin(false);
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">💍 Royal Gold</div>

      <ul className="navbar-links">
        {/* Admin links only */}
        {isAdmin ? (
          <>
            <li><Link to="/admin/dashboard">Dashboard</Link></li>
            <li><Link to="/admin/orders">All Orders</Link></li>
            <li><Link to="/admin/addAdmin">Add Admin</Link></li>
            <li>
              <button
                onClick={handleLogout}
                style={{
                  background: "none",
                  border: "none",
                  color: "#f00",
                  cursor: "pointer",
                  fontSize: "1rem"
                }}
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          // Regular user or guest
          <>
            <li><Link to="/">Home</Link></li>

            {isLoggedIn && (
              <>
                <li><Link to="/cart">Cart</Link></li>
                <li><Link to="/checkout">Checkout</Link></li>
                <li><Link to="/orders">My Orders</Link></li>
              </>
            )}

            {!isLoggedIn ? (
              <>
                <li><Link to="/admin">Admin</Link></li>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/signup">Signup</Link></li>
              </>
            ) : (
              <li>
                <button
                  onClick={handleLogout}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#f00",
                    cursor: "pointer",
                    fontSize: "1rem"
                  }}
                >
                  Logout
                </button>
              </li>
            )}
          </>
        )}
      </ul>
    </nav>
  );
}


