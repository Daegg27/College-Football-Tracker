import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import axios from 'axios'


function NavBar(props) {

  const {user} = props

  function sendLogout(){
    axios.post('/logout/').then((response) => {
      console.log('response from server', response)
      window.location = '/#/signup'
      window.location.reload()
    })
  }


  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="#home">College Football</Navbar.Brand>
        {user && <h6>Welcome, {user.email}</h6>}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/#/signup">Sign in</Nav.Link>
            <button onClick={sendLogout}>Logout</button>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="/#/search_by_team">Search by Team</NavDropdown.Item>
              <NavDropdown.Item href="/#/saved_games">Saved Games</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/#/match_history">
                Match History
              </NavDropdown.Item>

            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;