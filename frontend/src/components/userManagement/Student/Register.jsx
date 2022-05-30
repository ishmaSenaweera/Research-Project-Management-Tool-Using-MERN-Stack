import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BlockRegister from "../blocks/registerBlock.components";

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

  return <BlockRegister register={register} heading="Register" />;
}

export default Register;
