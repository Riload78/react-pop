import Form from 'react-bootstrap/Form'
import P from 'prop-types'
const FileInput = ({ id, name, label, handlerFileConvert }) => {
  return (
    <Form.Group className='mb-3'>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        id={id}
        type='file'
        name={name}
        onChange={handlerFileConvert}
      />
    </Form.Group>
  )
}

FileInput.propTypes = {
  label: P.string.isRequired,
  handlerFileConvert: P.func.isRequired,
  id: P.string.isRequired,
  name: P.string.isRequired,
}

export default FileInput
