import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import storage from './helper/storage'
import { setAuthorizationHeader } from './api/client'
import { AuthContextProvider } from './pages/login/context'
import { BrowserRouter } from 'react-router-dom'


const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
 /*  <React.StrictMode> */
    <BrowserRouter>
        <App />
    </BrowserRouter>
 /*  </React.StrictMode> */
)
