import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BlockList from "../Blocks/listBlock.components";

function AllStaff() {
  const [staffData, setStaffData] = useState([]);

  const navigate = useNavigate();

  /**
   * When the component mounts, get the data from the API and set the state with the data.
   */
  async function getData() {
    try {
      const result = await axios.get("http://localhost:8000/staff/");

      setStaffData(result.data);
    } catch (err) {
      console.log(err);
    }
  }

  /**
   * It's a function that takes in a parameter and then navigates to a page with the parameter as a
   * state.
   */
  function viewDetails(params) {
    navigate("/staffs/account", { state: params });
  }

  /**
   * When the user clicks the button, navigate to the add staff page.
   */
  function addStaff() {
    navigate("/staffs/add");
  }

  /* A hook that is used to perform side effects in function components. */
  useEffect(() => {
    getData();
  }, []);

  return (
    /* A component that is being called. */
    <BlockList
      data={staffData}
      add={addStaff}
      viewDetails={viewDetails}
      heading="Staffs"
    />
  );
}

export default AllStaff;
