import React,{useState} from "react";
import { NavLink } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import {Image,Navbar,Nav,Container,NavDropdown} from 'react-bootstrap';
import user from "../assets/user.png"
import logo from "../assets/logo.png"

const Navigation = () => {
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => {
      setExpanded(!expanded);
  };
  
  const handleNavbarCollapse = () => {
    setExpanded(false);
    document.body.classList.remove('navbar-expanded');
};

const handleNavbarExpand = () => {
    document.body.classList.add('navbar-expanded');
};

  return(
    <>
      <Navbar expand="md" className="border-bottom border-1 border-dark" expanded={expanded} onToggle={handleToggle} onEntered={handleNavbarExpand} onExit={handleNavbarCollapse} >
        <Container className="pt-2">
          <Navbar.Brand href="/"><Image src={logo} fluid width={150} /></Navbar.Brand>
          <Navbar.Toggle aria-controls="mainNav" />
          <Navbar.Collapse id="mainNav" className="justify-content-end">
          <Nav className="align-items-center fw-bold">
            <Nav.Link className="mx-3"  onClick={handleNavbarCollapse} as={NavLink} to="/">Home</Nav.Link>  
            <Nav.Link className="d-md-none d-sm-flex"  onClick={handleNavbarCollapse} as={NavLink} to="/profile">Profile</Nav.Link>
            <Nav.Link className="mx-3"  onClick={handleNavbarCollapse} as={NavLink} to="about">About</Nav.Link> 
            <Nav.Link className="mx-3"  onClick={handleNavbarCollapse} as={NavLink} to="contact">Contact</Nav.Link>
            <Nav.Link className="d-md-none d-sm-flex"  onClick={handleNavbarCollapse} as={NavLink} to="/bookmarks">Bookmarks</Nav.Link>
            <Nav.Link className="d-md-none d-sm-flex "  onClick={handleNavbarCollapse} as={NavLink} to="/signup">Log out</Nav.Link>
          </Nav>
          </Navbar.Collapse>
          <Nav>
          <NavDropdown title={<Image src={user} fluid width={27} />} className="user-section d-none d-md-flex mx-3 px-5" id="user-section">
              <NavDropdown.Item as={NavLink} to="profile">Profile</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="publications">Your Publications</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="bookmarks">Bookmarks</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={NavLink} to="signup">Log out</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}
  
export default Navigation;

