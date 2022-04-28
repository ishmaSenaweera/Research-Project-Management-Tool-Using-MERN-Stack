import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function Verify() {
  const [isVerify, setIsVerify] = useState("");
  const param = useParams();

  async function verifyUrl() {
    try {
      const url = `http://localhost:5000/auth/verify/${param.id}/${param.token}`;

        console.log(url);
      const result = await axios.get(url);

      console.log(result.data);
      setIsVerify(true);
    } catch (err) {
      setIsVerify(false);
      console.error(err);
    }
  }

  useEffect(() => {
    verifyUrl();
  }, [param]);

  return <div>{isVerify ? <h1>Verified</h1> : <h1>404 not found</h1>}</div>;
}

export default Verify;
