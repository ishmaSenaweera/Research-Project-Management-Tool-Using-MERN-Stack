import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BlockList from "../Blocks/listBlock.components";

function AllStaff() {
  const [staffData, setStaffData] = useState([]);

  const navigate = useNavigate();

  async function getData() {
    try {
      const result = await axios.get("http://localhost:8000/staff/");

      setStaffData(result.data);
    } catch (err) {

      console.log(err);
    }
  }

  function viewDetails(params) {
    navigate("/staffs/account", { state: params });
  }

  function addStaff() {
    navigate("/staffs/add");
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <BlockList
      data={staffData}
      add={addStaff}
      viewDetails={viewDetails}
      heading="Staffs"
    />
  );
}

export default AllStaff;
