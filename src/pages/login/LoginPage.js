import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Spinner from 'react-bootstrap/Spinner'
import auth from './service.js'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { authLogin, authLoginPending, authLoginFulfilled, authLoginRejected  } from '../../store/actions.js'
import { getIsLoading, getIsSaved } from '../../store/selectors.js'
import { sessionSave } from '../../store/actions.js'
import { useNotification } from '../../notification/NotificationProvider.js'
const LoginPage = () => {
  const dispatch = useDispatch()

  const { showNotificationSuccess, showNotificationError } = useNotification()

  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  })
  //const [isSave, setIsSave] = useState(true)
  const isSessionSaved = useSelector(getIsSaved)
  const navigate = useNavigate()
  // const [isLoading, setIsLoading] = useState(false)
  const isLoading = useSelector(getIsLoading)
  console.log('isSaved del principio', isSessionSaved)
  const handlerChange = event => {
    setFormValues(currentFormValues => ({
      ...currentFormValues,
      [event.target.name]: event.target.value,
    }))
  }

  const handlerSwitch = event => {
    const isSaved = event.target.checked
    // setIsSave(isSaved)
    dispatch(sessionSave(isSaved))
    //changeSessionStatus(isSaved) // Cambiar el estado de la sesión guardada
  }

  const handleSubmit = async event => {
    event.preventDefault()
    // setIsLoading(true)
    try {
      dispatch(authLoginPending())
      await auth.login(formValues, isSessionSaved)
      // setIsLoading(false)
      // onLogin(isSave)
      dispatch(authLoginFulfilled({type: 'success', message: 'LOGIN SUCCESSFUL'}))
      // showNotificationSuccess('LOGIN SUCCESSFUL')
      navigate('/')
    } catch (error) {
      // setIsLoading(false)
      dispatch(authLoginRejected({type: 'error', message: error.message}))
      // showNotificationError(error.message)
    }
  }

  const { email, password } = formValues
  const buttonDisabled = !email || !password || isLoading
  return (
    <Container className='login-wrapper d-flex justify-content-center'>
      <Row className='justify-content-center align-self-center g-4'>
        <Form className='login-form ' onSubmit={handleSubmit}>
          <h1>Login</h1>
          <Form.Group className='mb-3'>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type='email'
              name='email'
              value={email}
              onChange={handlerChange}
            />
            <Form.Text className='text-muted'>
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              name='password'
              value={password}
              onChange={handlerChange}
              autoComplete='password'
            />
          </Form.Group>
          <Button
            variant='primary'
            size='sm'
            type='submit'
            disabled={buttonDisabled}
          >
            {isLoading ? (
              <>
                <Spinner
                  as='span'
                  animation='border'
                  size='sm'
                  role='status'
                  aria-hidden='true'
                />
                <span>Loading...</span>
              </>
            ) : (
              'Submit'
            )}
          </Button>
        </Form>
        <Form className='login-form'>
          <Form.Check
            type='switch'
            id='custom-switch'
            label={
              !isSessionSaved ? "I wan't save the session" : 'Save the session'
            }
            checked={isSessionSaved}
            onChange={handlerSwitch}
          />
        </Form>
      </Row>
    </Container>
  )
}

export default LoginPage
