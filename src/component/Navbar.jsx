import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

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
    <nav className="bg-[#fffaf0] px-8 py-4 border-b-2 border-yellow-400 flex justify-between items-center shadow-sm font-sans">

      {/* Brand */}
      <div className="text-2xl font-bold text-yellow-400">
        💍 Royal Gold
      </div>

      <ul className="flex gap-5 items-center">

        {/* Admin Links */}
        {isAdmin ? (
          <>
            <li>
              <Link className="nav-link" to="/admin/dashboard">Dashboard</Link>
            </li>

            <li>
              <Link className="nav-link" to="/admin/orders">All Orders</Link>
            </li>

            <li>
              <Link className="nav-link" to="/admin/addAdmin">Add Admin</Link>
            </li>

            <li>
              <button
                onClick={handleLogout}
                className="text-red-500 cursor-pointer text-base"
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link className="nav-link" to="/">Home</Link>
            </li>

            {isLoggedIn && (
              <>
                <li>
                  <Link className="nav-link" to="/cart">Cart</Link>
                </li>

                <li>
                  <Link className="nav-link" to="/checkout">Checkout</Link>
                </li>

                <li>
                  <Link className="nav-link" to="/orders">My Orders</Link>
                </li>
              </>
            )}

            {!isLoggedIn ? (
              <>
                <li>
                  <Link className="nav-link" to="/admin">Admin</Link>
                </li>

                <li>
                  <Link className="nav-link" to="/login">Login</Link>
                </li>

                <li>
                  <Link className="nav-link" to="/signup">Signup</Link>
                </li>
              </>
            ) : (
              <li>
                <button
                  onClick={handleLogout}
                  className="text-red-500 cursor-pointer text-base"
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