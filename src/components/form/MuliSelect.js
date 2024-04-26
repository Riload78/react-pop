import Form from 'react-bootstrap/Form'
import { useEffect, useState } from 'react'
import dataAdvert from '../../pages/adverts/service'
import p from 'prop-types'
const MultiSelect = ({handleOptions}) => {
  const [tags, setTags] = useState([])
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const dataFetch = await dataAdvert.getTags()
        setTags(dataFetch)
      } catch (error) {
        console.log(error)
      }
    }
    fetchTags()
  }, [])


  return (
    <Form.Group className='mb-3' controlId='price'>
      <Form.Label>Tags</Form.Label>
      <Form.Select
        aria-label='Default select example'
        id='multiple-select-tags'
        multiple
        onChange={handleOptions}
      >
        {tags &&
          tags.map((tag, index) => (
            <option key={index} value={tag}>
              {tag}
            </option>
          ))}
      </Form.Select>
    </Form.Group>
  )
}

MultiSelect.propTypes = {
	handleOptions: p.func.isRequired
}


export default MultiSelect
