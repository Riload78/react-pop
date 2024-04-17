import { useState } from 'react'
import './App.scss'
import Header from './components/Header.js'
import AdvertsPage from './pages/adverts/AdvertsPage.js'
import LoginPage from './pages/login/LoginPage.js'

function App() {
  const [isLogged, setIsLogged] = useState(false)
  const handlerLogin = () => setIsLogged(true)
  return (
    <>
      <Header />
      {isLogged ? <LoginPage onLogin={handlerLogin} /> : <AdvertsPage />}
    </>
  )
}

export default App
