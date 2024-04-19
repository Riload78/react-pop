import { useState } from 'react'
import './App.scss'
import Header from './components/Header.js'
import AdvertsPage from './pages/adverts/AdvertsPage.js'
import LoginPage from './pages/login/LoginPage.js'


function App( {isSession}) {
  const [isLogged, setIsLogged] = useState(isSession)

  const handlerLogin = () => setIsLogged(true)

  return (
    <>
      <Header />
      {isLogged ? (
        <AdvertsPage />
      ) : (
        <LoginPage onLogin={handlerLogin} />
      )}
    </>
  )
}

export default App
