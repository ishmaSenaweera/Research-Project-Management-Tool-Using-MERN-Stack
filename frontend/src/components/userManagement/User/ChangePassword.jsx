import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ChangePassword() {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordVerify, setNewPasswordVerify] = useState("");

  const navigate = useNavigate();

/**
 * It takes the user's current password, new password, and new password verification, and sends it to
 * the server to be updated.
 */
  async function update(e) {
    e.preventDefault();

    try {
      const updatedData = {
        password,
        newPassword,
        newPasswordVerify,
      };

      await axios.put(
        "http://localhost:8000/account/changepassword",
        updatedData
      );
      alert("Changed Password Successfully");

      navigate("/");
    } catch (err) {
      console.error(err);
      alert(err.response.data.errorMessage);
    }
  }

  return (
    <div className="main">
      <div className="sub-main">
        <h1>Change Password</h1>
        <hr />
        <form onSubmit={update}>
          <div>
            <label>Existing Password: </label>
            <input
              type="password"
              placeholder="Existing Password"
              className="form-input"
              required
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <div>
            <label>New Password: </label>
            <input
              type="password"
              placeholder="New Password"
              className="form-input"
              required
              onChange={(e) => setNewPassword(e.target.value)}
              value={newPassword}
            />
          </div>
          <div>
            <label>Verify New Password: </label>
            <input
              type="password"
              placeholder="Verify New Password"
              className="form-input"
              required
              onChange={(e) => setNewPasswordVerify(e.target.value)}
              value={newPasswordVerify}
            />
          </div>
          <div className="login-button">
            <button className="button" type="submit">
              Change Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ChangePassword;
