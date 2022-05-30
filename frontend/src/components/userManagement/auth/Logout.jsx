import axios from "axios";
import React, { useContext } from "react";
import AuthContext from "../../context/LoginContext";
import { useNavigate } from "react-router-dom";

function LogOut() {
  const { getLoggedIn } = useContext(AuthContext);

  const navigate = useNavigate();

  async function logOut() {
    try {
      await axios.get("http:///localhost:8000/auth/logout");
      //await getLoggedIn();
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <button class="btn btn-outline-light" onClick={logOut}>
      Log out
    </button>
  );
}

export default LogOut;
