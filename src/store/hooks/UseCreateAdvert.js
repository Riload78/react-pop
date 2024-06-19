import {
  advertPostPending,
  advertPostFulfilled,
  advertPostRejected,
  advertMaxPriceFulfilled,
} from '../actions'
import calculateMaxPrice from '../../helper/calculateMaxPrice'

const UseCreateAdvert = advert => {
  return async function (dispatch, getState, { services, router }) {
    const state = getState()
    try {
      dispatch(advertPostPending())
      const { id } = await services.dataAdvert.postAdvert(advert)
      const newAdvert = await services.dataAdvert.getAdvert(id)
      dispatch(
        advertPostFulfilled(newAdvert, {
          type: 'success',
          message: 'Advert created successfully',
        })
      )
      const maxPrice =  calculateMaxPrice([...state.adverts.data, newAdvert])
      dispatch(advertMaxPriceFulfilled(maxPrice))
      router.navigate(`/adverts/${newAdvert.id}`)
      return newAdvert
    } catch (error) {
      dispatch(advertPostRejected({ type: 'error', message: error.message }))
    }
  }
}

export default UseCreateAdvert
