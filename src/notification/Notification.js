import React from 'react'
import { useNotification } from './NotificationProvider' // Asegúrate de que la ruta de importación es correcta
import Alert from 'react-bootstrap/Alert'
import { Container } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { getIsNotification } from '../store/selectors'
import { hideNotification } from '../store/actions'

const NotificationArea = () => {
  const dispatch = useDispatch()
  // const { closeNotification } = useNotification()
  const notification = useSelector(getIsNotification)
  const closeNotification = () => {
    dispatch(hideNotification())
  }
  if (notification.type === null) return null

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
