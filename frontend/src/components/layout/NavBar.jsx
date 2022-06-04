import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import AuthContext from "../userManagement/context/LoginContext";
import LogOut from "../userManagement/Authentication/Logout";
import { Container, Nav, Navbar } from "react-bootstrap";

function NavBar() {
  const { loggedIn, getLoggedIn } = useContext(AuthContext);

  const location = useLocation();

  useEffect(() => {
    getLoggedIn();
  }, [location]);

  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">SLIIT</Navbar.Brand>
          <Nav className="me-auto">
            {loggedIn === false && (
              <>
                <Nav.Link href="/register">Register</Nav.Link>
                <Nav.Link href="/">Login</Nav.Link>
              </>
            )}

            {loggedIn === "Admin" ? (
              <>
                <Nav.Link href="/students">All Students</Nav.Link>
                <Nav.Link href="/staffs">All Staff</Nav.Link>
                <Nav.Link href="/admins">All Admin</Nav.Link>
              </>
            ) : (
              ""
            )}

            {loggedIn === "Student" ? (
              <>
                <Nav.Link href="/addGroup">Create Group</Nav.Link>
                <Nav.Link href="/req">Request Supervisor</Nav.Link>
                <Nav.Link href="/researchTopic/save">Research Topics</Nav.Link>
              </>
            ) : (
              ""
            )}
            {loggedIn === "Staff" || loggedIn === "Admin" ? (
              <>
                <Nav.Link href="/allGroups">All Groups</Nav.Link>
                <Nav.Link href="/templates">Add Templates</Nav.Link>
                <Nav.Link href="/researchTopic/view">Research Topics</Nav.Link>
              </>
            ) : (
              ""
            )}

            {loggedIn === "Student" ||
            loggedIn === "Staff" ||
            loggedIn === "Admin" ? (
              <>
                <Nav.Link href="/chat">Chat</Nav.Link>
                <Nav.Link href="/templates/show">Templates</Nav.Link>

                <Nav.Link href="/StudentView">View marking schemes</Nav.Link>
                <Nav.Link href="/SendFeedback">Send feedback</Nav.Link>
              </>
            ) : (
              ""
            )}
          </Nav>
          <Nav>
            {loggedIn === "Student" ||
            loggedIn === "Staff" ||
            loggedIn === "Admin" ? (
              <>
                <Nav.Link href="/account">Account</Nav.Link>
                <LogOut />
              </>
            ) : (
              ""
            )}
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavBar;
