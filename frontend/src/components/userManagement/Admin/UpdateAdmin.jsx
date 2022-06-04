import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import BlockEdit from "../Blocks/editBlock.components";

function UpdateAdmin() {
  const { state } = useLocation();

  const navigate = useNavigate();

  /**
   * It takes in an object, sends it to the server, and then navigates to a different page.
   */
  async function edit(editedData) {
    try {
      await axios.put("http://localhost:8000/admin/update", editedData);
      alert("Updated Successfully");

      navigate("/admins");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    /* Rendering the BlockEdit component. */
    <BlockEdit data={state} edit={edit} heading="Edit Admin" loggedIn="Admin" />
  );
}

export default UpdateAdmin;
