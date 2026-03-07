



import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../style/adminLogins.css";


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
    const res = await axios.post("http://localhost:5000/api/auth/login", {
      email,
      password
    }, {
      headers: {
        "Content-Type": "application/json"
      }
    });

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
     <div className="login-container">
      <div className="login-form">
        <h2>Admin Login</h2>
        <form onSubmit={handleAdminLogin}>
          <input
            type="email"
            placeholder="Admin Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Admin Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
