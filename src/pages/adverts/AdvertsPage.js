import getAdverts from './service.js'
import NewAdvertPage from './NewAdvertPage.js'
import formatPrice from '../../helper/formatPrice.js'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Badge from 'react-bootstrap/Badge'
import Stack from 'react-bootstrap/Stack'
import { useEffect, useState } from 'react'


const AdvertsPage = () => {

  const [adverts, setAdverts] = useState([])

  useEffect(() => {
    getAdverts().then(adverts => setAdverts(adverts))
  }, [])

  return (
    <Container>
      <Row xs={1} sm={2} md={3} lg={3} className='g-4'>
        {adverts.map(advert => (
          <Col key={advert.id}>
            <Card>
              <Card.Img variant='top' src={advert.photo} />
              <Card.Body>
                <Card.Title>{advert.name}</Card.Title>
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
        ))}
      </Row>
    </Container>
  )
}

export default AdvertsPage
