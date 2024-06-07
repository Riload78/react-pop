import './App.scss'
import Header from './components/Header.js'
import Footer from './components/Footer.js'
import RootRouter from './routers/RootRouter.js'
import { NotificationProvider } from './notification/NotificationProvider' // Importa tu NotificationProvider
import NotificationArea from './notification/Notification.js'
import { AuthContextProvider } from './pages/login/context.js'
import { setAuthorizationHeader } from './api/client.js'
import storage from './helper/storage.js'
import BreadCrumb from './breadcrumb/BreadCrumb.js'
import ErrorBoundary from './components/ErrorBoundary.js'
import { Provider } from 'react-redux'
import configureStore from './store'
import { session } from './store/reducers.js'

const token = storage.get('auth')

if (token) {
  setAuthorizationHeader(token)
}


function App() {
  return (
    <>
      <ErrorBoundary>
          <NotificationProvider>
            <AuthContextProvider isSession={!!token}>
              <Header />
              <NotificationArea />
              <BreadCrumb />
              <RootRouter />
              <Footer />
            </AuthContextProvider>
          </NotificationProvider>
      </ErrorBoundary>
    </>
  )
}

export default App
