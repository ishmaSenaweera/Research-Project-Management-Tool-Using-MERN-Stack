import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/LoginContext";
import BlockRegister from "../blocks/registerBlock.components";

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

  async function register(registerData) {
    try {

      await axios.post("http://localhost:8000/staff/register", registerData);
      alert("Verification Email Sent successfully");
      await getLoggedIn();
      navigate("/staffs");
    } catch (err) {
      console.error(err);
    }
  }

  return <BlockRegister register={register} heading="Add Staff" />;
}

export default AddStaff;
