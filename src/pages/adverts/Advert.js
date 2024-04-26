import P from 'prop-types'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Badge from 'react-bootstrap/Badge'
import Stack from 'react-bootstrap/Stack'
import { Link } from 'react-router-dom'
import formatPrice from '../../helper/formatPrice.js'

const Advert = ({idKey, link, ad }) => {

  const { id, photo, name, price, sale, tags } = ad

  return (
    <>
      <Col key={`${idKey}-${id}`}>
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
              {tags.map((tag, index) => (
                <Badge key={`${id}-${index}`} pill bg='primary'>
                  {tag}
                </Badge>
              ))}
            </Stack>
          </Card.Footer>
        </Card>
      </Col>
    </>
  )
}

Advert.propTypes = {
  idKey: P.string.isRequired,
  link: P.bool.isRequired,
  ad: P.object.isRequired,
}

export default Advert
