import { useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/LoginContext";
import BlockRegister from "../Blocks/registerBlock.components";

function AddStaff() {

  const navigate = useNavigate();
  const { getLoggedIn } = useContext(AuthContext);

  async function register(registerData) {
    try {

      await axios.post("http://localhost:8000/staff/register", registerData);
      alert("Verification Email Sent successfully");
      await getLoggedIn();
      navigate("/staffs");
    } catch (err) {
      console.error(err);
    }
  }

  return <BlockRegister register={register} heading="Add Staff" />;
}

export default AddStaff;
