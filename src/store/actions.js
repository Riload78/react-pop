import auth from '../pages/login/service.js'
import dataAdvert from '../pages/adverts/service.js'
import { isAdvertsLoaded, getAdvert } from './selectors.js'
import {
  AUTH_LOGOUT,
  AUTH_LOGIN_PENDING,
  AUTH_LOGIN_FULFILLED,
  AUTH_LOGIN_REJECTED,
  SESSION_SAVE,
  ADVERTS_GET_PENDING,
  ADVERTS_GET_FULFILLED,
  ADVERTS_GET_REJECTED,
  ADVERTS_POST,
  ADVERTS_DELETE,
  ADVERTS_GET_TAGS,
  NOTIFICATION_CLOSE,
  ADVERTS_DETAIL_PENDING,
  ADVERTS_DETAIL_FULFILLED,
  ADVERTS_DETAIL_REJECTED,
} from './types'

export const authLogin = (credentials, isSessionSaved) => {
  return async function (dispatch) {
    try {
      dispatch(authLoginPending())
      await auth.login(credentials, isSessionSaved)
      dispatch(
        authLoginFulfilled({ type: 'success', message: 'LOGIN SUCCESSFUL' })
      )
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

/* export const advertsLoad = adverts => ({
  type: ADVERTS_GET,
  payload: adverts,
}) */

// ADVERTS
export const advertsPending = () => ({
  type: ADVERTS_GET_PENDING,
})

export const advertsFulfilled = adverts => ({
  type: ADVERTS_GET_FULFILLED,
  payload: adverts,
})

export const advertsRejected = error => ({
  type: ADVERTS_GET_REJECTED,
  payload: error,
  notification: {
    type: error.type,
    message: error.message,
  },
})

export const postAdvert = advert => ({
  type: ADVERTS_POST,
  payload: advert,
})

export const deleteAdvert = advert => ({
  type: ADVERTS_DELETE,
  payload: advert,
})

export const getTags = tags => ({
  type: ADVERTS_GET_TAGS,
  payload: tags,
})

export const advertsLoad = () => {
  return async function (dispatch, getState) {
    const state = getState()
    console.log('state:', state)
    console.log(isAdvertsLoaded(state))
    if (isAdvertsLoaded(state)) {
      console.log('adverts already loaded')
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
  return async function (dispatch, getState) {
    const state = getState()
    console.log('advertLoad state:', state);
    if (getAdvert(advertId)(state)) {
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

export const hideNotification = () => ({
  type: NOTIFICATION_CLOSE,
  payload: null,
  notification: {
    type: null,
    message: null,
  },
})
