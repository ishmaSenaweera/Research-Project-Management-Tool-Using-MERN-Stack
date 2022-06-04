import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/LoginContext";
import BlockAccount from "../Blocks/accountBlock.components";

function AccountUser() {
  const { loggedIn } = useContext(AuthContext);

  const [userData, setUserData] = useState("");

  const navigate = useNavigate();

/**
 * If the user has a date of birth, then create a new date object from the date of birth, convert it to
 * ISO string, and then take the first 10 characters of that string and assign it to a new property
 * called dobEdited.
 */
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
      console.log(err);
    }
  }

/**
 * If the user confirms the deletion of their account, then delete the account and navigate to the home
 * page.
 * @returns the deleteUser function.
 */
  async function deleteUser() {
    try {
      if (!window.confirm("Are you sure you wish to delete this account?")) {
        return;
      }

      console.log("delete user");
      await axios.delete("http://localhost:8000/account/delete");
      
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  }

/**
 * When the user clicks the update button, navigate to the update page and pass the userData object as
 * state.
 */
  async function updateUser() {
    navigate("/account/update", { state: userData });
  }

/**
 * When the user clicks the button, navigate to the changepassword page.
 */
  async function changepassword() {
    navigate("/account/changepassword");
  }

/* Calling the getData function when the component is mounted. */
  useEffect(() => {
    getData();
  }, []);

  return (
/* A component that is being rendered. */
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
