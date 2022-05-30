import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/LoginContext";
import BlockAccount from "../blocks/accountBlock.components";

function AccountUser() {
  const { loggedIn } = useContext(AuthContext);

  const [userData, setUserData] = useState("");

  const navigate = useNavigate();

  async function getData() {
    try {
      const result = await axios.get("http://localhost:8000/account/");
      if (result.data.dob) {
        const dobEdited = new Date(result.data.dob)
          .toISOString()
          .substring(0, 10);
        result.data.dobEdited = dobEdited;
      }
      setUserData(result.data);
    } catch (err) {
      //await getLoggedIn();
      console.log(err);
    }
  }

  async function deleteUser() {
    try {
      console.log("delete user");
      const result = await axios.delete("http://localhost:8000/account/delete");
      //await getLoggedIn();
      navigate("/");
    } catch (err) {
      //await getLoggedIn();
      console.log(err);
    }
  }

  async function updateUser() {
    navigate("/account/update", { state: userData });
  }

  async function changepassword() {
    navigate("/account/changepassword");
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <BlockAccount
      userData={userData}
      heading="User Account"
      type={loggedIn}
      delete={deleteUser}
      edit={updateUser}
      changepassword={changepassword}
    />
  );
}

export default AccountUser;
