import axios from "axios";
import React from "react";
import { AuthContextProvider } from "./components/userManagement/context/LoginContext";
import Routers from "./components/routers/SiteRouters";

axios.defaults.withCredentials = true;

function App() {
  return (
    <AuthContextProvider>
      <Routers />
    </AuthContextProvider>
  );
}

export default App;
