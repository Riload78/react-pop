import Form from 'react-bootstrap/Form'
import { useEffect} from 'react'
import p from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { getTags } from '../../store/selectors'
import { tagsLoad } from '../../store/actions'
const MultiSelect = ({handleOptions}) => {
  const dispatch = useDispatch()
  const tags = useSelector(getTags)
  useEffect(() => {
    dispatch(tagsLoad())
  }, [dispatch])

  return (
    <Form.Group className='mb-3'>
      <Form.Label htmlFor='multiple-select-tags'>Tags</Form.Label>
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
