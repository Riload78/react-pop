import dataAdvert  from './service.js'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Spinner from 'react-bootstrap/Spinner'
import { useEffect, useState } from 'react'
import Advert from './Advert.js'
import AdvertsEmptyPage from './AdvertsEmptyPage.js' 

const AdvertsPage = () => {
  const [adverts, setAdverts] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const ads = async () => {
      try {
        setIsLoading(true)
        const adverts = await dataAdvert.getAdverts()
        setAdverts(adverts)
        setIsLoading(false)
      } catch (error) {
        setIsLoading(false)
        throw new Error(error.message)
      }
    }
    
    ads()
    console.log('useEffect AdvertsPage');
  }, [])

  return (
    <Container>
      {isLoading ? (
        <Row className=' min-vh-100 d-flex justify-content-center align-items-center'>
          <Spinner animation='border' variant='primary' size='3rem' />
        </Row>
      ) : (
        <Row xs={1} sm={2} md={3} lg={3} className='g-4'>
          {Object.keys(adverts).length !== 0 ? (
            adverts.map((advert, index) => (
              <Advert
                key={`listAd-${advert.id}`}
                idKey={'listAd'}
                link={true}
                ad={advert}
              />
            ))
          ) : (
            <AdvertsEmptyPage />
          )}
        </Row>
      )}
    </Container>
  )
}

export default AdvertsPage
