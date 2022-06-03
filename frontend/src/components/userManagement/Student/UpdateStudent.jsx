import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import BlockEdit from "../Blocks/editBlock.components";

function UpdateStudent() {
  const { state } = useLocation();

  const navigate = useNavigate();

  async function edit(editedData) {
    try {
      await axios.put("http://localhost:8000/student/update", editedData);
      alert("Updated Successfully");

      navigate("/students");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <BlockEdit
      data={state}
      edit={edit}
      heading="Edit Student"
      loggedIn="Student"
    />
  );
}

export default UpdateStudent;
