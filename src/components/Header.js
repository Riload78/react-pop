import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import auth from '../pages/login/service'
import { ReactComponent as Icon } from '../assets/images/logo.svg'
import { Link, useNavigate } from 'react-router-dom'
import ModalConfirm from './ModalConfirm'
import { useSelector, useDispatch } from 'react-redux'
import Customer from '../pages/login/Customer'
import { authLogout } from '../store/actions'
import { getIsSaved, getIsLogin } from '../store/selectors'

const Header = () => {
  const dispatch = useDispatch()
  const isLogged = useSelector(getIsLogin)
  const isSessionSaved = useSelector(getIsSaved)
  const navigate = useNavigate()
  const handlerLogout = event => {
    event.preventDefault()
    dispatch(authLogout())
    auth.logout()
    navigate('/login')
  }

  return (
    <header>
      <Navbar bg='primary' expand='md'>
        <Container className='d-flex flex-nowrap justify-content-between align-items-center gap-4'>
          <Link to='/'>
            <Icon width='50' fill='#F2F2F2' />
          </Link>
          {isLogged && isSessionSaved ? (
            <Nav className='d-flex flex-row  flex-nowrap justify-content-end align-items-center gap-4'>
              <Customer />
              <ModalConfirm
                lanchTitle='Log Out'
                modalText='You are going to log out. Are you sure?'
                actionText='Confirm'
                action={handlerLogout}
              />
              <Button
                variant='secondary'
                size='sm'
                as={Link}
                to='/adverts/new'
                className={({ isActive }) => ({ isActive }) ? 'active' : ''}
              >
                New Advert
              </Button>
            </Nav>
          ) : (
            ''
          )}
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
