import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
const Footer = () => {
  return (
    <Container bg='primary'>
      <Row className='d-flex justify-content-center text-white'>
        <Col>
          <h3>About</h3>
          <p>
            This is a simple web application created using React.js and Node.js.
          </p>
        </Col>
      </Row>
    </Container>
  )
}

export default Footer
