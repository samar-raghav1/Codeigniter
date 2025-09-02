import React, { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../api/axios.js";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = async e => {
    e.preventDefault();
    setError("");
    try {
      const res = await api.post("/auth/login", form);
      login(res.data.token);
      navigate("/profile");
    } catch (err) {
      setError(err?.response?.data?.message || "Login failed.");
    }
  };

  return (
    <div className="flex justify-center px-2 items-center min-h-[90vh] bg-gray-100">
      <form className="bg-white p-8 rounded shadow-md w-full max-w-md space-y-5" onSubmit={handleSubmit}>
        <h2 className="text-xl sm:text-2xl font-bold text-center mb-4">Login</h2>
        <input name="email" type="email" placeholder="Email" required className="input"
          value={form.email} onChange={handleChange} />
        <input name="password" type="password" placeholder="Password" required className="input"
          value={form.password} onChange={handleChange} />
        <button type="submit"
          className="w-full py-2 bg-green-600 text-white rounded font-semibold hover:bg-green-700 transition">
          Login
        </button>
        {error && <div className="text-center text-red-500 mt-2">{error}</div>}
      </form>
    </div>
  );
};

export default Login;
