import axios from "axios";
import { useNavigate } from "react-router-dom";
import BlockRegister from "../Blocks/registerBlock.components";

function Register() {
  const navigate = useNavigate();

  /**
   * It sends a post request to the server with the registerData object, and if successful, it alerts the
   * user that the verification email was sent successfully, and then navigates to the home page.
   */
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

  /* Returning the BlockRegister component with the register function and heading as props. */
  return <BlockRegister register={register} heading="Register" />;
}

export default Register;
