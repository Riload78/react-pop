import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Spinner from 'react-bootstrap/Spinner'
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import dataAdvert from './service.js'
import Advert from './Advert.js'

const AdvertPage = () => {
  const [advert, setAdvert] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const params = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      console.log('El useEffect se está ejecutando en ad()')
      try {
        setIsLoading(true)
        const advert = await dataAdvert.getAdvert(params.advertId)
        setAdvert(advert)
      } catch (error) {
        console.log(error)
        setIsLoading(false)
        if (error) {
          navigate('/404')
        }
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
    console.log('El useEffect se está ejecutando en raiz')
  }, [params.advertId, navigate])

  return (
    <Container>
      {isLoading ? (
        <Row className=' min-vh-100 d-flex justify-content-center align-items-center'>
          <Spinner animation='border' variant='primary' size='3rem' />
        </Row>
      ) : (
        <Row xs={12} className='g-4'>
          {Object.keys(advert).length !== 0 && (
            <Advert link={false} advert={advert} />
          )}
        </Row>
      )}
    </Container>
  )
}

export default AdvertPage
