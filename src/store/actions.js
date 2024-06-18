
import {
  isAdvertsLoaded,
  getAdvertDetail,
  isAdvertDetailLoaded,
  isTagsLoaded,
} from './selectors.js'
import {
  AUTH_LOGOUT,
  AUTH_LOGIN_PENDING,
  AUTH_LOGIN_FULFILLED,
  AUTH_LOGIN_REJECTED,
  SESSION_SAVE,
  ADVERTS_GET_PENDING,
  ADVERTS_GET_FULFILLED,
  ADVERTS_GET_REJECTED,
  ADVERTS_POST_PENDING,
  ADVERTS_POST_FULFILLED,
  ADVERTS_POST_REJECTED,
  ADVERTS_DELETE,
  TAGS_GET_PENDING,
  TAGS_GET_FULFILLED,
  TAGS_GET_REJECTED,
  NOTIFICATION_CLOSE,
  ADVERTS_DETAIL_PENDING,
  ADVERTS_DETAIL_FULFILLED,
  ADVERTS_DETAIL_REJECTED,
  MAX_PRICE
} from './types'

export const authLogin = (credentials, isSessionSaved) => {
  return async function (dispatch, _getState, {services:{auth} , router}) {
    try {
      dispatch(authLoginPending())
      await auth.login(credentials, isSessionSaved)
      dispatch(
        authLoginFulfilled({ type: 'success', message: 'LOGIN SUCCESSFUL' })
      )
      const to = router.state.location.state?.from || '/'
      router.navigate(to, { replace: true })
    } catch (error) {
      dispatch(authLoginRejected({ type: 'error', message: error.message }))
    }
  }
}

export const authLoginPending = () => ({ type: AUTH_LOGIN_PENDING })

export const authLoginFulfilled = success => ({
  type: AUTH_LOGIN_FULFILLED,
  payload: success,
  notification: {
    type: success.type,
    message: success.message,
  },
})

export const authLoginRejected = error => ({
  type: AUTH_LOGIN_REJECTED,
  payload: error,
  notification: {
    type: error.type,
    message: error.message,
  },
})

export const authLogout = () => ({ type: AUTH_LOGOUT })

export const sessionSave = isSaved => ({
  type: SESSION_SAVE,
  payload: isSaved,
})


// ADVERTS
export const advertsPending = () => ({
  type: ADVERTS_GET_PENDING,
})

export const advertsFulfilled = adverts => ({
  type: ADVERTS_GET_FULFILLED,
  payload: adverts,
  adverts:{
    maxPrice: adverts.reduce(
      (max, advert) => (advert.price > max ? advert.price : max),
      0
    )
  }
})

// creo que se puede quitar. No uso el middelware
export const advertMaxPriceFulfilled = maxPrice => ({
  type: MAX_PRICE,
  payload: maxPrice,
})

export const advertsRejected = error => ({
  type: ADVERTS_GET_REJECTED,
  payload: error,
  notification: {
    type: error.type,
    message: error.message,
  },
})
export const advertsLoad = () => {
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




// ADVERT POST
export const advertPostPending = () => ({
  type: ADVERTS_POST_PENDING,
})

export const advertPostFulfilled = (advert, notification) => ({
  type: ADVERTS_POST_FULFILLED,
  payload: advert,
  notification: {
    type: notification.type,
    message: notification.message,
  }
  
})



export const advertPostRejected = error => ({
  type: ADVERTS_POST_REJECTED,
  payload: error,
  notification: {
    type: error.type,
    message: error.message,
  },
})



export const createAdvert = advert => {
  return async function (dispatch, _getState, { services, router }) {
    try {
      dispatch(advertPostPending())
      const {id} = await services.dataAdvert.postAdvert(advert)
      const newAdvert = await services.dataAdvert.getAdvert(id)
      console.log('newAdvert:', newAdvert)
      dispatch(advertPostFulfilled(newAdvert,{ type: 'success', message: 'Advert created successfully' }))
      router.navigate(`/adverts/${newAdvert.id}`)
      return newAdvert
    } catch (error) {
      dispatch(advertPostRejected({ type: 'error', message: error.message }))
    }
  }
}

// DELETE
export const advertDeleteFulfilled = id => ({
  type: ADVERTS_DELETE,
  payload: id,
})

export const advertDeleteRejected = error => ({
  type: ADVERTS_POST_REJECTED,
  payload: error,
  notification: {
    type: error.type,
    message: error.message,
  },
})

export const advertDelete = id => {
  return async function (dispatch, _getState, { services, router }) {
    try {
      const advert = await services.dataAdvert.getAdvert(id)
      const response = await services.dataAdvert.deleteAdvert(id)
      if(response.status === 204) {
        dispatch(
          advertDeleteRejected({ type: 'error', message: 'Advert not found' })
        )
      }
      dispatch(advertDeleteFulfilled(advert))
      router.navigate('/adverts')
    } catch (error) {
      dispatch(advertDeleteRejected({ type: 'error', message: error.message }))
    }
  }
}




// ADVERT
export const advertDetailPending = () => ({
  type: ADVERTS_DETAIL_PENDING,
})

export const advertDetailFulfilled = advert => ({
  type: ADVERTS_DETAIL_FULFILLED,
  payload: advert,
})

export const advertDetailRejected = error => ({
  type: ADVERTS_DETAIL_REJECTED,
  payload: error,
  notification: {
    type: error.type,
    message: error.message,
  },
})

export const advertLoad = advertId => {
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
      dispatch(advertDetailRejected({ type: 'error', message: error.message }))
    }
  }
}

// TAGS
export const tagsPending = () => ({
  type: TAGS_GET_PENDING,
})

export const tagsFulfilled = tags => ({
  type: TAGS_GET_FULFILLED,
  payload: tags,
})

export const tagsRejected = error => ({
  type: TAGS_GET_REJECTED,
  payload: error,
  notification: {
    type: error.type,
    message: error.message,
  },
})

export const tagsLoad = () => {
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

export const hideNotification = () => ({
  type: NOTIFICATION_CLOSE,
  payload: null,
  notification: {
    type: null,
    message: null,
  },
})
