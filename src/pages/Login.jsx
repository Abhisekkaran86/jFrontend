import { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ import navigate
import API from "../utils/api";
import "../style/Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); 

  const login = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("auth/login", { email, password });

      // Save user data to localStorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user)); 
      alert("Login success!");

      navigate("/"); 
    } catch (err) {
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={login} className="login-form">
        <h2>Login to Your Account</h2>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email Address"
          required
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}
