
import {
  AUTH_LOGOUT,
  AUTH_LOGIN_PENDING,
  AUTH_LOGIN_FULFILLED,
  AUTH_LOGIN_REJECTED,
  SESSION_SAVE,
  ADVERTS_GET,
  ADVERTS_POST,
  ADVERTS_DELETE,
  ADVERTS_GET_TAGS,
} from './types'

export const authLogin = () => ({ })

export const authLoginPending = () => ({ type: AUTH_LOGIN_PENDING })

export const authLoginFulfilled = () => ({ type: AUTH_LOGIN_FULFILLED })

export const authLoginRejected = (error) => ({ 
  type: AUTH_LOGIN_REJECTED, 
  payload: error,
  error: true
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
