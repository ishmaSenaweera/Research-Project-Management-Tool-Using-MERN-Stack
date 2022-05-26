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

      await axios.get("http:///localhost:8000/auth/login", {
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
    <div className="main">
      <div className="sub-main">
        <h1>Log in to your account </h1>
        <form onSubmit={login}>
          <div className="">
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className="">
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <button className="btn btn-primary" type="submit">Log in</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
