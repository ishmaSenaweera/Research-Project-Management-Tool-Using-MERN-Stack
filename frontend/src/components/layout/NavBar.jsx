import React, { useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import AuthContext from "../context/LoginContext";
import LogOut from "../userManagement/auth/Logout";

function NavBar() {
  const { loggedIn, getLoggedIn } = useContext(AuthContext);

  const location = useLocation();

  useEffect(async () => {
    await getLoggedIn();
  }, [location]);

  return (
    <div>
      {loggedIn === false && (
        <>
          <Link to="/register">
            <button>Register</button>
          </Link>
          <Link to="/">
            <button>Login</button>
          </Link>
        </>
      )}

      {loggedIn === "Admin" ? (
        <>
          <Link to="/students">
            <button>All Students</button>
          </Link>
          <Link to="/staffs">
            <button>All Staff</button>
          </Link>
          <Link to="/admins">
            <button>All Admin</button>
          </Link>
        </>
      ) : (
        ""
      )}

      {loggedIn === "Student" ||
      loggedIn === "Staff" ||
      loggedIn === "Admin" ? (
        <>
          <Link to="/account">
            <button>Account</button>
          </Link>
          <Link to="/">
            <button>Home</button>
          </Link>
          <LogOut />
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default NavBar;
