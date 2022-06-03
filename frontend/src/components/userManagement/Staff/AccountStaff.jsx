import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import BlockAccount from "../Blocks/accountBlock.components";

function AccountStaff() {
  const { state } = useLocation();

  if (state.dob) {
    const dobEdited = new Date(state.dob).toISOString().substring(0, 10);
    state.dobEdited = dobEdited;
  }

  const navigate = useNavigate();

  async function deleteStaff() {
    try {
      if (!window.confirm("Are you sure you wish to delete this account?")) {
        return;
      }

      const data = {
        id: state._id,
      };

      await axios.delete("http://localhost:8000/staff/delete", {
        data,
      });
      navigate("/staffs");
    } catch (err) {
      console.log(err);
    }
  }

  async function updateStaff() {
    console.log("staff");
    navigate("/staffs/update", { state: state });
  }

  return (
    <BlockAccount
      userData={state}
      heading="Staff Account"
      type="Staff"
      delete={deleteStaff}
      edit={updateStaff}
    />
  );
}

export default AccountStaff;
