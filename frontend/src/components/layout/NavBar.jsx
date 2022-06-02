import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import AuthContext from "../context/LoginContext";
import LogOut from "../userManagement/auth/Logout";
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
          <Navbar.Brand href="/">Sliit</Navbar.Brand>
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
                <Nav.Link href="/allGroups">All Groups</Nav.Link>

              </>
            ) : (
              ""
            )}

            {loggedIn === "Student" ? (
              <>
                <Nav.Link href="/addGroup">Create Group</Nav.Link>

              </>
            ) : (
              ""
            )}

            {loggedIn === "Student" ||
            loggedIn === "Staff" ||
            loggedIn === "Admin" ? (
              <>
                <Nav.Link href="/chat">Chat</Nav.Link>


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
