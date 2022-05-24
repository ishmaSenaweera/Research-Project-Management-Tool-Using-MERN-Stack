import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ChangePassword() {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordVerify, setNewPasswordVerify] = useState("");

  const navigate = useNavigate();

  async function update(e) {
    e.preventDefault();

    try {
      const updatedData = {
        password,
        newPassword,
        newPasswordVerify,
      };

      console.log(updatedData);

      await axios.put(
        "http://localhost:5000/account/changepassword",
        updatedData
      );
      alert("Changed Password Successfully");
      //await getLoggedIn();
      navigate("/");
    } catch (err) {
      //await getLoggedIn();
      console.error(err);
    }
  }

  return (
    <div>
      <h1>Change Password</h1>
      <form onSubmit={update}>
        <div>
          <label>Existing Password: </label>
          <input
            type="password"
            placeholder="Existing Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <div>
          <label>New Password: </label>
          <input
            type="password"
            placeholder="New Password"
            onChange={(e) => setNewPassword(e.target.value)}
            value={newPassword}
          />
        </div>
        <div>
          <label>Verify New Password: </label>
          <input
            type="password"
            placeholder="Verify New Password"
            onChange={(e) => setNewPasswordVerify(e.target.value)}
            value={newPasswordVerify}
          />
        </div>
        <button type="submit">Change</button>
      </form>
    </div>
  );
}

export default ChangePassword;
