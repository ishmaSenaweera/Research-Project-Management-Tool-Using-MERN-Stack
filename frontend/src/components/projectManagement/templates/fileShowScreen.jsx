import SingleFileScreen from "./singleFileScreen";
import MultipleFileScreen from "./multipleFileScreen";
import { useState } from "react";
import { useLocation } from "react-router-dom";

function FileShowScreen() {
  const [componentType, setComponentType] = useState("1")
  const { state } = useLocation();
  const [activeTab, setActiveTab] = useState(false);

  return (
    <div className="container-md p-10 mt-5">
      <div className="card">
        <div className="card-header">
          <ul class="nav nav-tabs">
            <li class="nav-item"><button className="btn" onClick={()=> {setComponentType("1"), setActiveTab(true)}}>Templates</button></li>
            <li class="nav-item"><button className="btn" onClick={()=> {setComponentType("2"), setActiveTab(true)}}>Other Templates</button></li>
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
