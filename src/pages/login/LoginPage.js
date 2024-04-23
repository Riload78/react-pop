import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import auth from './service.js'
import { useState } from 'react'
import { useAuth } from './context.js'

const LoginPage = () => {
  const { onLogin, isSessionSaved, changeSessionStatus } = useAuth() // Obtener funciones y estado del contexto

  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  })
  const [isSave, setIsSave] = useState(true)

  const handlerChange = event => {
    setFormValues(currentFormValues => ({
      ...currentFormValues,
      [event.target.name]: event.target.value,
    }))
  }

  const handlerSwitch = event => {
    const isSaved = event.target.checked
    setIsSave(isSaved)
    changeSessionStatus(isSaved) // Cambiar el estado de la sesión guardada
  }

  const handleSubmit = async event => {
    event.preventDefault()
    await auth.login(formValues, isSave)
    onLogin() // No es necesario pasar isSave ya que el contexto lo gestiona
  }

  const { email, password } = formValues
  return (
    <Container className='login-wrapper min-vh-100 d-flex justify-content-center'>
      <Row className='justify-content-center align-self-center g-4'>
        <Form className='login-form ' onSubmit={handleSubmit}>
          <h1>Login</h1>
          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type='email'
              name='email'
              value={email}
              placeholder='Enter email'
              onChange={handlerChange}
            />
            <Form.Text className='text-muted'>
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className='mb-3' controlId='formBasicPassword'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              name='password'
              value={password}
              placeholder='Password'
              onChange={handlerChange}
            />
          </Form.Group>
          <Button variant='primary' size='sm' type='submit'>
            Submit
          </Button>
        </Form>
        <Form className='login-form'>
          <Form.Check
            type='switch'
            id='custom-switch'
            label={!isSave ? "I wan't save the session" : 'Save the session'}
            checked={isSave}
            onChange={handlerSwitch}
          />
        </Form>
      </Row>
    </Container>
  )
}

export default LoginPage
