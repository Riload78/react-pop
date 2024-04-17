import { useState } from 'react'
import './App.scss'
import Header from './components/Header.js'
import AdvertsPage from './pages/adverts/AdvertsPage.js'
import LoginPage from './pages/login/LoginPage.js'

function App() {
  const [isLogged, setIsLogged] = useState(false)
  const [session, setSession] = useState('')
  const handlerLogin = () => setIsLogged(true)

  const handlerToken = (token) => {
    localStorage.setItem('auth-token', token)
    return setSession(token)
  }

  return (
    <>
      <Header />
      {isLogged ? (
        <AdvertsPage session={session} />
      ) : (
        <LoginPage onLogin={handlerLogin} onToken={handlerToken} />
      )}
    </>
  )
}

export default App
