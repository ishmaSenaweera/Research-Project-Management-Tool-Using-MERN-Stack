import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AllStaff() {
  const [staffData, setStaffData] = useState([]);

  const navigate = useNavigate();

  async function getData() {
    try {
      const result = await axios.get("http://localhost:5000/staff/");

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
    <div style={{ margin: "30px" }}>
      <button onClick={addStaff}>Add</button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Gender</th>
          </tr>
        </thead>
        <tbody>{staffList()}</tbody>
      </table>
      <hr />
    </div>
  );
}

export default AllStaff;
