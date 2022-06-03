import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import BlockEdit from "../Blocks/editBlock.components";

function UpdateStaff() {
  const { state } = useLocation();

  const navigate = useNavigate();

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
    <BlockEdit data={state} edit={edit} heading="Edit Staff" loggedIn="Staff" />
  );
}

export default UpdateStaff;
