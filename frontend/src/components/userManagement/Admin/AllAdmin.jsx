import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AllAdmin() {
  const [adminData, setAdminData] = useState([]);

  const navigate = useNavigate();

  async function getData() {
    try {
      const result = await axios.get("http://localhost:8000/admin/");

      setAdminData(result.data);
    } catch (err) {
      //await getLoggedIn();
      console.log(err);
    }
  }

  function viewDetails(params) {
    navigate("/admins/account", { state: params });
  }

  function addAdmin() {
    navigate("/admins/add");
  }

  function adminList() {
    return adminData.map((currentAdmin, index) => {
      return (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{currentAdmin.name}</td>
          <td>{currentAdmin.email}</td>
          <td>{currentAdmin.gender}</td>
          <td>
            <button onClick={viewDetails.bind(this, currentAdmin)}>View</button>
          </td>
        </tr>
      );
    });
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div style={{ margin: "30px" }}>
      <button onClick={addAdmin}>Add</button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Gender</th>
          </tr>
        </thead>
        <tbody>{adminList()}</tbody>
      </table>
      <hr />
    </div>
  );
}

export default AllAdmin;
