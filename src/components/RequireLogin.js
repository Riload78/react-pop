import { Navigate } from 'react-router-dom'
import { useAuth } from '../pages/login/context'
import P from 'prop-types'

const RequiredLogin = ({ children }) => {
  const { isLogged } = useAuth()

  return isLogged ? children : <Navigate to='/login' />
}

RequiredLogin.propTypes = {
	children: P.node.isRequired
}

export default RequiredLogin
