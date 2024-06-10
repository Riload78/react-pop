import dataAdvert from './service.js'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Spinner from 'react-bootstrap/Spinner'
import { useEffect, useState } from 'react'
import { useAdverts } from './AdvertContext'
import Advert from './Advert.js'
import AdvertsEmptyPage from './AdvertsEmptyPage.js'
import Search from '../../search/Search.js'
import NotResult from '../../search/NotResult.js'
import { useNotification } from '../../notification/NotificationProvider.js'
import { getAdverts, getIsLoading} from '../../store/selectors.js'
import { advertsFulfilled, advertsLoad, advertsPending, advertsRejected } from '../../store/actions.js'
import { useDispatch, useSelector } from 'react-redux'

const AdvertsPage = () => {
  const dispatch = useDispatch()
  const { deletedAdvertId, addAdverts } = useAdverts()
  const adverts = useSelector(getAdverts)
  const isLoading = useSelector(getIsLoading)
  const [filterName, setFilterName] = useState('')
  const [filterSale, setFilterSale] = useState(null)
  const [minValue, setMinValue] = useState(0)
  const [maxValue, setMaxValue] = useState(1000)
  const [max, setMax] = useState()
  const [tags, setTags] = useState([])


  const getMaxPrice = adverts => {
    return adverts.reduce(
      (max, advert) => (advert.price > max ? advert.price : max),
      0
    )
  }

  useEffect(() => {
    const fetchAdverts = async () => {
      try {
        dispatch(advertsPending())
        const adverts = await dataAdvert.getAdverts()
        dispatch(advertsFulfilled(adverts))
        const maxPrice = getMaxPrice(adverts)
        if (deletedAdvertId) {
          const updatedAdvert = adverts.filter(
            advert => advert.id !== deletedAdvertId
          )
          addAdverts(updatedAdvert)
        }
        setMax(maxPrice)
        setMaxValue(maxPrice)
      } catch (error) {
        dispatch(advertsRejected({ type: 'error', message: error.message }))
      }
    }

    fetchAdverts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deletedAdvertId])

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
    const maxPrice = getMaxPrice(adverts)
    setMax(maxPrice)
    setMinValue(event.minValue)
    setMaxValue(event.maxValue)
  }

  const handleOptions = event => {
    const options = Array.from(event.target.selectedOptions).map(
      item => item.value
    )
    setTags(options)
  }

  let filteredAdverts = adverts.filter(item => {
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
              <Row xs={1} sm={2} md={3} lg={3} className='list-wrapper g-4'>
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
