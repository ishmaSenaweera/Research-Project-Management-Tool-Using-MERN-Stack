import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <div>
      <Link to="/register">
        <button>Register</button>
      </Link>
      <Link to="/">
        <button>Login</button>
      </Link>
    </div>
  );
}

export default NavBar;
