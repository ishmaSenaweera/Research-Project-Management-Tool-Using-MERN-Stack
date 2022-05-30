import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BlockList from "../blocks/listBlock.components";

function AllStaff() {
  const [staffData, setStaffData] = useState([]);

  const navigate = useNavigate();

  async function getData() {
    try {
      const result = await axios.get("http://localhost:8000/staff/");

      setStaffData(result.data);
    } catch (err) {
      //await getLoggedIn();
      console.log(err);
    }
  }

  function viewDetails(params) {
    navigate("/staffs/account", { state: params });
  }

  function addStaff() {
    navigate("/staffs/add");
  }

  function staffList() {
    return staffData.map((currentStaff, index) => {
      return (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{currentStaff.name}</td>
          <td>{currentStaff.email}</td>
          <td>{currentStaff.gender}</td>
          <td>
            <button onClick={viewDetails.bind(this, currentStaff)}>View</button>
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
      data={staffData}
      addCustomer={addStaff}
      viewDetails={viewDetails}
      heading="Staff"
    />
  );
}

export default AllStaff;
