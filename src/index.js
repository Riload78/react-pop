import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'

import storage from './helper/storage.js'
import { Provider } from 'react-redux'
import configureStore from './store'
import { auth } from './store/reducers.js'
const token = storage.get('auth')
console.log(token)
console.log(!!token)
const store = configureStore({
  auth: !!token,
  session: true,
  adverts: []
})
window.store = store

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)
