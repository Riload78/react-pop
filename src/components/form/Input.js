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

export default Input
