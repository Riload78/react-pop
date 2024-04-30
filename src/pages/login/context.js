import P from 'prop-types'
import { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

export const AuthContextProvider = ({ isSession, children }) => {
  const [isLogged, setIsLogged] = useState(isSession)
  const [isSessionSaved, setIsSessionSaved] = useState(true)

  const handleLogin = saveSession => {
    setIsLogged(true)
    setIsSessionSaved(saveSession)
  }

  const handleLogout = () => setIsLogged(false)

  const login = saveSession => handleLogin(saveSession)

  const authValue = {
    isLogged,
    isSessionSaved,
    onLogin: login,
    onLogout: handleLogout,
    changeSessionStatus: setIsSessionSaved,
  }

  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  )
}

AuthContextProvider.propTypes = {
  isSession: P.bool,
  children: P.node.isRequired,
}

export const useAuth = () => {
  const auth = useContext(AuthContext)
  return auth
}
