import './App.scss'
import Header from './components/Header.js'
import Footer from './components/Footer.js'
import RootRouter from './routers/RootRouter.js'
import { NotificationProvider } from './notification/NotificationProvider' // Importa tu NotificationProvider
import NotificationArea from './notification/Notification.js'
import { setAuthorizationHeader } from './api/client.js'
import storage from './helper/storage.js'
import BreadCrumb from './breadcrumb/BreadCrumb.js'
import ErrorBoundary from './components/ErrorBoundary.js'

const token = storage.get('auth')

if (token) {
  setAuthorizationHeader(token)
}

function App() {
  return (
    <>
      <ErrorBoundary>
        <NotificationProvider>
          <Header />
          <NotificationArea />
          <BreadCrumb />
          <RootRouter />
          <Footer />
        </NotificationProvider>
      </ErrorBoundary>
    </>
  )
}

export default App
