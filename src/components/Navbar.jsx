import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";

function AppNavbar() {
  return (
    <Navbar bg="dark" data-bs-theme="dark" expand="md" className="shadow" collapseOnSelect>
      <Container>
        <Navbar.Brand as={NavLink} to="/books" className="fw-bold text-white">
          <span className="me-2">📚</span>
          <span className="d-none d-sm-inline">Book Library</span>
          <span className="d-inline d-sm-none">Library</span>
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="navbar-nav" className="border-light">
          <span className="navbar-toggler-icon"></span>
        </Navbar.Toggle>
        
        <Navbar.Collapse id="navbar-nav" className="justify-content-end">
          <Nav className="align-items-md-center">
            <Nav.Link 
              as={NavLink} 
              to="/books"
              className="text-white px-3 py-2 py-md-1 mx-1 my-1 my-md-0 text-center rounded"
            >
              <span className="d-block d-md-inline me-md-2">📖</span>
              <span>Books</span>
            </Nav.Link>
            <Nav.Link 
              as={NavLink} 
              to="/subjects"
              className="text-white px-3 py-2 py-md-1 mx-1 my-1 my-md-0 text-center rounded"
            >
              <span className="d-block d-md-inline me-md-2">🏷️</span>
              <span>Subjects</span>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;