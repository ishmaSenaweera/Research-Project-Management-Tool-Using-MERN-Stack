import { useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/LoginContext";
import BlockRegister from "../Blocks/registerBlock.components";

function AddAdmin() {

  const navigate = useNavigate();
  const { getLoggedIn } = useContext(AuthContext);

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

  return <BlockRegister register={register} heading="Add Admin" />;
}

export default AddAdmin;
