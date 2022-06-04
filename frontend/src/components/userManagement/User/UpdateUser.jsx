import { useContext } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import AuthContext from "../context/LoginContext";
import BlockEdit from "../Blocks/editBlock.components";

function UpdateUser() {
  const { state } = useLocation();

  const navigate = useNavigate();
  const { loggedIn } = useContext(AuthContext);

/**
 * It takes the edited data from the form and sends it to the server to update the database.
 */
  async function edit(editedData) {
    try {
      await axios.put("http://localhost:8000/account/update", editedData);
      alert("Updated Successfully");

      navigate("/account");
    } catch (err) {
      console.error(err);
    }
  }

  return (
/* A component that is used to edit the user. */
    <BlockEdit
      data={state}
      edit={edit}
      heading="Edit User"
      loggedIn={loggedIn}
    />
  );
}

export default UpdateUser;
