import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Spinner from 'react-bootstrap/Spinner'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { authLogin, sessionSave } from '../../store/actions.js'
import { getIsLoading, getIsSaved } from '../../store/selectors.js'
const LoginPage = () => {
  const dispatch = useDispatch()


  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  })

  const isSessionSaved = useSelector(getIsSaved)
  const isLoading = useSelector(getIsLoading)

  const handlerChange = event => {
    setFormValues(currentFormValues => ({
      ...currentFormValues,
      [event.target.name]: event.target.value,
    }))
  }

  const handlerSwitch = event => {
    const isSaved = event.target.checked
    dispatch(sessionSave(isSaved))
  }

  const handleSubmit = async event => {
    event.preventDefault()
    dispatch(authLogin(formValues, isSessionSaved))
  }

  const { email, password } = formValues
  const buttonDisabled = !email || !password || isLoading
  return (
    <Container className='login-wrapper d-flex justify-content-center'>
      <Row className='justify-content-center align-self-center g-4'>
        <Form className='login-form ' onSubmit={handleSubmit}>
          <h1>Login</h1>
          <Form.Group className='mb-3'>
            <Form.Label htmlFor='email'>Email address</Form.Label>
            <Form.Control
              type='email'
              name='email'
              id='email'
              value={email}
              onChange={handlerChange}
            />
            <Form.Text className='text-muted'>
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label htmlFor='password'>Password</Form.Label>
            <Form.Control
              type='password'
              name='password'
              id='password'
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
