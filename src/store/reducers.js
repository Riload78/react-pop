import { combineReducers } from 'redux'
import {
  AUTH_LOGOUT,
  AUTH_LOGIN,
  SESSION_SAVE,
  ADVERTS_GET,
  ADVERTS_POST,
  ADVERTS_DELETE,
  ADVERTS_GET_TAGS,
} from './types'

export const defaultState = {
  auth: false,
  session: true,
  adverts: [],
}

export const auth = (state = defaultState.auth, action) => {
  switch (action.type) {
    case AUTH_LOGIN:
      return true
    case AUTH_LOGOUT:
      return false
    default:
      return state
  }
}

export const session = (state = {}, action) => {
  switch (action.type) {
    case SESSION_SAVE:
      return true
    default:
      return state
  }
}

export const adverts = (state = defaultState.adverts, action) => {
  switch (action.type) {
    case ADVERTS_GET:
      return action.payload
    case ADVERTS_POST:
      return [...state.adverts, action.payload]
    case ADVERTS_DELETE:
      return [
        ...state.adverts.filter(advert => advert.id !== action.payload.id),
      ]
    default:
      return state
  }
}

const reducer = combineReducers({
  auth,
  session,
  adverts,
})

export default reducer
