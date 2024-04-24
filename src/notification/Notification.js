import React from 'react'
import { useNotification } from './NotificationProvider' // Asegúrate de que la ruta de importación es correcta
import Alert from 'react-bootstrap/Alert'

const NotificationArea = () => {
  const { notification, closeNotification } = useNotification()

  if (!notification) return null

  return (
    <Alert
      variant={notification.type === 'error' ? 'danger' : 'primary'}
      onClose={closeNotification}
      dismissible
    >
      {notification.message}
    </Alert>
  )
}

export default NotificationArea
