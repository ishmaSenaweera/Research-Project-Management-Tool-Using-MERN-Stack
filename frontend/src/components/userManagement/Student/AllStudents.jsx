import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BlockList from "../Blocks/listBlock.components";

function AllStudents() {
  const [studentsData, setStudentsData] = useState([]);

  const navigate = useNavigate();

  async function getData() {
    try {
      const result = await axios.get("http://localhost:8000/student/");

      setStudentsData(result.data);
    } catch (err) {
      console.log(err);
    }
  }

  function viewDetails(params) {
    navigate("/students/account", { state: params });
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <BlockList
      data={studentsData}
      viewDetails={viewDetails}
      heading="Students"
    />
  );
}

export default AllStudents;
