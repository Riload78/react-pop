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
  //const [filteredAdverts, setFilteredAdverts] = useState([])
  const [filterName, setFilterName] = useState('')

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

  const hadleSearch = event => {
    console.log(event.target.value)
    const search = event.target.value
    setFilterName(search)

  }

  const filteredAdverts = adverts.filter(item =>
    item.name.toLowerCase().includes(filterName.toLowerCase())
  )

  return (
    <Container>
      {isLoading ? (
        <Row className=' min-vh-100 d-flex justify-content-center align-items-center'>
          <Spinner animation='border' variant='primary' size='3rem' />
        </Row>
      ) : (
        <>
          <Search value={filterName} onSearch={hadleSearch}></Search>
          <Row xs={1} sm={2} md={3} lg={3} className='g-4'>
            {Object.keys(filteredAdverts).length !== 0 ? (
              filteredAdverts.map(filteradvert => (
                <>
                  <Advert
                    key={`listAd-${filteradvert.id}`}
                    idKey={'listAd'}
                    link={true}
                    ad={filteradvert}
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
