
import {
  AUTH_LOGOUT,
  AUTH_LOGIN,
  SESSION_SAVE,
  ADVERTS_GET,
  ADVERTS_POST,
  ADVERTS_DELETE,
  ADVERTS_GET_TAGS,
} from './types'

export const authLogin = () => ({ type: AUTH_LOGIN })

export const authLogout = () => ({ type: AUTH_LOGOUT })

export const sessionSave = (isSaved) => ({
  type: SESSION_SAVE,
  payload: isSaved
})

export const getAdverts = adverts => ({
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
