import { advertPostPending, advertPostFulfilled, advertPostRejected } from '../actions'


const UseCreateAdvert = advert => {
  return async function (dispatch, _getState, { services, router }) {
    try {
      dispatch(advertPostPending())
      const { id } = await services.dataAdvert.postAdvert(advert)
      const newAdvert = await services.dataAdvert.getAdvert(id)
      console.log('newAdvert:', newAdvert)
      dispatch(
        advertPostFulfilled(newAdvert, {
          type: 'success',
          message: 'Advert created successfully',
        })
      )
      router.navigate(`/adverts/${newAdvert.id}`)
      return newAdvert
    } catch (error) {
      dispatch(advertPostRejected({ type: 'error', message: error.message }))
    }
  }
}

export default UseCreateAdvert
