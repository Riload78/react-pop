import P from 'prop-types'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router-dom'
const NotResult = () => {
  const navigate = useNavigate()
  const handleReset = () => {
    navigate('/')
  }

  return (
    <Container className='login-wrapper d-flex justify-content-center w-100 pt-10'>
      <Row className=' d-flex justify-content-center align-self-center g-4 text-center'>
        <h4>Result not found</h4>
        <p>
          You can modify the filters for other searches or click RESET to get
          started
        </p>
        <Button
          className='w-auto'
          variant='primary'
          size='xl'
          type='button'
          onClick={handleReset}
        >
          Reset
        </Button>
      </Row>
    </Container>
  )
}

NotResult.propTypes = {
  onReset: P.func.isRequired,
}

export default NotResult
