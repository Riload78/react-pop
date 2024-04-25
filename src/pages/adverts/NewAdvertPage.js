import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import Input from '../../components/form/Input.js'
import MultiSelect from '../../components/form/MuliSelect.js'
import FileInput from '../../components/form/FileInput.js'
import { useEffect, useState } from 'react'
import dataAdvert from './service'
import { useNotification } from '../../notification/NotificationProvider.js'

const NewAdvertPage = () => {
  const [multiOptions, setMultiOptions] = useState([])
  const [fileConvert, setFileConvert] = useState('')
  const [isSwitchChecked, setIsSwhichChecked] = useState(false)
  // const [tags, setTags] = useState([])
  //const [swichLabel, setSwichLabel] = useState('Venta')
  const { showNotificationSuccess, showNotificationError } = useNotification()


  const handleSubmit = event => {
    event.preventDefault()
    console.log(event)
    console.log('multioptions:', multiOptions)
    const newAdvert = {
      name: event.target.name.value,
      price: Number(event.target.price.value),
      sale: isSwitchChecked,
      tags: multiOptions,
      photo: fileConvert || null,
    }
    console.log(newAdvert)
    postData(newAdvert)
  }

  const postData = async data => {
    try {
      const response = await dataAdvert.postAdvert(data)
      console.log(response)
      showNotificationSuccess('The ad has been created successfully')
    } catch (error) {
      console.log(error)
      showNotificationError(error.message)
    }
  }

   const handleOptions = event => {
    console.log(event)
    console.log(event.target.selectedOptions)
    const options = Array.from(event.target.selectedOptions).map(
      item => item.value
    )
    setMultiOptions(options)
  }

  const handlerFileConvert = event => {
    console.log(event.target.files[0])
    const file = event.target.files[0]
    setFileConvert(file)
  }

  const handlerSwitch = event => {
    console.log(event)
    const isChecked = event.target.checked
    setIsSwhichChecked(isChecked)
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
            id="photo"
            name='photo'
            handlerFileConvert={handlerFileConvert}
          />
          <Form.Check
            type='switch'
            id='custom-switch'
            label={isSwitchChecked ? 'Venta' : 'Compra'}
            checked={isSwitchChecked}
            onChange={handlerSwitch}
          />
          <Button variant='primary' size='xl' type='submit'>
            Submit
          </Button>
        </Form>
      </Row>
    </Container>
  )
}

export default NewAdvertPage
