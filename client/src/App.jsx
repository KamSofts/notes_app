import React, { useContext } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Profile from "./components/Profile";
import "./App.css";
import ProtectedRoute from "./utils/ProtectedRoute";
import { AuthContext } from "./utils/AuthContext";

const App = () => {

  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Login />} />
          <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/dashboard"
            element={<ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>} />
          <Route path="/profile"
            element={<ProtectedRoute>
              <Profile />
            </ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
