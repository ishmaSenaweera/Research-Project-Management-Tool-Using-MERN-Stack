import axios from "axios";
import { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

function AuthContextProvider(props) {
  /* Setting the state of the component. */
  const [loggedIn, setLoggedIn] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);

  // ────────────────────────────────────────────────────────────────────────────────

  /**
   * GetLoggedIn() is an async function that uses axios to make a get request to the backend route
   * '/login/loggedin' and sets the state of the loggedIn variable to the response data.
   */
  async function getLoggedIn() {
    try {
      const loggedInRes = await axios.get(
        "http://localhost:8000/auth/loggedin",
        {
          withCredentials: true,
        }
      );

      setLoggedIn(loggedInRes.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  }

  // ────────────────────────────────────────────────────────────────────────────────

  /* Calling the getLoggedIn() function when the component mounts. */
  useEffect(() => {
    getLoggedIn();
  }, []);

  // ────────────────────────────────────────────────────────────────────────────────

  /* This is a conditional statement that checks if the isLoading state is true. If it is, it will return
the loading message. */
  if (isLoading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  // ────────────────────────────────────────────────────────────────────────────────

  /* Returning the AuthContext.Provider component with the value of loggedIn and getLoggedIn. */
  return (
    <AuthContext.Provider value={{ loggedIn, getLoggedIn }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
export { AuthContextProvider };
