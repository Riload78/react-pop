import P from 'prop-types'
import { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert'

const Input = ({ id, type, label, name }) => {
  const [value, setValue] = useState('')
  const [isValid, setIsvalid] = useState(true)
  const handleInputChange = event => {
    const inputValue = event.target.value
    console.log(inputValue)
    if (inputValue.length <= 20) {
			setIsvalid(true)
      setValue(inputValue)
    } else {
      setIsvalid(false)
    }
  }
  return (
    <Form.Group className='mb-3'>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        id={id}
        type={type}
        name={name}
        value={value}
        onChange={handleInputChange}
      />
      {!isValid && (
        <Alert key='danger' variant='danger'>
          This is a alert—check it out!
        </Alert>
      )}
    </Form.Group>
  )
}

Input.propTypes = {
  id: P.string.isRequired,
  type: P.oneOf(['text', 'password']).isRequired,
  label: P.string.isRequired,
  name: P.string.isRequired
}

export default Input
