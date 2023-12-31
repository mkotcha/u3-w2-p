import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const TopBar = () => {
  return (
    <Navbar expand="md" sticky="top" className="navbar bg-primary shadow" data-bs-theme="dark">
      <Container className="text-white">
        <NavLink className="navbar-brand" to="/">
          EpiWeather
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink className="nav-link" to="/">
              Home
            </NavLink>
            <NavLink className="nav-link" to="/weather">
              Weather
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default TopBar;
