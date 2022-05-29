import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AllStudents() {
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

  function viewDetails(params) {
    navigate("/students/account", { state: params });
  }

  function studentList() {
    return studentsData.map((currentStudent, index) => {
      return (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{currentStudent.name}</td>
          <td>{currentStudent.email}</td>
          <td>{currentStudent.batch}</td>
          <td>{currentStudent.specialization}</td>
          <td>{currentStudent.branch}</td>
          <td>
            <button onClick={viewDetails.bind(this, currentStudent)}>
              View
            </button>
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
