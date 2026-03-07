import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("auth/login", { email, password });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Login success!");
      navigate("/");
    } catch (err) {
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[90vh] bg-gradient-to-br from-[#fffaf0] to-yellow-200">
      
      <form
        onSubmit={login}
        className="bg-white p-10 rounded-xl shadow-md w-[320px]"
      >
        <h2 className="text-center text-yellow-700 text-2xl mb-6 font-semibold">
          Login to Your Account
        </h2>

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
          Login
        </button>
      </form>

    </div>
  );
}