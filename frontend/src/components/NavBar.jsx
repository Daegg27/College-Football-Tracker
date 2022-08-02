import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import axios from 'axios'

function sendLogout(){
  axios.post('/logout/').then((response) => {
    console.log('response from server', response)
    window.location.reload()
  })
}



function NavBar() {
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="#home">College Football</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/#/signup">Sign in</Nav.Link>
            <button onClick={sendLogout}>Logout</button>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="/#/search_by_team">Search by Team</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;