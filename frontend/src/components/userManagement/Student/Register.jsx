import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [sid, setSid] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [batch, setBatch] = useState("");
  const [branch, setBranch] = useState("");
  const [mobile, setMobile] = useState("");
  const [nic, setNic] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVerify, setPasswordVerify] = useState("");

  const navigate = useNavigate();

  async function register(e) {
    e.preventDefault();

    try {
      const registerData = {
        name,
        sid,
        dob,
        gender,
        specialization,
        batch,
        branch,
        mobile,
        nic,
        email,
        password,
        passwordVerify,
      };

      console.log(registerData);

      await axios.post("http://localhost:8000/student/register", registerData);
      alert("Verification Email Sent successfully");
      //await getLoggedIn();
      navigate("/");
    } catch (err) {
      console.error(err.response.data.errorMessage);
      alert(err.response.data.errorMessage);
    }
  }

  return (
    <div>
      <h1>Student Registration</h1>
      <form onSubmit={register}>
        <div>
          <label>Name: </label>
          <input
            type="text"
            placeholder="Name"
            required
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>
        <div>
          <label>SLIIT ID: </label>
          <input
            type="text"
            placeholder="SLIIT ID"
            maxLength={10}
            required
            onChange={(e) => setSid(e.target.value)}
            value={sid}
          />
        </div>
        <div>
          <label>Date of birth: </label>
          <input
            type="date"
            placeholder="dob"
            required
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
          <label>Specialization: </label>
          <input
            type="text"
            placeholder="Specialization"
            required
            onChange={(e) => setSpecialization(e.target.value)}
            value={specialization}
          />
        </div>
        <div>
          <label>Batch: </label>
          <input
            type="text"
            placeholder="Batch"
            required
            onChange={(e) => setBatch(e.target.value)}
            value={batch}
          />
        </div>
        <div>
          <label>Branch: </label>
          <input
            type="text"
            placeholder="Branch"
            required
            onChange={(e) => setBranch(e.target.value)}
            value={branch}
          />
        </div>
        <div>
          <label>Mobile Number: </label>
          <input
            type="text"
            placeholder="Mobile Number"
            maxLength="10"
            required
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
            required
            onChange={(e) => setNic(e.target.value)}
            value={nic}
          />
        </div>
        <div>
          <label>E-mail: </label>
          <input
            type="email"
            placeholder="E-mail"
            required
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div>
          <label>Password: </label>
          <input
            type="password"
            placeholder="Password"
            required
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <div>
          <label>Verify Password: </label>
          <input
            type="password"
            placeholder="Verify Password"
            required
            onChange={(e) => setPasswordVerify(e.target.value)}
            value={passwordVerify}
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;