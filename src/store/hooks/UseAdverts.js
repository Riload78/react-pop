import { isAdvertsLoaded } from '../selectors'
import { advertsPending, advertsFulfilled, advertsRejected } from '../actions'

const UseAdverts = () => {
     return async function (dispatch, getState, { services: { dataAdvert } }) {
       const state = getState()

       if (isAdvertsLoaded(state)) {
         return
       }
       try {
         dispatch(advertsPending())
         const adverts = await dataAdvert.getAdverts()
         dispatch(advertsFulfilled(adverts))
       } catch (error) {
         dispatch(advertsRejected({ type: 'error', message: error.message }))
       }
     }
}

export default UseAdverts