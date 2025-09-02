import React, { useState } from "react";
import api from "../api/axios.js";

const Register = () => {
  const [user, setUser] = useState({ email: "", first_name: "", last_name: "", password: "" });
  const [teacher, setTeacher] = useState({ university_name: "", gender: "", year_joined: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e, type) => {
    const { name, value } = e.target;
    if (type === "user") setUser({ ...user, [name]: value });
    else setTeacher({ ...teacher, [name]: value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage("");
    if (!user.email || !user.password || !teacher.university_name || !teacher.gender || !teacher.year_joined) {
      setMessage("All fields are required.");
      return;
    }
    try {
      await api.post("/auth/register-teacher", { user, teacher });
      setMessage("Registration successful. Please login.");
      setUser({ email: "", first_name: "", last_name: "", password: "" });
      setTeacher({ university_name: "", gender: "", year_joined: "" });
    } catch (err) {
      setMessage(err?.response?.data?.error || "Registration failed.");
    }
  };

  return (
    <div className="flex justify-center px-2 items-center min-h-[90vh] bg-gray-100">
      <form className="bg-white p-8 rounded shadow-md w-full max-w-md space-y-5" onSubmit={handleSubmit}>
        <h2 className="text-xl sm:text-2xl font-bold text-center mb-4">Register</h2>
        <input name="email" type="email" placeholder="Email" required className="input" value={user.email}
          onChange={e => handleChange(e, "user")} />
        <input name="first_name" type="text" placeholder="First Name" required className="input" value={user.first_name}
          onChange={e => handleChange(e, "user")} />
        <input name="last_name" type="text" placeholder="Last Name" required className="input" value={user.last_name}
          onChange={e => handleChange(e, "user")} />
        <input name="password" type="password" placeholder="Password" required className="input" value={user.password}
          onChange={e => handleChange(e, "user")} />
        <input name="university_name" type="text" placeholder="University Name" required className="input"
          value={teacher.university_name} onChange={e => handleChange(e, "teacher")} />
        <input name="gender" type="text" placeholder="Gender" required className="input" value={teacher.gender}
          onChange={e => handleChange(e, "teacher")} />
        <input name="year_joined" type="number" min="1900" max="2099" placeholder="Year Joined" required className="input"
          value={teacher.year_joined} onChange={e => handleChange(e, "teacher")} />
        <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded font-semibold hover:bg-blue-700 transition">
          Register
        </button>
        {message && <div className="text-center text-red-500 mt-2">{message}</div>}
      </form>
    </div>
  );
};

export default Register;
