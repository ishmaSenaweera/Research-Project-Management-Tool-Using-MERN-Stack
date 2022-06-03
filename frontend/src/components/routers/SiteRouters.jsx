import { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../userManagement/Home";
import NavBar from "../layout/NavBar";
import Login from "../userManagement/Authentication/Login";
import Register from "../userManagement/Student/Register";
import Verify from "../userManagement/Authentication/Verify";
import AuthContext from "../userManagement/context/LoginContext";
import AccountUser from "../userManagement/User/AccountUser";
import UpdateUser from "../userManagement/User/UpdateUser";
import AllStudents from "../userManagement/Student/AllStudents";
import AllStaff from "../userManagement/Staff/AllStaff";
import AddStaff from "../userManagement/Staff/AddStaff";
import UpdateStaff from "../userManagement/Staff/UpdateStaff";
import AccountStaff from "../userManagement/Staff/AccountStaff";
import UpdateStudent from "../userManagement/Student/UpdateStudent";
import AccountStudent from "../userManagement/Student/AccountStudent";
import ChangePassword from "../userManagement/User/ChangePassword";
import AllAdmin from "../userManagement/Admin/AllAdmin";
import AccountAdmin from "../userManagement/Admin/AccountAdmin";
import UpdateAdmin from "../userManagement/Admin/UpdateAdmin";
import AddAdmin from "../userManagement/Admin/AddAdmin";
import ChatHandler from "../chatService/chatHandler.components";
import AddGroup from "../groupsManagement/addGroup";
import AllGroups from "../groupsManagement/allGroups";
import FileUploadScreen from "../projectManagement/templates/fileUploadScreen";
import FileShowScreen from "../projectManagement/templates/fileShowScreen";
import ResearchTopicAdd from "../projectManagement/researchTopic/researchTopicAdd";
import ResearchTopicView from "../projectManagement/researchTopic/researchTopicView";
import ResearchTopicEdit from "../projectManagement/researchTopic/researchTopicEdit";
import ReqSupervisor from "../groupsManagement/requestSup";

function SiteRouters() {
  const { loggedIn } = useContext(AuthContext);
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/verify/:id/:token" element={<Verify />} />

          {loggedIn === false ? (
            <>
              <Route path="/register" element={<Register />} />
              <Route path="/" element={<Login />} />
              <Route path="*" element={<Login />} />
            </>
          ) : (
            ""
          )}

          {loggedIn === "Admin" ? (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/account" element={<AccountUser />} />
              <Route path="/account/update" element={<UpdateUser />} />
              <Route
                path="/account/changepassword"
                element={<ChangePassword />}
              />

              <Route path="/students" element={<AllStudents />} />
              <Route path="/students/account" element={<AccountStudent />} />
              <Route path="/students/update" element={<UpdateStudent />} />

              <Route path="/staffs" element={<AllStaff />} />
              <Route path="/staffs/account" element={<AccountStaff />} />
              <Route path="/staffs/add" element={<AddStaff />} />
              <Route path="/staffs/update" element={<UpdateStaff />} />

              <Route path="/admins" element={<AllAdmin />} />
              <Route path="/admins/account" element={<AccountAdmin />} />
              <Route path="/admins/add" element={<AddAdmin />} />
              <Route path="/admins/update" element={<UpdateAdmin />} />

              <Route path="*" element={<Home />} />
            </>
          ) : (
            ""
          )}

          {loggedIn === "Student" || loggedIn === "Staff" ? (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/account" element={<AccountUser />} />
              <Route path="/account/update" element={<UpdateUser />} />

              <Route
                path="/account/changepassword"
                element={<ChangePassword />}
              />

              <Route path="/addGroup" element={<AddGroup />} />
              <Route path="/allGroups" element={<AllGroups />} />
              <Route path="/req" element={<ReqSupervisor />} />

              <Route path="/chat" element={<ChatHandler />} />

              <Route
                path="/researchTopic/save"
                element={<ResearchTopicAdd />}
              />

              <Route path="*" element={<Home />} />
            </>
          ) : (
            ""
          )}

          {loggedIn === "Staff" || loggedIn === "Admin" ? (
            <>
              <Route path="/templates" element={<FileUploadScreen />} />
              <Route
                path="/researchTopic/view"
                element={<ResearchTopicView />}
              />
              <Route
                path="/researchTopic/edit"
                element={<ResearchTopicEdit />}
              />
            </>
          ) : (
            ""
          )}
          {loggedIn === "Staff" ||
          loggedIn === "Admin" ||
          loggedIn === "Student" ? (
            <>
              <Route path="/templates/show" element={<FileShowScreen />} />
            </>
          ) : (
            ""
          )}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default SiteRouters;
