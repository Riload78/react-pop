import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import storage from './helper/storage'
import { setAuthorizationHeader } from './api/client'
import { AuthContextProvider } from './pages/login/context'

const token = storage.get('auth')
if (token) {
  setAuthorizationHeader(token)
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <AuthContextProvider isSession={!!token}>
      <App />
    </AuthContextProvider>
  </React.StrictMode>
)
