import React, { useContext, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import AuthContext from "../../context/LoginContext";

function UpdateAdmin() {
  const { state } = useLocation();
  const dobEdited = new Date(state.dob).toISOString().substring(0, 10);

  const [id] = useState(state._id);
  const [name, setName] = useState(state.name);
  const [dob, setDob] = useState(dobEdited);
  const [gender, setGender] = useState(state.gender);
  const [mobile, setMobile] = useState(state.mobile);
  const [nic, setNic] = useState(state.nic);
  const [email] = useState(state.email);

  const navigate = useNavigate();
  const { loggedIn } = useContext(AuthContext);
  console.log(loggedIn);

  async function update(e) {
    e.preventDefault();

    try {
      const updatedData = {
        id,
        name,
        dob,
        gender,
        mobile,
        nic,
        email,
      };

      console.log(updatedData);

      await axios.post("http://localhost:5000/admin/update", updatedData);
      alert("Updated Successfully");
      //await getLoggedIn();
      navigate("/admins");
    } catch (err) {
      //await getLoggedIn();
      console.error(err);
    }
  }

  return (
    <div>
      <h1>Admin Account Update</h1>
      <form onSubmit={update}>
        <div>
          <label>Name: </label>
          <input
            type="text"
            placeholder={name}
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
          <label>Email: </label>
          <input type="email" disabled placeholder="Email" value={email} />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default UpdateAdmin;
