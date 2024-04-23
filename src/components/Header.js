import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import auth from '../pages/login/service'
import { useAuth } from '../pages/login/context'

const Header = () => {
  const { onLogout, isLogged, isSessionSaved } = useAuth()


  const handlerLogout = event => {
    event.preventDefault()
    onLogout()
    auth.logout()
  }


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
            {isLogged && isSessionSaved ? (
              <Button variant='secondary' size='sm' onClick={handlerLogout}>
                Log Out
              </Button>
            ) : (
              ''
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
