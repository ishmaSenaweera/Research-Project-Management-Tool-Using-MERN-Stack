import React, { useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import AuthContext from "../context/LoginContext";
import LogOut from "../userManagement/auth/Logout";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";

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
                {/* <Link to="/register">
                  <button>Register</button>
                </Link>
                <Link to="/">
                  <button>Login</button>
                </Link> */}
              </>
            )}

            {loggedIn === "Admin" ? (
              <>
                <Nav.Link href="/students">All Students</Nav.Link>
                <Nav.Link href="/staffs">All Staff</Nav.Link>
                <Nav.Link href="/admins">All Admin</Nav.Link>
                <Nav.Link href="/chat">Chat</Nav.Link>

                {/* <Link to="/students">
                  <button>All Students</button>
                </Link>
                <Link to="/staffs">
                  <button>All Staff</button>
                </Link>
                <Link to="/admins">
                  <button>All Admin</button>
                </Link>
                <Link to="/chat">
                  <button>Chat</button>
                </Link> */}
              </>
            ) : (
              ""
            )}

            {loggedIn === "Student" ||
            loggedIn === "Staff" ||
            loggedIn === "Admin" ? (
              <>
                {/* <Nav.Link href="/">Home</Nav.Link> */}
                <Nav.Link href="/account">Account</Nav.Link>

                {/* <Link to="/account">
                  <button>Account</button>
                </Link>
                <Link to="/">
                  <button>Home</button>
                </Link> */}
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
