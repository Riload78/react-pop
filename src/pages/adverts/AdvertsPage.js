import dataAdvert from './service.js'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Spinner from 'react-bootstrap/Spinner'
import { useEffect, useState } from 'react'
import Advert from './Advert.js'
import AdvertsEmptyPage from './AdvertsEmptyPage.js'
import Search from '../../search/Search.js'
import NotResult from '../../search/NotResult.js'

const AdvertsPage = () => {
  const [adverts, setAdverts] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  let [filteredAdverts, setFilteredAdverts] = useState([])
  const [filterName, setFilterName] = useState('')
  const [filterSale, setFilterSale] = useState(null)
  const [sliderValue, setSliderValue] = useState([0, 1000])
  const [minValue, set_minValue] = useState(0)
  const [maxValue, set_maxValue] = useState(1000)
  const [max, setMax] = useState()
  const [tags, setTags] = useState([])

  useEffect(() => {
    const ads = async () => {
      try {
        setIsLoading(true)
        const adverts = await dataAdvert.getAdverts()
        setAdverts(adverts)
        const maxPrice = adverts.reduce((max, advert) => {
          return advert.price > max ? advert.price : max
        }, 0)
        setMax(maxPrice)
        set_maxValue(maxPrice)
        // setFilteredAdverts(adverts)
        setIsLoading(false)
      } catch (error) {
        setIsLoading(false)
        throw new Error(error.message)
      }
    }

    ads()
    console.log('useEffect AdvertsPage')
  }, [])

  const handleSearch = event => {
    console.log(event)
    console.log(event.target.value)
    const search = event.target.value

    setFilterName(search)
  }

  const handleSale = event => {
    const value = event.target.value
    let saleValue = value === '1' ? true : value === '0' ? false : null
    setFilterSale(saleValue)
  }

  const handlePrice = event => {
    console.log(event)
    const maxPrice = adverts.reduce((max, advert) => {
      return advert.price > max ? advert.price : max
    }, 0)
    setMax(maxPrice)
    set_minValue(event.minValue)
    set_maxValue(event.maxValue)
  }

  const handleOptions = (event) => {
    console.log(event);
    let tagsArr = []
    if (event.target.value.length !== 0) {
      tagsArr = [...tagsArr, event.target.value]
    } else{
      tagsArr = []
    }
    setTags(tagsArr);
  }
  filteredAdverts = adverts.filter(item => {
    const nameMatch = item.name.toLowerCase().includes(filterName.toLowerCase())
    console.log(filterSale)
    let saleMatch = true
    if (filterSale !== null) {
      saleMatch = item.sale === filterSale
    }
    const priceMatch = item.price >= minValue && item.price <= maxValue

    const tagsMatch =  tags.every(tag => item.tags.indexOf(tag) !== -1 )

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
      <Search
        onSearch={handleSearch}
        onSale={handleSale}
        onPrice={handlePrice}
        maxPrice={maxValue}
        minPrice={minValue}
        max={max}
        OnOptionsChange={handleOptions}
      />
      {adverts.length !== 0 ? ( // Verifica si hay elementos en adverts
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
      ) : (
         <AdvertsEmptyPage />
      )}
    </>
  )}
</Container>
  )
}

export default AdvertsPage