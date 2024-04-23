import './App.scss'
import Header from './components/Header.js'
import Footer from './components/Footer.js'
import RootRouter from './routers/RootRouter.js'
import { NotificationProvider } from './notification/NotificationProvider'; // Importa tu NotificationProvider
import NotificationArea from './notification/Notification.js';


function App() {
  return (
    <>
      <div>
        <NotificationProvider>
          <Header />
          <NotificationArea />
          <RootRouter />
          <Footer />
        </NotificationProvider>
      </div>
    </>
  )
}

export default App
