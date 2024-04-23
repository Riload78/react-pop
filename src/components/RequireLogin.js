import { Navigate } from 'react-router-dom'
import { useAuth } from '../pages/login/context'

const RequiredLogin = ({ children }) => {
  const { isLogged } = useAuth()

  return isLogged ? children : <Navigate to='/login' />
}

export default RequiredLogin
