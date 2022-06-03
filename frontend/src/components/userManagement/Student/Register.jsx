import axios from "axios";
import { useNavigate } from "react-router-dom";
import BlockRegister from "../Blocks/registerBlock.components";

function Register() {

  const navigate = useNavigate();

  async function register(registerData) {
    try {
      await axios.post("http://localhost:8000/student/register", registerData);
      alert("Verification Email Sent successfully");
      //await getLoggedIn();
      navigate("/");
    } catch (err) {
      console.error(err.response.data.errorMessage);
      alert(err.response.data.errorMessage);
    }
  }

  return <BlockRegister register={register} heading="Register" />;
}

export default Register;
