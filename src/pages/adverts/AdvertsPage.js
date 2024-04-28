import dataAdvert from './service.js'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Spinner from 'react-bootstrap/Spinner'
import { useEffect, useState } from 'react'
import Advert from './Advert.js'
import AdvertsEmptyPage from './AdvertsEmptyPage.js'
import Search from '../../search/Search.js'

const AdvertsPage = () => {
  const [adverts, setAdverts] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  let [filteredAdverts, setFilteredAdverts] = useState([])
  const [filterName, setFilterName] = useState('')
  const [filterSale, setFilterSale] = useState(null)
  const [sliderValue, setSliderValue] = useState([0, 1000])

  useEffect(() => {
    const ads = async () => {
      try {
        setIsLoading(true)
        const adverts = await dataAdvert.getAdverts()
        setAdverts(adverts)
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
  filteredAdverts = adverts.filter(item => {
    
    const nameMatch = item.name.toLowerCase().includes(filterName.toLowerCase())
    console.log(filterSale)
    let saleMatch = true
    if (filterSale !== null) {
      saleMatch = item.sale === filterSale
    }
    const priceMatch = item.price >= sliderValue[0] && item.price <= sliderValue[1]

    return nameMatch && saleMatch
  })

  return (
    <Container>
      {isLoading ? (
        <Row className=' min-vh-100 d-flex justify-content-center align-items-center'>
          <Spinner animation='border' variant='primary' size='3rem' />
        </Row>
      ) : (
        <>
          <Search onSearch={handleSearch} onSale={handleSale}></Search>
          <Row xs={1} sm={2} md={3} lg={3} className='g-4'>
            {Object.keys(filteredAdverts).length !== 0 ? (
              filteredAdverts.map(filterAdvert => (
                <>
                  <Advert
                    key={`listAd-${filterAdvert.id}`}
                    idKey={'listAd'}
                    link={true}
                    ad={filterAdvert}
                  />
                </>
              ))
            ) : (
              <AdvertsEmptyPage />
            )}
          </Row>
        </>
      )}
    </Container>
  )
}

export default AdvertsPage
