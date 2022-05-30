import React, { useContext, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import AuthContext from "../../context/LoginContext";
import BlockEdit from "../blocks/editBlock.components";

function UpdateUser() {
  const { state } = useLocation();
  const dobEdited = new Date(state.dob).toISOString().substring(0, 10);

  const [name, setName] = useState(state.name);
  const [dob, setDob] = useState(dobEdited);
  const [gender, setGender] = useState(state.gender);
  const [specialization, setSpecialization] = useState(state.specialization);
  const [batch, setBatch] = useState(state.batch);
  const [branch, setBranch] = useState(state.branch);
  const [mobile, setMobile] = useState(state.mobile);
  const [nic, setNic] = useState(state.nic);
  const [email, setEmail] = useState(state.email);

  const navigate = useNavigate();
  const { loggedIn } = useContext(AuthContext);

  async function edit(editedData) {
    try {
      await axios.put("http://localhost:8000/account/update", editedData);
      alert("Updated Successfully");
      //await getLoggedIn();
      navigate("/account");
    } catch (err) {
      //await getLoggedIn();
      console.error(err);
    }
  }

  return (
    <BlockEdit
      data={state}
      edit={edit}
      heading="Edit User"
      loggedIn={loggedIn}
    />
  );
}

export default UpdateUser;
