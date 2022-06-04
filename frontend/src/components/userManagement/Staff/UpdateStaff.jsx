import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import BlockEdit from "../Blocks/editBlock.components";

function UpdateStaff() {
  const { state } = useLocation();

  const navigate = useNavigate();

  /**
   * It takes the edited data from the form and sends it to the server to update the database.
   */
  async function edit(editedData) {
    try {
      await axios.put("http://localhost:8000/staff/update", editedData);
      alert("Updated Successfully");

      navigate("/staffs");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    /* A component that is used to edit the data. */
    <BlockEdit data={state} edit={edit} heading="Edit Staff" loggedIn="Staff" />
  );
}

export default UpdateStaff;
