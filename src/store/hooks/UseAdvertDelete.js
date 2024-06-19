import { advertDeleteFulfilled, advertDeleteRejected } from '../actions'
import {advertMaxPriceFulfilled} from '../actions'
import calculateMaxPrice from '../../helper/calculateMaxPrice'
const UseAdvertDelete = (id) => {
    return async function (dispatch, getState, { services, router }) {
      const state = getState()
      try {
        const advert = await services.dataAdvert.getAdvert(id)
        const response = await services.dataAdvert.deleteAdvert(id)
        if (response.status === 204) {
          dispatch(
            advertDeleteRejected({ type: 'error', message: 'Advert not found' })
          )
        }
        dispatch(advertDeleteFulfilled(advert))
        console.log(state);
        const updateAdverts = state.adverts.data.filter(
          advert => advert.id !== id
        )
        console.log(updateAdverts);
        const maxPrice =  calculateMaxPrice(updateAdverts)
        dispatch(advertMaxPriceFulfilled(maxPrice))
        router.navigate('/adverts')
      } catch (error) {
        dispatch(
          advertDeleteRejected({ type: 'error', message: error.message })
        )
      }
    }
}

export default UseAdvertDelete