import { Navigate } from 'react-router-dom'
import { useAuth } from '../pages/login/context'

const RequiredLogin = ({ children }) => {
  const { onLogin } = useAuth()

  return onLogin() ? children : <Navigate to='/login' />
}

export default RequiredLogin
