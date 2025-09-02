import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const Navbar = () => {
  const { token, logout } = useContext(AuthContext);

  return (
    <nav className="bg-blue-700 px-4 py-3 flex items-center justify-between">
      <div className="text-white text-lg font-bold">App Logo</div>
      <div className="space-x-4">
        {!token && (
          <>
            <Link className="text-white hover:text-blue-200 font-semibold" to="/login">Login</Link>
            <Link className="text-white hover:text-blue-200 font-semibold" to="/register">Register</Link>
          </>
        )}
        {token && (
          <>
            <Link className="text-white hover:text-blue-200 font-semibold" to="/profile">Profile</Link>
            <button className="bg-white text-blue-700 px-3 py-1 rounded font-semibold ml-2"
              onClick={logout}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
