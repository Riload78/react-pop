import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import storage from './helper/storage.js'
import configureStore from './store'

const token = storage.get('auth')

const router = createBrowserRouter([{
  path: '*',
  element: <App />
}])
const store = configureStore({
  auth: !!token,
  adverts: [],
}, {router})

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
)
