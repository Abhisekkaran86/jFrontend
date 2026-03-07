import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleAdminLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("isAdmin", res.data.user.isAdmin);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      if (res.data.user.isAdmin) {
        navigate("/admin/dashboard");
      } else {
        alert("Access denied: Not an admin");
      }
    } catch (err) {
      alert(err.response?.data?.msg || "Login failed");
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[90vh] bg-gradient-to-br from-[#fffaf0] to-yellow-200">

      <div className="bg-white p-10 rounded-xl shadow-md w-[320px]">

        <h2 className="text-center text-yellow-700 text-2xl mb-6 font-semibold">
          Admin Login
        </h2>

        <form onSubmit={handleAdminLogin}>

          <input
            type="email"
            placeholder="Admin Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg text-base focus:outline-none focus:border-yellow-500"
          />

          <input
            type="password"
            placeholder="Admin Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg text-base focus:outline-none focus:border-yellow-500"
          />

          <button
            type="submit"
            className="w-full py-3 bg-yellow-400 text-gray-800 font-semibold rounded-lg hover:bg-yellow-500 transition"
          >
            Login
          </button>

        </form>
      </div>
    </div>
  );
}

export default AdminLogin;