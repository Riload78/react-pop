import P from  'prop-types';
import Card from 'react-bootstrap/Card'
import defaultImage from '../assets/images/no-image.jpg'
import { propTypes } from 'react-bootstrap/esm/Image';
const ImagePlaceholder = ({photo}) => {
	console.log(defaultImage);
  return (
    <Card.Img variant='top' src={photo || defaultImage} alt='Product Picture' />
  )
}
ImagePlaceholder.propTypes = {
  photo: P.node.isRequired
}
export default ImagePlaceholder
