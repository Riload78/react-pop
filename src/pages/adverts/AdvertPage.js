import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Spinner from 'react-bootstrap/Spinner'
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import dataAdvert from './service.js'
import Advert from './Advert.js'
import ModalConfirm from '../../components/ModalConfirm.js'
import { useDeletedAdvert } from './context'

const AdvertPage = () => {
  const [advert, setAdvert] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const params = useParams()
  const navigate = useNavigate()
  const { markAdvertAsDeleted } = useDeletedAdvert()

  useEffect(() => {
    const fetchData = async () => {
      console.log('El useEffect se está ejecutando en ad()')
      try {
        setIsLoading(true)
        const fetchAdvert = await dataAdvert.getAdvert(params.advertId)
        console.log('fetchAdvert', fetchAdvert)
        setAdvert(fetchAdvert)
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

  const handleDelete = () => {
    console.log('mira que borro....')
    const id = advert.id
    console.log(id)
    try {
      setIsLoading(true)
      dataAdvert.deleteAdvert(id)
      setIsLoading(false)
      markAdvertAsDeleted(id)
      navigate('/adverts')
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Container>
      {isLoading ? (
        <Row className=' min-vh-100 d-flex justify-content-center align-items-center'>
          <Spinner animation='border' variant='primary' size='3rem' />
        </Row>
      ) : (
        <Row xs={12} className='g-4'>
          {Object.keys(advert).length !== 0 && (
            <>
              <Container className='advert-wrapper p-2'>
                <Advert
                  key={`viewAd-${advert.id}`}
                  idKey={'viewAd'}
                  link={false}
                  ad={advert}
                />
                <ModalConfirm
                  lanchTitle='Delete Advert'
                  modalText='The ad will be removed. Accept to confirm'
                  actionText='Accept'
                  action={handleDelete}
                ></ModalConfirm>
              </Container>
            </>
          )}
        </Row>
      )}
    </Container>
  )
}

export default AdvertPage
