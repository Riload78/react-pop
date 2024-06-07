import { Navigate } from 'react-router-dom'
import { useAuth } from '../pages/login/context'
import P from 'prop-types'
import { useSelector } from 'react-redux'
import  { getIsLogin } from '../store/selectors'

const RequiredLogin = ({ children }) => {
  //const { isLogged } = useAuth()
  const isLogged = useSelector(getIsLogin)
  console.log(isLogged);
 
  return isLogged ? children : <Navigate to='/login' />
}

RequiredLogin.propTypes = {
	children: P.node.isRequired
}

export default RequiredLogin
