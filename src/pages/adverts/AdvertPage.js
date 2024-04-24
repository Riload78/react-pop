import formatPrice from '../../helper/formatPrice.js'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Badge from 'react-bootstrap/Badge'
import Stack from 'react-bootstrap/Stack'
import Spinner from 'react-bootstrap/Spinner'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getAdvert } from './service.js'

const AdvertPage = () => {
  const [advert, setAdvert] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const {advertId} = useParams()

	console.log(getAdvert)
  useEffect(() => {
    const ads = async () => {
      try {
        setIsLoading(true)
        const advert = await getAdvert(advertId)
        setAdvert(advert)
        setIsLoading(false)
      } catch (error) {
        setIsLoading(false)
        throw new Error(error.message)
      }
    }

    ads()
  }, [getAdvert])

  return (
    <Container>
      {isLoading ? (
        <Row className=' min-vh-100 d-flex justify-content-center align-items-center'>
          <Spinner animation='border' variant='primary' size='3rem' />
        </Row>
      ) : (
        <Row xs={1} sm={2} md={3} lg={3} className='g-4'>
          <Col key={advert.id}>
            <Card>
              <Link to={`${advert.id}`}>
                <Card.Img variant='top' src={advert.photo} />
              </Link>
              <Card.Body>
                <Link to={`${advert.id}`}>
                  <Card.Title>{advert.name}</Card.Title>
                </Link>
                <Card.Text className='d-flex justify-content-between align-items-center'>
                  {formatPrice(advert.price)}{' '}
                  <span>{advert.sale ? 'Venta' : 'Compra'}</span>
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <Stack direction='horizontal' gap={2}>
                  {advert.tags.map(tag => (
                    <Badge key={advert.id} pill bg='primary'>
                      {tag}
                    </Badge>
                  ))}
                </Stack>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  )
}

export default AdvertPage
