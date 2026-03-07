import { useState } from "react";
import { useNavigate } from "react-router-dom"; // for redirection
import API from "../utils/api";
import "../style/signups.css";

export default function AdminSignup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const signup = async (e) => {
    e.preventDefault();
    try {
      // Always send admin: true
      await API.post("/auth/register", { name, email, password,  isAdmin: true, });
      alert("Admin signup successful!");
      navigate("/admin/dashboard"); // Redirect to admin dashboard
    } catch (err) {
      alert("Admin signup failed. Try again.");
    }
  };

  return (
    <div className="signup-container">
      <form onSubmit={signup} className="signup-form">
        <h2>Create Admin Account</h2>

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
          required
        />

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

        <button type="submit">Register Admin</button>
      </form>
    </div>
  );
}
