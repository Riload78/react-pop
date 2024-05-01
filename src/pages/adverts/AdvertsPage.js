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

const AdvertsPage = () => {
  const { adverts, deletedAdvertId, addAdverts } = useAdverts()
  const [isLoading, setIsLoading] = useState(false)
  const [filterName, setFilterName] = useState('')
  const [filterSale, setFilterSale] = useState(null)
  const [minValue, set_minValue] = useState(0)
  const [maxValue, set_maxValue] = useState(1000)
  const [max, setMax] = useState()
  const [tags, setTags] = useState([])
  const { showNotificationError } = useNotification()

  useEffect(() => {
    const fetchAdverts = async () => {
      try {
        setIsLoading(true)
        const adverts = await dataAdvert.getAdverts()
        addAdverts(adverts)
        const maxPrice = adverts.reduce((max, advert) => {
          return advert.price > max ? advert.price : max
        }, 0)
        if (deletedAdvertId) {
          const updatedAdvert = adverts.filter(
            advert => advert.id !== deletedAdvertId
          )
          addAdverts(updatedAdvert)
        }
        setMax(maxPrice)
        set_maxValue(maxPrice)
        setIsLoading(false)
      } catch (error) {
        setIsLoading(false)
        showNotificationError(error.message)
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
    const maxPrice = adverts.reduce((max, advert) => {
      return advert.price > max ? advert.price : max
    }, 0)
    setMax(maxPrice)
    set_minValue(event.minValue)
    set_maxValue(event.maxValue)
  }

  const handleOptions = event => {
    const options = Array.from(event.target.selectedOptions).map(
      item => item.value
    )
    setTags(options)
  }

  const handleReset = () => {
    setFilterName('')
    setFilterSale(null)
    set_minValue(0)
    set_maxValue(1000)
    setTags([])
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
                  <NotResult onReset={handleReset} />
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
