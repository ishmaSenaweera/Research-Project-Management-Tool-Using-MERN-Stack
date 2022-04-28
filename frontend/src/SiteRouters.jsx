import React, { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import NavBar from "./components/layout/NavBar";
import Login from "./components/userManagement/auth/Login";
import Register from "./components/userManagement/auth/Register";
import Verify from "./components/userManagement/auth/Verify";
import AuthContext from "./components/context/LoginContext";
import UserAccount from "./components/userManagement/auth/UserAccount";

function SiteRouters() {
  const { loggedIn } = useContext(AuthContext);
  console.log(loggedIn);

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/verify/:id/:token" element={<Verify />} />

          {loggedIn === false ? (
            <>
              <Route path="/register" element={<Register />} />
              <Route path="/" element={<Login />} />
            </>
          ) : (
            ""
          )}

          {loggedIn !== "Student" ||
          loggedIn !== "Staff" ||
          loggedIn !== "Admin" ? (
            <>
              <Route path="/home" element={<Home />} />
              <Route path="/account" element={<UserAccount />} />
            </>
          ) : (
            ""
          )}

          <Route path="*" element={<p>error</p>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default SiteRouters;
