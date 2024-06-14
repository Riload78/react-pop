import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Spinner from 'react-bootstrap/Spinner'
import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import dataAdvert from './service.js'
import Advert from './Advert.js'
import ModalConfirm from '../../components/ModalConfirm.js'
//import { useAdverts } from './AdvertContext.js'
//import { useNotification } from '../../notification/NotificationProvider.js'
import { useSelector, useDispatch } from 'react-redux'
import {
  getAdvert,
  getIsLoading,
} from '../../store/selectors.js'
import { advertLoad } from '../../store/actions.js'

const AdvertPage = () => {
  const dispach = useDispatch()
  const isLoading = useSelector(getIsLoading)
  const { advertId } = useParams()
  const navigate = useNavigate()
  //const { markAdvertAsDeleted } = useAdverts()
  //const { showNotificationError } = useNotification()
  // const [advert, setAdvert] = useState({})
  const advert = useSelector(getAdvert(advertId))
  console.log('advert', advert);

  useEffect(() => {
    console.log('useEffect advertId:', advertId);
    dispach(advertLoad(advertId))
   
  }, [dispach, advertId])
 
  const handleDelete = () => {
    const id = advert.id

    try {
      
      dataAdvert.deleteAdvert(id)
      
      // markAdvertAsDeleted(id)
      navigate('/adverts')
    } catch (error) {
      // showNotificationError(error.message)
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
          {advert && (
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
