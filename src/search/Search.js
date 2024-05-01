import P from 'prop-types'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import MultiSelect from '../components/form/MuliSelect'
import MultiRangeSlider from 'multi-range-slider-react'

const Search = ({
  onSearch,
  onSale,
  onPrice,
  maxPrice,
  minPrice,
  max,
  OnOptionsChange,
}) => {
  return (
    <>
      <Container className='search-wrapper'>
        <Form>
          <Row className='d-flex flex-wrap justify-content-between align-items-center'>
            <Col xs={12} md={6}>
              <Form.Label>Product Name</Form.Label>
              <Form.Control type='text' onChange={onSearch} />
            </Col>
            <Col xs={12} md={6}>
              <Form.Label>Status</Form.Label>
              <Form.Select id='sale' name='sale' onChange={onSale}>
                <option>Default select</option>
                <option value='0'>Compra</option>
                <option value='1'>Venta</option>
              </Form.Select>
            </Col>
            <Col xs={12} md={6}>
              <Form.Label>Price</Form.Label>
              <MultiRangeSlider
                min={0}
                max={max}
                step={50}
                minValue={minPrice}
                maxValue={maxPrice}
                onInput={onPrice}
              />
            </Col>
            <Col>
              <MultiSelect handleOptions={OnOptionsChange}></MultiSelect>
              <small className='fs-6'>Ctrl + click to multiselect</small>
            </Col>
          </Row>
        </Form>
      </Container>
    </>
  )
}
Search.propTypes = {
  onSearch: P.func.isRequired,
  onSale: P.func.isRequired,
  onPrice: P.func.isRequired,
  maxPrice: P.number.isRequired,
  minPrice: P.number.isRequired,
  max: P.number,
  valueName: P.string,
  OnOptionsChange: P.func.isRequired,
}
export default Search
