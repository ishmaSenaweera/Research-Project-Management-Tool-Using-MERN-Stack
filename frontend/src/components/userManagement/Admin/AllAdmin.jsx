import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BlockList from "../Blocks/listBlock.components";

function AllAdmin() {
  const [adminData, setAdminData] = useState([]);

  const navigate = useNavigate();

  /**
   * GetData() is an async function that uses axios to get data from the server, and then sets the state
   * of the adminData variable to the data that was received from the server.
   */
  async function getData() {
    try {
      const result = await axios.get("http://localhost:8000/admin/");

      setAdminData(result.data);
    } catch (err) {
      console.log(err);
    }
  }

  /**
   * When the user clicks on the button, the viewDetails function is called, which navigates to the
   * /admins/account route, passing the params object as the state.
   */
  function viewDetails(params) {
    navigate("/admins/account", { state: params });
  }

  /**
   * It navigates to the add admin page.
   */
  function addAdmin() {
    navigate("/admins/add");
  }

  /* Calling the getData() function when the component is mounted. */
  useEffect(() => {
    getData();
  }, []);

  return (
    /* Calling the BlockList component, and passing the adminData, addAdmin, viewDetails, and heading props
to it. */
    <BlockList
      data={adminData}
      add={addAdmin}
      viewDetails={viewDetails}
      heading="Admins"
    />
  );
}

export default AllAdmin;
