import { combineReducers } from 'redux'
import {
  AUTH_LOGOUT,
  AUTH_LOGIN,
  ADVERTS_GET,
  ADVERTS_POST,
  ADVERTS_DELETE,
  ADVERTS_GET_TAGS,
} from './types'

export const defaultState = {
  auth: false,
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
  adverts,
})

export default reducer
