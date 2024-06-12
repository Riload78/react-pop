
import auth from '../pages/login/service.js'
import {
  AUTH_LOGOUT,
  AUTH_LOGIN_PENDING,
  AUTH_LOGIN_FULFILLED,
  AUTH_LOGIN_REJECTED,
  SESSION_SAVE,
  ADVERTS_GET,
  ADVERTS_GET_PENDING,
  ADVERTS_GET_FULFILLED,
  ADVERTS_GET_REJECTED,
  ADVERTS_POST,
  ADVERTS_DELETE,
  ADVERTS_GET_TAGS,
  NOTIFICATION_CLOSE 
} from './types'

export const authLogin = (credentials, isSessionSaved) => {
  return async function(dispatch) {
  
    try {
      dispatch(authLoginPending())
      await auth.login(credentials, isSessionSaved)
      dispatch(authLoginFulfilled({type: 'success', message: 'LOGIN SUCCESSFUL'}))
    } catch (error) {
      dispatch(authLoginRejected({type: 'error', message: error.message}))
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

export const sessionSave = (isSaved) => ({
  type: SESSION_SAVE,
  payload: isSaved
})

export const advertsLoad = adverts => ({
  type: ADVERTS_GET,
  payload: adverts,
})

export const advertsPending = () => ({
  type: ADVERTS_GET_PENDING,
  adverts: [],
})

export const advertsFulfilled = (adverts) => ({
  type: ADVERTS_GET_FULFILLED,
  payload: adverts
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



export const hideNotification = () => ({
  type: NOTIFICATION_CLOSE,
  payload: null,
  notification: {
    type: null,
    message: null,
  },
})
