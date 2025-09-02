import React from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
   
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={
            <ProtectedRoute><Profile /></ProtectedRoute>
          } />
          <Route path="/" element={<Login />} />
        </Routes>
      
    </AuthProvider>
  );
}

export default App;
