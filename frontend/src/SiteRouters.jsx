import { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/userManagement/Home";
import NavBar from "./components/layout/NavBar";
import Login from "./components/userManagement/auth/Login";
import Register from "./components/userManagement/auth/Register";
import Verify from "./components/userManagement/auth/Verify";
import AuthContext from "./components/context/LoginContext";
import AccountUser from "./components/userManagement/User/AccountUser";
import UpdateUser from "./components/userManagement/User/UpdateUser";
import AllStudents from "./components/userManagement/Student/AllStudents";
import AllStaff from "./components/userManagement/Staff/AllStaff";
import AddStaff from "./components/userManagement/Staff/AddStaff";
import StaffStudentUpdate from "./components/userManagement/Staff/UpdateStaff";
import StaffAccount from "./components/userManagement/Staff/AccountStaff";
import UpdateStudent from "./components/userManagement/Student/UpdateStudent";
import AccountStudent from "./components/userManagement/Student/AccountStudent";
import ChangePassword from "./components/userManagement/User/ChangePassword";

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

              <Route path="*" element={<Login />} />
            </>
          ) : (
            ""
          )}

          {loggedIn === "Admin" ? (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/account" element={<AccountUser />} />
              <Route path="/account/update" element={<UpdateUser />} />
              <Route
                path="/account/changepassword"
                element={<ChangePassword />}
              />

              <Route path="/students" element={<AllStudents />} />
              <Route path="/students/account" element={<AccountStudent />} />
              <Route path="/students/update" element={<UpdateStudent />} />

              <Route path="/staffs" element={<AllStaff />} />
              <Route path="/staffs/account" element={<StaffAccount />} />
              <Route path="/staffs/add" element={<AddStaff />} />
              <Route path="/staffs/update" element={<StaffStudentUpdate />} />

              <Route path="*" element={<Home />} />
            </>
          ) : (
            ""
          )}

          {loggedIn === "Student" || loggedIn === "Staff" ? (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/account" element={<AccountUser />} />
              <Route path="/account/update" element={<UpdateUser />} />

              <Route path="*" element={<Home />} />
            </>
          ) : (
            ""
          )}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default SiteRouters;
