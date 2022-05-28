import axios from "axios";
import React from "react";
import { AuthContextProvider } from "./components/context/LoginContext";
import Routers from "./SiteRouters";

axios.defaults.withCredentials = true;

function App() {
  return (
    <AuthContextProvider>
      <Routers />
    </AuthContextProvider>
  );
}

export default App;
