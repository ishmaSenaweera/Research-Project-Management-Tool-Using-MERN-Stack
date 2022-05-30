import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BlockList from "../blocks/listBlock.components";

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
    <BlockList
      data={adminData}
      addCustomer={addAdmin}
      viewDetails={viewDetails}
      heading="Admins"
    />
  );
}

export default AllAdmin;
