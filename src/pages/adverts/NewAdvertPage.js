import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import Input from '../../components/form/Input.js'
import { useState } from 'react'
const NewAdvertPage = () => {
  const [multiOptions, setMultiOptions] = useState([])
	const [fileConvert, setFileConvert] = useState('')
	const [isSwitchChecked, setIsSwhichChecked] = useState(false)
	//const [swichLabel, setSwichLabel] = useState('Venta')
  
	const handleSubmit = event => {
    event.preventDefault()
    console.log(event)
		console.log('multioptions:', multiOptions);
		const newAdvert = {
      name: event.target.name.value,
      price: Number(event.target.price.value),
      sale: isSwitchChecked,
      tags: multiOptions,
      photo: fileConvert,
    }
		console.log(newAdvert);
  }

  const handleOptions = event => {
    console.log(event)
		console.log(event.target.selectedOptions)
		const options =  Array.from(event.target.selectedOptions).map((item)=> item.value)
    setMultiOptions(options)
  }

	const handlerFileConvert = (event) => {
		const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = e => {
        setFileConvert(e.target.result)
      }
      reader.readAsBinaryString(file)
    }
	}

	const handlerSwitch = (event) => {
		console.log(event);
		const isChecked = event.target.checked
		setIsSwhichChecked(isChecked)
		//setSwichLabel('Compra')
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
            required
          />
          <Input id='price' type='text' label='Pice' name='price' required />
          <Form.Group className='mb-3' controlId='price'>
            <Form.Label>Tags</Form.Label>
            <Form.Select
              aria-label='Default select example'
              id='multiple-select-tags'
              multiple
              defaultValue='lifestyle'
              onChange={handleOptions}
            >
              <option value='lifestyle'>Lifestyle Fake</option>
              <option value='mobile'>Mobile Fake</option>
              <option value='motor'>Motor fake</option>
              <option value='work'>Work fake</option>
            </Form.Select>
          </Form.Group>
          <Form.Group controlId='photo' className='mb-3'>
            <Form.Label>Default file input example</Form.Label>
            <Form.Control type='file' onChange={handlerFileConvert} />
          </Form.Group>
          <Form.Check // prettier-ignore
            type='switch'
            id='custom-switch'
            label={isSwitchChecked ? 'Venta' : 'Compra'}
            checked={isSwitchChecked}
            onChange={handlerSwitch}
          />
          <Button variant='primary' size='sm' type='submit'>
            Submit
          </Button>
        </Form>
      </Row>
    </Container>
  )
}

export default NewAdvertPage
