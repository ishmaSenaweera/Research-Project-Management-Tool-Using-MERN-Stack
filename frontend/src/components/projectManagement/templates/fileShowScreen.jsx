import SingleFileScreen from "./singleFileScreen";
import MultipleFileScreen from "./multipleFileScreen";
import { useState } from "react";
import { useLocation } from "react-router-dom";

function FileShowScreen() {
  const [componentType, setComponentType] = useState("1")
  const { state } = useLocation();

  return (
    <div className="container-md p-10 mt-5">
      <div className="card">
        <div className="card-header">
          <ul class="nav nav-tabs">
            <li class="nav-item"><span className="nav-link" onClick={()=> setComponentType("1")}>Templates</span></li>
            <li class="nav-item"><span className="nav-link" onClick={()=> setComponentType("2")}>Other Templates</span></li>
          </ul>
        </div>
        <div className="card-body">
          {componentType === "1" ? (<SingleFileScreen/>):(<MultipleFileScreen/>)}

        </div>
      </div>
    </div>
  );
}

export default FileShowScreen;
