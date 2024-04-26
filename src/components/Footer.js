import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Navbar from 'react-bootstrap/Navbar'
const Footer = () => {
  return (
    <footer>
      <Container bg='primary'>
        <Row className='d-flex justify-content-center text-primary'>
          <Navbar bg='primary' variant='primary' fixed='bottom'>
            <Container>
              <Navbar.Brand>Footer</Navbar.Brand>
            </Container>
          </Navbar>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
