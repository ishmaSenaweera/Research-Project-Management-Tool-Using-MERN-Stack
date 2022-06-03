import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function login(e) {
    e.preventDefault();

    try {
      const loginData = {
        email,
        password,
      };

      await axios.post("http://localhost:8000/auth/login", loginData);
      navigate("/");
    } catch (err) {
      console.error(err.response.data.errorMessage);
      alert(err.response.data.errorMessage);
    }
  }

  return (
    <div className="main">
      <div className="sub-main">
        <h1>Log in</h1>
        <hr />
        <form onSubmit={login}>
          <label>E-mail</label>
          <div>
            <input
              type="email"
              placeholder="E-mail"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="form-input"
            />
          </div>
          <label>Password</label>
          <div>
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="form-input"
            />
          </div>
          <div>
            <button className="button" type="submit">
              Log In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
