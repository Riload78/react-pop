import P from 'prop-types'
import { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

export const AuthContextProvider = ({ isSession, children }) => {
  const [isLogged, setIsLogged] = useState(isSession)
  const [isSessionSaved, setIsSessionSaved] = useState(true) // Nuevo estado

  const handleLogin = saveSession => {
    setIsLogged(true)
    setIsSessionSaved(saveSession) // Controlar si se guarda la sesión o no
  }

  const handleLogout = () => setIsLogged(false)

  const login = saveSession => handleLogin(saveSession) // Nueva función de login

  const authValue = {
    isLogged,
    isSessionSaved, // Agregar isSessionSaved al valor del contexto
    onLogin: login, // Utilizar la nueva función login
    onLogout: handleLogout,
    changeSessionStatus: setIsSessionSaved, // Permitir cambiar isSessionSaved
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
