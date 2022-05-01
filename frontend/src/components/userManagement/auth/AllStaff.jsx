import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/LoginContext";

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

  function click(params) {
    navigate("/staffs/account", { state: params });
  }

  function staffList() {
    return staffData.map((currentStaff, index) => {
      return (
        <tr key={currentStaff._id}>
          <td>{currentStaff.name}</td>
          <td>{currentStaff.email}</td>
          <td>{currentStaff.gender}</td>
          <td>
            <button onClick={click.bind(this, currentStaff)}>View</button>
          </td>
        </tr>
      );
    });
  }

  useEffect(async () => {
    await getData();
  }, []);

  return (
    <div style={{ margin: "30px" }}>
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
