import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BlockList from "../Blocks/listBlock.components";

function AllStudents() {
  const [studentsData, setStudentsData] = useState([]);

  const navigate = useNavigate();

  /**
   * GetData() is an async function that uses axios to get data from the server and then sets the state
   * of the studentsData variable to the data that was received from the server.
   */
  async function getData() {
    try {
      const result = await axios.get("http://localhost:8000/student/");

      setStudentsData(result.data);
    } catch (err) {
      console.log(err);
    }
  }

  /**
   * When the user clicks on the button, the viewDetails function will be called, and the navigate
   * function will be called with the parameters of the viewDetails function.
   */
  function viewDetails(params) {
    navigate("/students/account", { state: params });
  }

  /* A hook that is being called. */
  useEffect(() => {
    getData();
  }, []);

  return (
    /* A component that is being called. */
    <BlockList
      data={studentsData}
      viewDetails={viewDetails}
      heading="Students"
    />
  );
}

export default AllStudents;
