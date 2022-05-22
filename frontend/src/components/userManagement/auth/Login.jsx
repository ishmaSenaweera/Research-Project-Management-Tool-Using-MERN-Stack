import { useContext, useState } from "react";
import axios from "axios";
import AuthContext from "../../context/LoginContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { getLoggedIn } = useContext(AuthContext);

  async function login(e) {
    e.preventDefault();

    try {
      const loginData = {
        email,
        password,
      };

      await axios.get("http:///localhost:5000/auth/login", {
        params: loginData,
      });
      await getLoggedIn();
      //navigate("/home");
    } catch (err) {
      console.error(err.response.data.errorMessage);
      alert(err.response.data.errorMessage);
    }
  }

  return (
    <div>
      <h1>Log in to your account</h1>
      <form onSubmit={login}>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <button type="submit">Log in</button>
      </form>
    </div>
  );
}

export default Login;
