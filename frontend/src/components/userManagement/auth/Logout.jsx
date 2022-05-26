import axios from "axios";
import React, { useContext } from "react";
import AuthContext from "../../context/LoginContext";
import { useNavigate } from "react-router-dom";

function LogOut() {
  const { getLoggedIn } = useContext(AuthContext);

  const navigate = useNavigate();

  async function logOut() {
    try {
      await axios.get("http:///localhost:5000/auth/logout");
      //await getLoggedIn();
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <button className="btn btn-danger account-button" onClick={logOut}>
      Log out
    </button>
  );
}

export default LogOut;
