import { useState } from "react";
import API from "../utils/api";
import "../style/signups.css";



export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signup = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", { name, email, password });
      alert("Signup successful! Please login.");
    } catch (err) {
      alert("Signup failed. Try again.");
    }
  };

  return (
    <div className="signup-container">
      <form onSubmit={signup} className="signup-form">
        <h2>Create Account</h2>

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

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}
