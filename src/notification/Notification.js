import React from 'react'
import { useNotification } from './NotificationProvider' // Asegúrate de que la ruta de importación es correcta
import Alert from 'react-bootstrap/Alert'
import { Container } from 'react-bootstrap'

const NotificationArea = () => {
  const { notification, closeNotification } = useNotification()

  if (!notification) return null

  return (
    <Container className='alert-wrapper mt-4'>
      <Alert
        variant={notification.type === 'error' ? 'danger' : 'primary'}
        onClose={closeNotification}
        dismissible
      >
        {notification.message}
      </Alert>
    </Container>
  )
}

export default NotificationArea
