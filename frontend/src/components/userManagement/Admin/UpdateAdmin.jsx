import React, { useContext, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import AuthContext from "../../context/LoginContext";
import BlockEdit from "../blocks/editBlock.components";

function UpdateAdmin() {
  const { state } = useLocation();

  const navigate = useNavigate();

  async function edit(editedData) {
    try {
      await axios.put("http://localhost:8000/admin/update", editedData);
      alert("Updated Successfully");
      //await getLoggedIn();
      navigate("/admins");
    } catch (err) {
      //await getLoggedIn();
      console.error(err);
    }
  }

  return (
    <BlockEdit data={state} edit={edit} heading="Edit Admin" loggedIn="Admin" />
  );
}

export default UpdateAdmin;
