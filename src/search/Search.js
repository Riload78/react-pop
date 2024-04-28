import P from 'prop-types'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import InputGroup from 'react-bootstrap/InputGroup'
import Switch from '../components/form/Switch'
import MultiSelect from '../components/form/MuliSelect'
import { useState } from 'react'
import MultiRangeSlider from 'multi-range-slider-react'


const Search = ({ onSearch, onSale, onPrice, maxPrice, minPrice, max }) => {


  return (
    <>
      <Form>
        <Row>
          <Col>
            <Form.Label>Product Name</Form.Label>
            <Form.Control type='text' onChange={onSearch} />
          </Col>
          <Col>
            <Form.Label>Status</Form.Label>
            <Form.Select id='sale' name='sale' onChange={onSale}>
              <option>Default select</option>
              <option value='0'>Compra</option>
              <option value='1'>Venta</option>
            </Form.Select>
          </Col>
          {/* <Col>
            <Form.Label>Range</Form.Label>
            <FormRange id='price' value={sliderValue} onChange={onPrice} />
          </Col> */}
          <Col>
            <Col xs={12} md={6}>
              <Form.Label>Price</Form.Label>
              <MultiRangeSlider
                min={0}
                max={max}
                step={5}
                minValue={minPrice}
                maxValue={maxPrice}
                onInput={onPrice}
              />
            </Col>
          </Col>
          {/*   <Col>
            <MultiSelect></MultiSelect>
          </Col> */}
        </Row>
      </Form>
    </>
  )
}
Search.propTypes = {
  onSearch: P.func.isRequired,
	onSale: P.func.isRequired,
	onPrice: P.func.isRequired,
	maxPrice: P.number.isRequired,
	minPrice: P.number.isRequired,
	max: P.number.isRequired,
  valueName: P.string,
}
export default Search
