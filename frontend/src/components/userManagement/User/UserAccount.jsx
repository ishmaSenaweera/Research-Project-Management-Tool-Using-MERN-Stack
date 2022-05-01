import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/LoginContext";

function UserAccount() {
  const { loggedIn } = useContext(AuthContext);

  const [userData, setUserData] = useState("");

  const navigate = useNavigate();

  async function getData() {
    try {
      const result = await axios.get("http://localhost:5000/account/");

      setUserData(result.data);
      console.log(userData);
    } catch (err) {
      //await getLoggedIn();
      console.log(err);
    }
  }

  async function deleteUser() {
    try {
      console.log("delete user");
      const result = await axios.delete("http://localhost:5000/account/delete");
      //await getLoggedIn();
      navigate("/");
      console.log(result);
    } catch (err) {
      //await getLoggedIn();
      console.log(err);
    }
  }

  async function updateUser() {
    navigate("/account/update", { state: userData });
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div>
        <h1>Account = {userData.name}</h1>
      </div>

      {loggedIn === "Student" ? (
        <>
          <div>
            <h1>batch: </h1>
            <h3> {userData.batch}</h3>
          </div>
          <div>
            <h1>Specialization: </h1>
            <h3> {userData.specialization}</h3>
          </div>
          <div>
            <h1>Branch: </h1>
            <h3> {userData.branch}</h3>
          </div>
        </>
      ) : (
        ""
      )}

      <div>
        <h1>dob: </h1>
        <h3> {userData.dob}</h3>
      </div>
      <div>
        <h1>email: </h1>
        <h3> {userData.email}</h3>
      </div>
      <div>
        <h1>Gender: </h1>
        <h3> {userData.gender}</h3>
      </div>
      <div>
        <h1>Nic: </h1>
        <h3> {userData.nic}</h3>
      </div>
      <div>
        <h1>Mobile: </h1>
        <h3> {userData.mobile}</h3>
      </div>
      <button
        onClick={() => {
          if (window.confirm("Are you sure you wish to delete this account?"))
            deleteUser();
        }}
      >
        Delete
      </button>
      <button onClick={updateUser}>Edit</button>
      <button>Change Password</button>
    </div>
  );
}

export default UserAccount;
