import React, { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/userManagement/auth/Home";
import NavBar from "./components/layout/NavBar";
import Login from "./components/userManagement/auth/Login";
import Register from "./components/userManagement/auth/Register";
import Verify from "./components/userManagement/auth/Verify";
import AuthContext from "./components/context/LoginContext";
import UserAccount from "./components/userManagement/auth/UserAccount";
import UserUpdate from "./components/userManagement/auth/UserUpdate";
import AllStudents from "./components/userManagement/auth/AllStudents";
import AllStaff from "./components/userManagement/auth/AllStaff";
import StaffStudentAccount from "./components/userManagement/auth/StaffStudentAccount";
import AddStaff from "./components/userManagement/auth/AddStaff";
import StaffStudentUpdate from "./components/userManagement/auth/StaffStudentUpdate";

function SiteRouters() {
  const { loggedIn } = useContext(AuthContext);
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

          {loggedIn === "Admin" ? (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/account" element={<UserAccount />} />
              <Route path="/account/update" element={<UserUpdate />} />
              <Route path="/students" element={<AllStudents />} />
              <Route path="/staffs" element={<AllStaff />} />
              <Route
                path="/students/account"
                element={<StaffStudentAccount />}
              />
              <Route path="/staffs/account" element={<StaffStudentAccount />} />
              <Route path="/staffs/add" element={<AddStaff />} />
              <Route path="/staffs/update" element={<StaffStudentUpdate />} />
            </>
          ) : (
            ""
          )}

          {loggedIn === "Student" || loggedIn === "Staff" ? (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/account" element={<UserAccount />} />
              <Route path="/account/update" element={<UserUpdate />} />
            </>
          ) : (
            ""
          )}

          <Route path="*" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default SiteRouters;
