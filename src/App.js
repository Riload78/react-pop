import { useState } from 'react'
import './App.scss'
import Header from './components/Header.js'
import AdvertsPage from './pages/adverts/AdvertsPage.js'
import LoginPage from './pages/login/LoginPage.js'
import Footer from './components/Footer.js'
import { useAuth } from './pages/login/context.js'

function App({ isSession }) {
  const { handlerLogout, isLogged, handlerLogin } = useAuth()
  const [isSessionSaved, setIsSessionSaved] = useState(true)
  const checkIsSessionSaved = () => isSessionSaved
  const changeSessionStatus = status => setIsSessionSaved(status)

  return (
    <>
      <Header
        onLogout={handlerLogout}
        isLogged={isLogged}
        isSessionSave={checkIsSessionSaved}
      />
      {isLogged ? (
        <AdvertsPage />
      ) : (
        <LoginPage onLogin={handlerLogin} isSessionSave={changeSessionStatus} />
      )}
      <Footer />
    </>
  )
}

export default App
