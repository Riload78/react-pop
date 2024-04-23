import './App.scss'
import Header from './components/Header.js'
import Footer from './components/Footer.js'
import RootRouter from './routers/RootRouter.js'

function App() {
  return (
    <>
      <Header />
      <RootRouter />
      <Footer />
    </>
  )
}

export default App
