import P from 'prop-types'
import { useState, useEffect, useRef } from 'react'
import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert'

const Input = ({ id, type, label, name, lenght, onValidityChange }) => {
  const [value, setValue] = useState('')
  const [isValid, setIsvalid] = useState(true)
  const [message, setMessage] = useState('')
  const [maxLenght, setMaxLenght] = useState(null)
  const prevIsValid = useRef(isValid)

  useEffect(() => {
    setMaxLenght(lenght || 20)
  }, [lenght])

  useEffect(() => {
    if (isValid !== prevIsValid.current) {
      onValidityChange(isValid)
      prevIsValid.current = isValid
    }
  }, [isValid, onValidityChange])

  const handleInputChange = event => {
    const inputValue = event.target.value
    if (inputValue.length <= maxLenght || inputValue === '') {
      setIsvalid(true)
      setValue(inputValue)
    } else {
      setIsvalid(false)
      setMessage(`Must be less than ${maxLenght} characters`)
    }

    if (name === 'price') {
      const priceRegex = /^\d+(\.\d{1,2})?$/

      if (
        (priceRegex.test(inputValue) || inputValue === '') &&
        (inputValue.length <= maxLenght || inputValue === '')
      ) {
        setIsvalid(true)
        setValue(inputValue)
      } else {
        setIsvalid(false)
        setMessage(
          `Invalid price format. Max lenght ${maxLenght}. Decimal point followed by up to two decimal places.`
        )
      }
    }
  }

  return (
    <Form.Group className='mb-3'>
      <Form.Label for={id}>{label}</Form.Label>
      <Form.Control
        id={id}
        type={type}
        name={name}
        value={value}
        onChange={handleInputChange}
        isInvalid={!isValid}
      />
      {!isValid && (
        <Alert key='danger' variant='danger'>
          {message}
        </Alert>
      )}
    </Form.Group>
  )
}

Input.propTypes = {
  id: P.string.isRequired,
  type: P.oneOf(['text', 'password']).isRequired,
  label: P.string.isRequired,
  name: P.string.isRequired,
  lenght: P.string,
  onValidityChange: P.func.isRequired,
}

export default Input
