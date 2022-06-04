import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import BlockAccount from "../Blocks/accountBlock.components";

function AccountStudent() {
  const { state } = useLocation();

  if (state.dob) {
    const dobEdited = new Date(state.dob).toISOString().substring(0, 10);
    state.dobEdited = dobEdited;
  }

  const navigate = useNavigate();

  /**
   * It deletes a student from the database.
   * @returns the deleteStudent function.
   */
  async function deleteStudent() {
    try {
      if (!window.confirm("Are you sure you wish to delete this account?")) {
        return;
      }
      const data = {
        id: state._id,
      };
      await axios.delete("http://localhost:8000/student/delete", {
        data,
      });
      navigate("/students");
    } catch (err) {
      console.log(err);
    }
  }

  /**
   * When the user clicks the update button, navigate to the update page and pass the state as a
   * parameter.
   */
  async function updateStudent() {
    navigate("/students/update", { state: state });
  }

  return (
    /* A component that is being called. */
    <BlockAccount
      userData={state}
      heading="Student Account"
      type="Student"
      delete={deleteStudent}
      edit={updateStudent}
    />
  );
}

export default AccountStudent;
