import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import Input from '../../components/form/Input.js'
import MultiSelect from '../../components/form/MuliSelect.js'
import FileInput from '../../components/form/FileInput.js'
import Switch from '../../components/form/Switch.js'
import { useState } from 'react'
import dataAdvert from './service'
import { useNotification } from '../../notification/NotificationProvider.js'
import { useNavigate } from 'react-router-dom'
const NewAdvertPage = () => {
  const [multiOptions, setMultiOptions] = useState([])
  const [fileConvert, setFileConvert] = useState('')
  const [isSwitchChecked, setIsSwhichChecked] = useState(false)
  const { showNotificationSuccess, showNotificationError } = useNotification()

  const navigate = useNavigate()

  const handleSubmit = event => {
    event.preventDefault()
    console.log('multioptions:', multiOptions)
    const newAdvert = {
      name: event.target.name.value,
      price: Number(event.target.price.value),
      sale: isSwitchChecked,
      tags: multiOptions,
      photo: fileConvert || null,
    }
    postData(newAdvert)
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

  const postData = async data => {
    try {
      const response = await dataAdvert.postAdvert(data)
      navigate(`/adverts/${response.id}`)
      showNotificationSuccess('The ad has been created successfully')
    } catch (error) {
      console.log(error)
      showNotificationError(error.message)
    }
  }

  return (
    <Container>
      <Row>
        <Form onSubmit={handleSubmit}>
          <h1>New Advert</h1>
          <Input
            id='name'
            type='text'
            label='Product Name'
            name='name'
            lenght='30'
          />
          <Input id='price' type='text' label='Price' name='price' lenght='8' />
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
          >
            Submit
          </Button>
        </Form>
      </Row>
    </Container>
  )
}

export default NewAdvertPage
