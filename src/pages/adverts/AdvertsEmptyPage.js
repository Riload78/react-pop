import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router-dom'

const AdvertsEmptyPage = () => {
  const navigator = useNavigate()
  return (
    <Container className='login-wrapper d-flex justify-content-center align-items-center w-100'>
      <Row className=' d-flex justify-content-center align-self-center g-4 text-center'>
        <h4>There are no publications yet</h4>
        <h3>Do you want to create a new post?</h3>
        <Button
          className='w-auto'
          variant='primary'
          size='xl'
          type='button'
          onClick={() => navigator('new')}
        >
          Create
        </Button>
      </Row>
    </Container>
  )
}

export default AdvertsEmptyPage
