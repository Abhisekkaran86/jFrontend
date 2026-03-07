import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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
    <nav className="fixed top-0 left-0 w-full bg-[#fffaf0] border-b-2 border-yellow-400 shadow-sm z-50">

      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-yellow-500 tracking-wide"
        >
          💍 Royal Gold
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6 items-center text-gray-700 font-medium">

          {isAdmin ? (
            <>
              <li><Link className="hover:text-yellow-500" to="/admin/dashboard">Dashboard</Link></li>
              <li><Link className="hover:text-yellow-500" to="/admin/orders">Orders</Link></li>
              <li><Link className="hover:text-yellow-500" to="/admin/addAdmin">Add Admin</Link></li>

              <li>
                <button
                  onClick={handleLogout}
                  className="text-red-500 hover:text-red-600"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li><Link className="hover:text-yellow-500" to="/">Home</Link></li>

              {isLoggedIn && (
                <>
                  <li><Link className="hover:text-yellow-500" to="/cart">Cart</Link></li>
                  <li><Link className="hover:text-yellow-500" to="/checkout">Checkout</Link></li>
                  <li><Link className="hover:text-yellow-500" to="/orders">My Orders</Link></li>
                </>
              )}

              {!isLoggedIn ? (
                <>
                  <li><Link className="hover:text-yellow-500" to="/admin">Admin</Link></li>
                  <li><Link className="hover:text-yellow-500" to="/login">Login</Link></li>
                  <li>
                    <Link
                      className="bg-yellow-400 text-black px-4 py-2 rounded-md hover:bg-yellow-500"
                      to="/signup"
                    >
                      Signup
                    </Link>
                  </li>
                </>
              ) : (
                <li>
                  <button
                    onClick={handleLogout}
                    className="text-red-500 hover:text-red-600"
                  >
                    Logout
                  </button>
                </li>
              )}
            </>
          )}
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t">

          <ul className="flex flex-col p-4 gap-4 text-gray-700 font-medium">

            {isAdmin ? (
              <>
                <li><Link to="/admin/dashboard">Dashboard</Link></li>
                <li><Link to="/admin/orders">Orders</Link></li>
                <li><Link to="/admin/addAdmin">Add Admin</Link></li>

                <li>
                  <button
                    onClick={handleLogout}
                    className="text-red-500"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
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
                      className="text-red-500"
                    >
                      Logout
                    </button>
                  </li>
                )}
              </>
            )}

          </ul>

        </div>
      )}

    </nav>
  );
}