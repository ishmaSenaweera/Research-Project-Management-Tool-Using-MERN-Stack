import axios from "axios";
import { useNavigate } from "react-router-dom";

function LogOut() {
  const navigate = useNavigate();

  /**
   * The logOut function is an asynchronous function that uses the axios library to make a GET request to
   * the logout route on the server, and then navigates to the home page.
   */
  async function logOut() {
    try {
      await axios.get("http://localhost:8000/auth/logout");

      navigate("/");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <button className="btn btn-outline-light" onClick={logOut}>
      Log out
    </button>
  );
}

export default LogOut;
