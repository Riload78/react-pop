import P from 'prop-types'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Badge from 'react-bootstrap/Badge'
import Stack from 'react-bootstrap/Stack'
import { Link } from 'react-router-dom'
import formatPrice from '../../helper/formatPrice.js'
import { propTypes } from 'react-bootstrap/esm/Image.js'

const Advert = ({ link, advert }) => {
  //console.log(advert);
  console.log(link)
  const { id, photo, name, price, sale, tags } = advert
  console.log(id)
  console.log(photo)
  return (
    <Col key={id}>
      <Card>
        {link ? (
          <Link to={`${id}`}>
            <Card.Img variant='top' src={photo} />
          </Link>
        ) : (
          <Card.Img variant='top' src={photo} />
        )}
        <Card.Body>
          {link ? (
            <Link to={`${id}`}>
              <Card.Title>{name}</Card.Title>
            </Link>
          ) : (
            <Card.Title>{name}</Card.Title>
          )}
          <Card.Text className='d-flex justify-content-between align-items-center'>
            {formatPrice(price)} <span>{sale ? 'Venta' : 'Compra'}</span>
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <Stack direction='horizontal' gap={2}>
            {tags.map(tag => (
              <Badge key={id} pill bg='primary'>
                {tag}
              </Badge>
            ))}
          </Stack>
        </Card.Footer>
      </Card>
    </Col>
  )
}

Advert.propTypes = {
  link: P.bool,
  advert: P.node,
}

export default Advert
