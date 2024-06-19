import { advertDetailFulfilled, advertDetailPending, advertDetailRejected } from '../actions'
import { getAdvertDetail } from '../selectors'
const UseAdvert = advertId => {
    return async function (dispatch, getState, { services: { dataAdvert } }) {
      const state = getState()

      if (getAdvertDetail(advertId)(state)) {
        return
      }
      try {
        dispatch(advertDetailPending())
        const advertDetail = await dataAdvert.getAdvert(advertId)
        dispatch(advertDetailFulfilled(advertDetail))
      } catch (error) {
        dispatch(
          advertDetailRejected({ type: 'error', message: error.message })
        )
      }
    }
}

export default UseAdvert