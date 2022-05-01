import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/LoginContext";

function AllStudents() {
  const { loggedIn } = useContext(AuthContext);

  const [studentsData, setStudentsData] = useState([]);

  const navigate = useNavigate();

  async function getData() {
    try {
      const result = await axios.get("http://localhost:5000/student/");

      setStudentsData(result.data);
    } catch (err) {
      //await getLoggedIn();
      console.log(err);
    }
  }

  function studentList() {
    return studentsData.map((currentStudent, index) => {
      return (
        <tr key={currentStudent._id}>
          <td>{index + 1}</td>
          <td>{currentStudent.name}</td>
          <td>{currentStudent.email}</td>
          <td>{currentStudent.batch}</td>
          <td>{currentStudent.specialization}</td>
          <td>{currentStudent.branch}</td>
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
            <th>Batch</th>
            <th>Specialization</th>
            <th>Branch</th>
          </tr>
        </thead>
        <tbody>{studentList()}</tbody>
      </table>
      <hr />
    </div>
  );
}

export default AllStudents;
