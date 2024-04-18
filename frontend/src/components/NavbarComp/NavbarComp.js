import "./Navbar.css";
import {Container, Form, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useNavigate, useSearchParams } from "react-router-dom";
import { BsPerson, BsCardList } from "react-icons/bs";
import { GoSignOut } from "react-icons/go";
import useAuth from "../../hooks/useAuth";

const NavbarComp = ({ onSearch }) => {
  const navigate = useNavigate();
  const {authUser, logout} = useAuth();
  const role = authUser.role;

  function handleSignOut() {
    logout();
    navigate("/");
  }

  const [searchParams] = useSearchParams();
  let searchQuery = searchParams.get("search");
  if (searchQuery) {
    onSearch(searchQuery);
  }

  return (
    <Navbar
      bg="light"
      expand="md"
      sticky="top"
      className="navbar"
      data-testid="navbar"
    >
      <Container fluid>
        <Navbar.Brand href="/" className="colorFullText">
          Mentor me!
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Form className="d-flex ms-auto">
          <Nav className="mr-auto">
            <Nav.Link href="/feed">Home</Nav.Link>

            <NavDropdown
              title={
                <>
                  <BsPerson /> Your Account
                </>
              }
              className="fs-6 text-dark"
              id="basic-nav-dropdown"
              align="end"
            >
              {(role === "TUTOR" || role === "STUDENT") && (
                <>
                  {/* <NavDropdown.Item href="/view-profile">
                    <BsPerson /> View Profile
                  </NavDropdown.Item> */}
                  <NavDropdown.Item href="/user-posts">
                    <BsCardList />  My posts
                  </NavDropdown.Item>
                </>
              )}
              {role === "ADMIN" && (
                <>
                  {/* <NavDropdown.Item href="/view-profile">
                    <BsPerson /> View Profile
                  </NavDropdown.Item> */}
                  <NavDropdown.Item href="/manage-posts">
                    <BsCardList /> Manage Posts
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/manage-users">
                  <BsPerson />  Manage Users
                  </NavDropdown.Item>
                </>
              )}
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleSignOut}>
                <GoSignOut /> Sign out
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>

          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComp;
