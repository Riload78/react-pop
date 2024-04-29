import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router-dom'
const NotResult = () => {
    const navigator = useNavigate()
  return (
    <Container className='login-wrapper d-flex justify-content-center w-100 pt-10'>
      <Row className=' d-flex justify-content-center align-self-center g-4 text-center'>
        <h4>Result not found</h4>
        <Button
          className='w-auto'
          variant='primary'
          size='xl'
          type='button'
          onClick={() => navigator('/')}
        >
          Reset
        </Button>
      </Row>
    </Container>
  )
}

export default NotResult
