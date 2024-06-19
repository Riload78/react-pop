import { tagsFulfilled, tagsPending, tagsRejected } from '../actions'
import { isTagsLoaded } from '../selectors'
const UseTags = () => {
  return async function (dispatch, getState, { services: { dataAdvert } }) {
    const state = getState()
    if (isTagsLoaded(state)) {
      return
    }
    try {
      dispatch(tagsPending())
      const tags = await dataAdvert.getTags()
      dispatch(tagsFulfilled(tags))
    } catch (error) {
      dispatch(tagsRejected({ type: 'error', message: error.message }))
    }
  }
}

export default UseTags
