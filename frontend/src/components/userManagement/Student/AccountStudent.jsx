import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import BlockAccount from "../blocks/accountBlock.components";

function AccountStudent() {
  const { state } = useLocation();

  if (state.dob) {
    const dobEdited = new Date(state.dob).toISOString().substring(0, 10);
    state.dobEdited = dobEdited;
  }

  const navigate = useNavigate();

  async function deleteStudent() {
    try {
      const data = {
        id: state._id,
      };
      const result = await axios.delete(
        "http://localhost:8000/student/delete",
        {
          data,
        }
      );
      navigate("/students");
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  }

  async function updateStudent() {
    console.log("student");
    navigate("/students/update", { state: state });
  }

  return (
    <BlockAccount
      userData={state}
      heading="System Admin Account"
      type="Student"
      delete={deleteStudent}
      edit={updateStudent}
    />
  );
}

export default AccountStudent;
