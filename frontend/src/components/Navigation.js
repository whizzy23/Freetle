import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Image,Navbar,Nav,Container,NavDropdown } from 'react-bootstrap';
import { useAuthContext } from '../hooks/useAuthContext'
import { useLogout } from "../hooks/useLogout";
import userIcon from "../assets/userIcon.png"
import logo from "../assets/logo.png"

const Navigation = () => {
  const { user } = useAuthContext();
  const { logout } = useLogout()
  
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => {
      setExpanded(!expanded);
  };
  
  const handleNavbarCollapse = () => {
    setExpanded(false);
    document.body.classList.remove('navbar-expanded');
  };

  const handleLogout = () => {
    setExpanded(false);
    logout()
  }

  return(
    <>
      <Navbar expand="md" className="border-bottom border-1 border-dark" expanded={expanded} onToggle={handleToggle}  >
        <Container className="pt-2">
          <Navbar.Brand as={NavLink} to="/" ><Image src={logo} fluid width={150} /></Navbar.Brand>
          <Navbar.Toggle aria-controls="mainNav" />
          <Navbar.Collapse id="mainNav" className="justify-content-end">
          { user ? (
            <Nav className="align-items-center fw-bold">
            <Nav.Link className="mx-3"  onClick={handleNavbarCollapse} as={NavLink} to="/" >Home</Nav.Link>  
            <Nav.Link className="d-md-none d-sm-flex"  onClick={handleNavbarCollapse} as={NavLink} to="/profile">Profile</Nav.Link>
            <Nav.Link className="d-md-none d-sm-flex"  onClick={handleNavbarCollapse} as={NavLink} to="/publications">Your Publications</Nav.Link>
            <Nav.Link className="d-md-none d-sm-flex"  onClick={handleNavbarCollapse} as={NavLink} to="/bookmarks">Bookmarks</Nav.Link>
            <Nav.Link className="mx-3"  onClick={handleNavbarCollapse} as={NavLink} to="contact">Contact</Nav.Link>
            <Nav.Link className="mx-3"  onClick={handleNavbarCollapse} as={NavLink} to="about">About</Nav.Link> 
            <Nav.Link className="d-md-none d-sm-flex"  onClick={handleLogout} as={NavLink} to="/signup">Log out</Nav.Link>
            <NavDropdown title={<Image src={userIcon} fluid width={27} />} className="user-section d-none d-md-flex px-5" id="user-section">
              <NavDropdown.Item as={NavLink} to="profile">Profile</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="publications">Your Publications</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="bookmarks">Bookmarks</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={NavLink} to="signup" onClick={handleLogout}>Log out</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          ) : null
          }
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
  
export default Navigation;

