import { useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/LoginContext";
import BlockRegister from "../Blocks/registerBlock.components";

function AddAdmin() {
  const navigate = useNavigate();
  const { getLoggedIn } = useContext(AuthContext);

  /**
   * It sends a post request to the server with the registerData object, then it alerts the user that the
   * verification email was sent successfully, then it calls the getLoggedIn function, and then it
   * navigates to the /admins route.
   */
  async function register(registerData) {
    try {
      await axios.post("http://localhost:8000/admin/register", registerData);
      alert("Verification Email Sent successfully");
      await getLoggedIn();
      navigate("/admins");
    } catch (err) {
      console.error(err);
    }
  }

  /* Returning the BlockRegister component with the register function and the heading "Add Admin" as
props. */
  return <BlockRegister register={register} heading="Add Admin" />;
}

export default AddAdmin;
