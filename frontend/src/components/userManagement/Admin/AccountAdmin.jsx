import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import BlockAccount from "../Blocks/accountBlock.components";

function AccountAdmin() {
  const { state } = useLocation();

  if (state.dob) {
    const dobEdited = new Date(state.dob).toISOString().substring(0, 10);
    state.dobEdited = dobEdited;
  }

  const navigate = useNavigate();

  /**
   * It's a function that deletes an admin account from the database.
   * @returns the deleteAdmin function.
   */
  async function deleteAdmin() {
    try {
      if (!window.confirm("Are you sure you wish to delete this account?")) {
        return;
      }
      const data = {
        id: state._id,
      };
      await axios.delete("http://localhost:8000/admin/delete", {
        data,
      });
      navigate("/staffs");
    } catch (err) {
      console.log(err);
    }
  }

  /**
   * When the user clicks the button, navigate to the update page and pass the state as a parameter.
   */
  async function updateAdmin() {
    console.log("staff");
    navigate("/admins/update", { state: state });
  }

  return (
    /* It's a component that displays the user's information. */
    <BlockAccount
      userData={state}
      heading="Admin Account"
      type="Admin"
      delete={deleteAdmin}
      edit={updateAdmin}
    />
  );
}

export default AccountAdmin;
