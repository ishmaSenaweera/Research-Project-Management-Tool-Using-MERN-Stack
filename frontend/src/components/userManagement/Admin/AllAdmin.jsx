import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BlockList from "../Blocks/listBlock.components";

function AllAdmin() {
  const [adminData, setAdminData] = useState([]);

  const navigate = useNavigate();

  async function getData() {
    try {
      const result = await axios.get("http://localhost:8000/admin/");

      setAdminData(result.data);
    } catch (err) {
      console.log(err);
    }
  }

  function viewDetails(params) {
    navigate("/admins/account", { state: params });
  }

  function addAdmin() {
    navigate("/admins/add");
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <BlockList
      data={adminData}
      add={addAdmin}
      viewDetails={viewDetails}
      heading="Admins"
    />
  );
}

export default AllAdmin;
