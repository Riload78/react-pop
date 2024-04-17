import getAdverts from './service.js'
import formatPrice from '../../helper/formatPrice.js'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Badge from 'react-bootstrap/Badge'
import Stack from 'react-bootstrap/Stack'


const AdvertsPage = session => {
  console.log('Adverts Page Loaded')

  const adverts = [
    {
      id: '26c747f1-4d6d-4805-a0f6-126d1e0da652',
      createdAt: '2024-04-17T07:33:17.000Z',
      name: 'Bicicleta de Carretera Talla M',
      sale: true,
      price: 1500,
      tags: ['lifestyle'],
      photo: 'http://localhost:3001/public/1713339197834-434660129.jpg',
    },
    {
      id: '26c747f1-4d6d-4805-a0f6-126d1e0da652',
      createdAt: '2024-04-17T07:33:17.000Z',
      name: 'Bicicleta de Carretera Talla M',
      sale: true,
      price: 1500,
      tags: ['lifestyle'],
      photo: 'http://localhost:3001/public/1713339197834-434660129.jpg',
    },
    {
      id: '26c747f1-4d6d-4805-a0f6-126d1e0da652',
      createdAt: '2024-04-17T07:33:17.000Z',
      name: 'Bicicleta de Carretera Talla M',
      sale: true,
      price: 1500,
      tags: ['lifestyle'],
      photo: 'http://localhost:3001/public/1713339197834-434660129.jpg',
    },
    {
      id: '26c747f1-4d6d-4805-a0f6-126d1e0da652',
      createdAt: '2024-04-17T07:33:17.000Z',
      name: 'Bicicleta de Carretera Talla M',
      sale: true,
      price: 1500,
      tags: ['lifestyle', 'motor'],
      photo: 'http://localhost:3001/public/1713339197834-434660129.jpg',
    },
  ]

  /*   const adverts = async session => {
    const data = await getAdverts(session)
    return data
  }

  adverts(session) */

  return (
    <Row xs={1} sm={2} md={3} lg={4} className='g-4'>
      {adverts.map(advert => (
        <Col key={advert.id}>
          <Card>
            <Card.Img variant='top' src={advert.photo} />
            <Card.Body>
              <Card.Title>{advert.name}</Card.Title>
              <Card.Text>
                {`${formatPrice(advert.price)} ${advert.sale ? 'Venta' : 'Compra'}`}
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <Stack direction='horizontal' gap={2}>
                {advert.tags.map(tag => (
                  <Badge pill bg='primary'>
                    {tag}
                  </Badge>
                ))}
              </Stack>
            </Card.Footer>
          </Card>
        </Col>
      ))}
    </Row>
  )
}

export default AdvertsPage
