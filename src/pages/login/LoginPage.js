import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import login from './service.js'
import { useState } from 'react'

const LoginPage = ({ onLogin }) => {

  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  })

  const handlerChange = (event) => {
     setFormValues(currentFormValues => ({
       ...currentFormValues,
       [event.target.name]: event.target.value,
     }))
  }
  const handleSubmit = async event => {
    event.preventDefault()
    console.log(event)

    const token = await login(formValues)
    console.log(token)
    onLogin()
  }

  const { email, password } = formValues
  return (
    <Container className='login-wrapper min-vh-100 d-flex justify-content-center'>
      <Row>
        <Form className='login-form align-self-center' onSubmit={handleSubmit}>
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
