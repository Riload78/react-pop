import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Spinner from 'react-bootstrap/Spinner'
import { useEffect, useState } from 'react'
import Advert from './Advert.js'
import AdvertsEmptyPage from './AdvertsEmptyPage.js'
import Search from '../../search/Search.js'
import NotResult from '../../search/NotResult.js'
import { getAdverts, getIsLoading, getMaxPrice} from '../../store/selectors.js'
import { advertsLoad } from '../../store/actions.js'
import { useDispatch, useSelector } from 'react-redux'

const AdvertsPage = () => {
  const dispatch = useDispatch()
  const advertsLoaded = useSelector(getAdverts)
  const adverts = advertsLoaded.data || []
  const isLoading = useSelector(getIsLoading)
  const [filterName, setFilterName] = useState('')
  const [filterSale, setFilterSale] = useState(null)
  const [minValue, setMinValue] = useState(0)
  const [maxValue, setMaxValue] = useState(1000)
  const [max, setMax] = useState()
  const [tags, setTags] = useState([])
  let maxPrice = useSelector(getMaxPrice)
  
  useEffect(() => {
    dispatch(advertsLoad())
    
    setMax(maxPrice)
    setMaxValue(maxPrice)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, maxPrice])

  const handleSearch = event => {
    const search = event.target.value
    setFilterName(search)
  }

  const handleSale = event => {
    const value = event.target.value
    let saleValue = value === '1' ? true : value === '0' ? false : null
    setFilterSale(saleValue)
  }

  const handlePrice = event => {
   
    setMinValue(event.minValue)
    setMaxValue(event.maxValue)
  }

  const handleOptions = event => {
    const options = Array.from(event.target.selectedOptions).map(
      item => item.value
    )
    setTags(options)
  }

  let filteredAdverts = Array.isArray(adverts)
    ? adverts.filter(item => {
        const nameMatch = item.name
          .toLowerCase()
          .startsWith(filterName.toLowerCase())
        let saleMatch = true
        if (filterSale !== null) {
          saleMatch = item.sale === filterSale
        }
        const priceMatch = item.price >= minValue && item.price <= maxValue
        const tagsMatch = tags.every(tag => item.tags.indexOf(tag) !== -1)

        return nameMatch && saleMatch && priceMatch && tagsMatch
      })
    : []

  return (
    <Container>
      {isLoading ? (
        <Row className=' min-vh-100 d-flex justify-content-center align-items-center'>
          <Spinner animation='border' variant='primary' size='3rem' />
        </Row>
      ) : (
        <>
          {adverts.length !== 0 ? ( // Verifica si hay elementos en adverts
            <>
              <Search
                onSearch={handleSearch}
                onSale={handleSale}
                onPrice={handlePrice}
                maxPrice={maxValue}
                minPrice={minValue}
                max={max}
                OnOptionsChange={handleOptions}
              />
              <Row xs={1} sm={2} md={3} lg={3} role='list' className='list-wrapper g-4'>
                {filteredAdverts.length !== 0 ? (
                  filteredAdverts.map(filterAdvert => (
                    <Advert
                      key={`listAd-${filterAdvert.id}`}
                      idKey={'listAd'}
                      link={true}
                      ad={filterAdvert}
                    />
                  ))
                ) : (
                  <NotResult />
                )}
              </Row>
            </>
          ) : (
            <AdvertsEmptyPage />
          )}
        </>
      )}
    </Container>
  )
}

export default AdvertsPage
