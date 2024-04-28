import P from 'prop-types'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Switch from '../components/form/Switch'
import MultiSelect from '../components/form/MuliSelect'
import FormRange from 'react-bootstrap/FormRange'
import { useState } from 'react'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
const Search = ({ onSearch, onSale }) => {
  const [sliderValue, setSliderValue] = useState([0, 1000])

  const handleSliderChange = value => {
    setSliderValue(value)
  }
  return (
    <>
      {/*  <input
        type='text'
        name='seacrh-name'
        value={valueName}
        onChange={onSearch}
      /> */}
      <Form>
        <Row>
          <Col>
            <Form.Label>Product Name</Form.Label>
            <Form.Control type='text' onChange={onSearch} />
          </Col>
          <Col>
            <Form.Label>Range</Form.Label>
            <FormRange id='price' value={sliderValue} onChange={onSearch} />
          </Col>
          <Col>
            <Slider
              range
              min={0}
              max={1000}
              value={sliderValue}
              onChange={handleSliderChange}
            />
          </Col>
          {/*   <Col>
            <MultiSelect></MultiSelect>
          </Col> */}
          <Col>
            <Form.Select id='sale' name='sale' onChange={onSale}>
              <option>Default select</option>
              <option value='0'>Compra</option>
              <option value='1'>Venta</option>
            </Form.Select>
          </Col>
        </Row>
      </Form>
    </>
  )
}
Search.propTypes = {
  onSearch: P.func.isRequired,
	onSale: P.func.isRequired,
  valueName: P.string,
}
export default Search
