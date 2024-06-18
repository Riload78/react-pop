import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import Input from '../../components/form/Input.js'
import MultiSelect from '../../components/form/MuliSelect.js'
import FileInput from '../../components/form/FileInput.js'
import Switch from '../../components/form/Switch.js'
import validation from '../../helper/validation.js'
import { useState } from 'react'
import { useNotification } from '../../notification/NotificationProvider.js'
import { useSelector, useDispatch } from 'react-redux'
import { createAdvert } from '../../store/actions.js'
import { getTags } from '../../store/selectors.js'
const NewAdvertPage = () => {
  const dispatch = useDispatch()
  //const multiOptions = useSelector(getTags)
  const [multiOptions, setMultiOptions] = useState([])
  const [fileConvert, setFileConvert] = useState('')
  const [isSwitchChecked, setIsSwhichChecked] = useState(false)
  const { showNotificationSuccess, showNotificationError } = useNotification()
  const [isValid, setIsValid] = useState({
    name: true,
    price: true,
  })


  const handleSubmit = async event => {
    event.preventDefault()
    const newAdvert = {
      name: event.target.name.value,
      price: Number(event.target.price.value),
      sale: isSwitchChecked,
      tags: multiOptions,
      photo: fileConvert || null,
    }

    const validateResult = validation(newAdvert)
    if (validateResult.length === 0) {
       await dispatch(createAdvert(newAdvert))
      
    } else {
      const errorMessage = validateResult.join(' || ')
      showNotificationError(errorMessage)
    }
  }

  const handleValidityChange = field => isValid => {
    setIsValid(current => ({ ...current, [field]: isValid }))
  }

  const handleOptions = event => {
    const options = Array.from(event.target.selectedOptions).map(
      item => item.value
    )
    setMultiOptions(options)
  }

  const handleFileConvert = event => {
    const file = event.target.files[0]
    setFileConvert(file)
  }

  const handleSwitch = event => {
    const isChecked = event.target.checked
    setIsSwhichChecked(isChecked)
  }


  const allValid = Object.values(isValid).every(Boolean) // Verifica que todos los campos sean válidos

  return (
    <Container className='new-advert-wrapper'>
      <Row>
        <Form onSubmit={handleSubmit}>
          <h1 className='d-flex justify-content-center'>New Advert</h1>
          <Input
            id='name'
            type='text'
            label='Product Name'
            name='name'
            lenght='30'
            onValidityChange={handleValidityChange('name')}
          />
          <Input
            id='price'
            type='text'
            label='Price'
            name='price'
            lenght='8'
            onValidityChange={handleValidityChange('price')}
          />
          <MultiSelect handleOptions={handleOptions}></MultiSelect>
          <FileInput
            label='Upload Image'
            id='photo'
            name='photo'
            handlerFileConvert={handleFileConvert}
          />
          <Switch
            id='custom-swich'
            isSwitchChecked={isSwitchChecked}
            handleSwitch={handleSwitch}
          />
          <Button
            variant='primary'
            size='xl'
            type='submit'
            disabled={!allValid}
          >
            Submit
          </Button>
        </Form>
      </Row>
    </Container>
  )
}

export default NewAdvertPage
