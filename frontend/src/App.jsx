import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import NavBar from "./components/layout/NavBar";
import Login from "./components/userManagement/auth/Login";
import Register from "./components/userManagement/auth/Register";
import Verify from "./components/userManagement/auth/Verify";

function App() {
  return (
    <div>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify/:id/:token" element={<Verify />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
