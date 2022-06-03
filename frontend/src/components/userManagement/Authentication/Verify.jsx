import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function Verify() {
  const [isVerify, setIsVerify] = useState("");
  const param = useParams();

  const navigate = useNavigate();

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
