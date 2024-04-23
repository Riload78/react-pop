import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import auth from '../pages/login/service'
import { useAuth } from '../pages/login/context'
import { ReactComponent as Icon } from '../assets/images/logo.svg'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { ReactComponent as UserIcon } from '../assets/images/user.svg'


const Header = () => {
  const { onLogout, isLogged, isSessionSaved } = useAuth()
  const navigate = useNavigate();
  const handlerLogout = event => {
    event.preventDefault()
    onLogout()
    auth.logout()
    navigate('/login')

  }

  return (
    <Navbar bg='primary' expand='md'>
      <Container>
        <Link to='/'>
          <Icon width='50' fill='#F2F2F2' />
        </Link>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        {isLogged && isSessionSaved ? (
          <Nav className='d-flex justify-content-end align-items-center'>
            <NavLink
              to='/adverts/new'
              className={({ isActive }) => ({ isActive }) ? 'active' : ''}
            >
              Create Advert
            </NavLink>
            <Nav.Link
              eventKey={2}
              href='#memes'
              className='d-flex  align-items-center gap-2'
            >
              <UserIcon width='30' height='30' fill='#F2F2F2' />
              Dank memes
            </Nav.Link>

            <Button variant='secondary' size='sm' onClick={handlerLogout}>
              Log Out
            </Button>
          </Nav>
        ) : (
          ''
        )}
      </Container>
    </Navbar>
  )
}

export default Header
