import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import BlockAccount from "../blocks/accountBlock.components";

function AccountAdmin() {
  const { state } = useLocation();

  if (state.dob) {
    const dobEdited = new Date(state.dob).toISOString().substring(0, 10);
    state.dobEdited = dobEdited;
  }

  const navigate = useNavigate();

  async function deleteAdmin() {
    try {
      const data = {
        id: state._id,
      };

      const result = await axios.delete("http://localhost:8000/admin/delete", {
        data,
      });
      navigate("/staffs");
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  }

  async function updateAdmin() {
    console.log("staff");
    navigate("/admins/update", { state: state });
  }

  return (
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
