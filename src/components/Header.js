import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'

const Header = () => {
    return (
      <Navbar bg='primary' expand='md'>
        <Container>
          <Navbar.Brand href='#home'>React-POP</Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='me-auto'>
              <Nav.Link href='#home'>Home</Nav.Link>
              <Nav.Link href='#link'>Link</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link href='#deets'>More deets</Nav.Link>
              <Nav.Link eventKey={2} href='#memes'>
                Dank memes
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
}

export default Header
