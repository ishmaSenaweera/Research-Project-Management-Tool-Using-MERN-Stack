import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/LoginContext";
import LogOut from "../userManagement/auth/Logout";

function NavBar() {
  const { loggedIn } = useContext(AuthContext);

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

      {loggedIn === "Student" ||
      loggedIn === "Staff" ||
      loggedIn === "Admin" ? (
        <>
          <Link to="/account">
            <button>Account</button>
          </Link>
          <Link to="/home">
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
