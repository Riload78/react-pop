import { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

export const AuthContextProvider = ({ isSession, children }) => {
  const [isLogged, setIsLogged] = useState(isSession)

  const handleLogin = () => setIsLogged(true)
  const handleLogout = () => setIsLogged(false)

  const authValue = {
    isLogged,
    onLogin: handleLogin,
    onLogout: handleLogout,
  }
  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  )
}

export const useAuth = () => {
  const auth = useContext(AuthContext)
  return auth
}
