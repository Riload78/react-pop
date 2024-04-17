import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import login from './service.js'

const LoginPage = ({ onLogin} ) => {

  const handleSubmit = async event => {
    event.preventDefault()
    console.log(event)
    const credentials = {
      email: event.target.email.value,
      password: event.target.password.value,
    }

    const token = await login(credentials)
    console.log(token)
    token && onLogin()
  }
  return (
    <Container className='login-wrapper min-vh-100 d-flex justify-content-center'>
      <Row>
        <Form className='login-form align-self-center' onSubmit={handleSubmit}>
          <h1>Login</h1>
          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Label>Email address</Form.Label>
            <Form.Control type='email' name='email' placeholder='Enter email' />
            <Form.Text className='text-muted'>
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className='mb-3' controlId='formBasicPassword'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              name='password'
              placeholder='Password'
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formBasicCheckbox'>
            <Form.Check type='checkbox' label='Check me out' />
          </Form.Group>
          <Button variant='primary' size='sm' type='submit'>
            Submit
          </Button>
        </Form>
      </Row>
    </Container>
  )
}

export default LoginPage
