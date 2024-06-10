import { combineReducers } from 'redux'
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
  NOTIFICATION_CLOSE,
} from './types'

export const defaultState = {
  auth: false,
  session: true,
  adverts: [],
  ui: {
    loading: false,
    message: {
      type: null,
      message: null,
    },
  },
}

export const auth = (state = defaultState.auth, action) => {
  switch (action.type) {
    case AUTH_LOGIN_FULFILLED:
      return true
    case AUTH_LOGOUT:
      return false
    default:
      return state
  }
}

export const session = (state = defaultState.session, action) => {
  switch (action.type) {
    case SESSION_SAVE:
      return action.payload
    default:
      return state
  }
}

export const adverts = (state = defaultState.adverts, action) => {
  console.log('adverts reducer state:', state)
  switch (action.type) {
    case ADVERTS_GET_FULFILLED:
      return action.payload
    case ADVERTS_GET:
      return action.payload
    case ADVERTS_POST:
      return [...state, action.payload]
    case ADVERTS_DELETE:
      return [
        ...state.adverts.filter(advert => advert.id !== action.payload.id),
      ]
    default:
      return state
  }
}

export const ui = (state = defaultState.ui, action) => {
  switch (action.type) {
    case AUTH_LOGIN_PENDING:
      return {
        ...state,
        loading: true,
        message: {
          type: null,
          message: null,
        },
      }
    case AUTH_LOGIN_FULFILLED:
      return {
        ...state,
        loading: false,
        message: {
          type: action.payload.type,
          message: action.payload.message,
        },
      }
    case AUTH_LOGIN_REJECTED:
      return {
        ...state,
        loading: false,
        message: {
          type: action.payload.type,
          message: action.payload.message,
        },
      }
    case ADVERTS_GET_PENDING:
      return {
        ...state,
        loading: true,
        message: {
          type: null,
          message: null,
        },
      }
    case ADVERTS_GET_FULFILLED:
      return {
        ...state,
        loading: false,
        message: {
          type: null,
          message: null,
        },
      }
    case ADVERTS_GET_REJECTED:
      return {
        ...state,
        loading: false,
        message: {
          type: action.payload.type,
          message: action.payload.message,
        },
      }
    case NOTIFICATION_CLOSE:
      return {
        ...state,
        message: {
          type: null,
          message: null,
        },
      }
    default:
      return state
  }
}

const reducer = combineReducers({
  auth,
  session,
  adverts,
  ui,
})

export default reducer
