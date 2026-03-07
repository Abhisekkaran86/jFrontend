import { useState } from "react";
import API from "../utils/api";

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
    <div className="flex justify-center items-center min-h-[90vh] bg-gradient-to-br from-[#fffaf0] to-yellow-200">

      <form
        onSubmit={signup}
        className="bg-white p-10 rounded-xl shadow-md w-[320px]"
      >
        <h2 className="text-center text-yellow-700 text-2xl mb-6 font-semibold">
          Create Account
        </h2>

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
          required
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg text-base focus:outline-none focus:border-yellow-500"
        />

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email Address"
          required
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg text-base focus:outline-none focus:border-yellow-500"
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg text-base focus:outline-none focus:border-yellow-500"
        />

        <button
          type="submit"
          className="w-full py-3 bg-yellow-400 text-gray-800 font-semibold rounded-lg hover:bg-yellow-500 transition"
        >
          Sign Up
        </button>

      </form>

    </div>
  );
}