import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

function AuthContextProvider(props) {
  const [loggedIn, setLoggedIn] = useState(undefined);
  const [isLoading, setIsLoadig] = useState(true);

  async function getLoggedIn() {
    const loggedInRes = await axios.get("http:///localhost:5000/auth/loggedIn");
    setLoggedIn(loggedInRes.data);
    setIsLoadig(false);
  }

  useEffect(() => {
    console.log("hi");
    getLoggedIn();
  }, [props]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ loggedIn, getLoggedIn }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
export { AuthContextProvider };
