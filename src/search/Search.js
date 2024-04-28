import P from 'prop-types'
const Search = ({ value, onSearch }) => {
  return (
    <>
      <input type='text' name='seacrh-name' value={value} onChange={onSearch} />
    </>
  )
}
Search.propTypes = {
    onSearch: P.func.isRequired,
		value: P.string
}
export default Search