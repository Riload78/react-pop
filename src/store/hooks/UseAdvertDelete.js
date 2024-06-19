import { advertDeleteFulfilled, advertDeleteRejected } from '../actions'

const UseAdvertDelete = (id) => {
    return async function (dispatch, _getState, { services, router }) {
      try {
        const advert = await services.dataAdvert.getAdvert(id)
        const response = await services.dataAdvert.deleteAdvert(id)
        if (response.status === 204) {
          dispatch(
            advertDeleteRejected({ type: 'error', message: 'Advert not found' })
          )
        }
        dispatch(advertDeleteFulfilled(advert))
        router.navigate('/adverts')
      } catch (error) {
        dispatch(
          advertDeleteRejected({ type: 'error', message: error.message })
        )
      }
    }
}

export default UseAdvertDelete