import P from 'prop-types'
import Card from 'react-bootstrap/Card'
import defaultImage from '../assets/images/no-image.jpg'

const ImagePlaceholder = ({ photo }) => {
  return (
    <Card.Img variant='top' src={photo || defaultImage} alt='Product Picture' />
  )
}

ImagePlaceholder.propTypes = {
  photo: P.node,
}

export default ImagePlaceholder
