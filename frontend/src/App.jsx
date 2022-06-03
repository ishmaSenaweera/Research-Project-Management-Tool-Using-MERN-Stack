import axios from "axios";
import React from "react";
import { AuthContextProvider } from "./components/context/LoginContext";
import Routers from "./components/routers/SiteRouters";
import ButterToast, { POS_RIGHT, POS_TOP } from "butter-toast";

axios.defaults.withCredentials = true;

function App() {
  return (
    <AuthContextProvider>
      <Routers />
      <ButterToast position={{ vertical: POS_TOP, horizontal: POS_RIGHT }} />
    </AuthContextProvider>
  );
}

export default App;
