import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function Verify() {
  const [isVerify, setIsVerify] = useState("");
  /* A hook that is used to get the parameters from the url. */
  const param = useParams();

  const navigate = useNavigate();

  /**
   * It takes the id and token from the url and sends a get request to the server to verify the user.
   */
  async function verifyUrl() {
    try {
      const url = `http://localhost:8000/auth/verify/${param.id}/${param.token}`;
      await axios.get(url);

      setIsVerify(true);
      console.log("Verified");
      window.alert("Successfully Verified!");
      navigate("/");
    } catch (err) {
      setIsVerify(false);
      console.error(err);
    }
  }

  /* Calling the function verifyUrl() when the component is mounted. */
  useEffect(() => {
    verifyUrl();
  }, []);

  return (
    <div>
      {isVerify === "" ? <h1>Loading...</h1> : ""}
      {isVerify === true ? <h1>Successfully Verified!</h1> : ""}
      {isVerify === false ? <h1>404 Not Found!</h1> : ""}
    </div>
  );
}

export default Verify;
