import P from 'prop-types'
import { createContext, useContext, useState } from 'react'

const NotificationContext = createContext({
  notification: null,
  showNotificationSuccess: () => {},
  showNotificationError: () => {},
  closeNotification: () => {}, // Proporcionar un método para cerrar la notificación
})

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState(null)

  const showNotificationSuccess = message => {
    setNotification({ type: 'success', message })
  }

  const showNotificationError = message => {
    setNotification({ type: 'error', message })
  }

  const closeNotification = () => {
    setNotification(null) // Función para cerrar la notificación
  }

  return (
    <NotificationContext.Provider
      value={{
        notification,
        showNotificationSuccess,
        showNotificationError,
        closeNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  )
}

NotificationProvider.propTypes = {
  children: P.node.isRequired,
}

export const useNotification = () => useContext(NotificationContext)
