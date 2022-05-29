import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/LoginContext";

function AddStaff() {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [mobile, setMobile] = useState("");
  const [nic, setNic] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVerify, setPasswordVerify] = useState("");

  const navigate = useNavigate();
  const { getLoggedIn } = useContext(AuthContext);

  async function register(e) {
    e.preventDefault();

    try {
      const registerData = {
        name,
        dob,
        gender,
        mobile,
        nic,
        email,
        password,
        passwordVerify,
      };

      console.log(registerData);

      await axios.post("http://localhost:8000/staff/register", registerData);
      alert("Verification Email Sent successfully");
      await getLoggedIn();
      navigate("/staffs");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <h1>Add Staff</h1>
      <form onSubmit={register}>
        <div>
          <label>Name: </label>
          <input
            type="text"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>
        <div>
          <label>Date of birth: </label>
          <input
            type="date"
            placeholder="dob"
            onChange={(e) => setDob(e.target.value)}
            value={dob}
          />
        </div>
        <div onChange={(e) => setGender(e.target.value)} value={gender}>
          <label>Gender: </label>
          <input type="radio" value="male" name="gender" /> Male
          <input type="radio" value="female" name="gender" /> Female
        </div>
        <div>
          <label>Mobile Number: </label>
          <input
            type="text"
            placeholder="Mobile Number"
            maxLength="10"
            onChange={(e) => setMobile(e.target.value)}
            value={mobile}
          />
        </div>
        <div>
          <label>Nic: </label>
          <input
            type="text"
            placeholder="Nic"
            maxLength="11"
            onChange={(e) => setNic(e.target.value)}
            value={nic}
          />
        </div>
        <div>
          <label>E-mail: </label>
          <input
            type="email"
            placeholder="E-mail"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div>
          <label>Password: </label>
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <div>
          <label>Verify Password: </label>
          <input
            type="password"
            placeholder="Verify Password"
            onChange={(e) => setPasswordVerify(e.target.value)}
            value={passwordVerify}
          />
        </div>
        <button type="submit">Add Staff</button>
      </form>
    </div>
  );
}

export default AddStaff;
