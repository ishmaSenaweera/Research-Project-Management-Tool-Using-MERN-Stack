import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

function AccountAdmin() {
  const { state } = useLocation();

  const navigate = useNavigate();

  async function deleteUser() {
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

  async function updateUser() {
    console.log("staff");
    navigate("/admins/update", { state: state });
  }

  return (
    <div>
      <div>
        <h1>Admin Account = {state.name}</h1>
      </div>
      <div>
        <h1>dob: </h1>
        <h3> {state.dob}</h3>
      </div>
      <div>
        <h1>email: </h1>
        <h3> {state.email}</h3>
      </div>
      <div>
        <h1>Gender: </h1>
        <h3> {state.gender}</h3>
      </div>
      <div>
        <h1>Nic: </h1>
        <h3> {state.nic}</h3>
      </div>
      <div>
        <h1>Mobile: </h1>
        <h3> {state.mobile}</h3>
      </div>
      <button
        onClick={() => {
          if (window.confirm("Are you sure you wish to delete this account?"))
            deleteUser();
        }}
      >
        Delete
      </button>
      <button onClick={updateUser}>Edit</button>
    </div>
  );
}

export default AccountAdmin;
