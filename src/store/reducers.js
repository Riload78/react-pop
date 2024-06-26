import { combineReducers } from 'redux'
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
  MAX_PRICE,
} from './types'

export const defaultState = {
  auth: false,
  session: true,
  adverts: {
    loaded: false,
    data: [],
    tags: [],
    maxPrice: 0,
  },
  ui: {
    loading: false,
    notification: {
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
  switch (action.type) {
    case ADVERTS_GET_FULFILLED:
      return {
        ...state,
        loaded: true,
        data: action.payload,
        maxPrice: action.adverts.maxPrice,
      }
    case ADVERTS_GET_REJECTED:
      return { ...state, loaded: false }
    case ADVERTS_GET_PENDING:
      return { ...state, loaded: false }
    case ADVERTS_POST_FULFILLED:
      return { ...state, loaded: true, data: [action.payload, ...state.data] , maxPrice: state.maxPrice}
    case ADVERTS_POST_REJECTED:
      return { ...state, loaded: false }
    case ADVERTS_POST_PENDING:
      return { ...state, loaded: false }
    case ADVERTS_DELETE:
      return {
        ...state,
        loaded: true,
        data: state.data.filter(advert => advert.id !== action.payload.id),
        maxPrice: state.maxPrice,
      }
    case ADVERTS_DETAIL_FULFILLED:
      return {
        ...state,
        loaded: true,
        data: [action.payload],
      }
    case ADVERTS_DETAIL_REJECTED:
      return {
        ...state,
        loaded: false,
      }
    case ADVERTS_DETAIL_PENDING:
      return {
        ...state,
        loaded: false,
      }
    case TAGS_GET_FULFILLED:
      return {
        ...state,
        loaded: true,
        tags: action.payload,
      }
    case TAGS_GET_REJECTED:
      return {
        ...state,
        loaded: false,
      }
    case TAGS_GET_PENDING:
      return {
        ...state,
        loaded: false,
      }
     case MAX_PRICE:
        return {
          ...state,
          loaded: true,
          maxPrice: action.payload
        }
    default:
      return state
  }
}

/* export const tags = (state = [], action) => {
  switch (action.type) {
    
    default:
      return state
  }
} */

export const ui = (state = defaultState.ui, action) => {
  switch (action.type) {
    case AUTH_LOGIN_PENDING:
      return {
        ...state,
        loading: true,
        notification: {
          type: null,
          message: null,
        },
      }
    case AUTH_LOGIN_FULFILLED:
      return {
        ...state,
        loading: false,
        notification: {
          type: action.payload.type,
          message: action.payload.message,
        },
      }
    case AUTH_LOGIN_REJECTED:
      return {
        ...state,
        loading: false,
        notification: {
          type: action.payload.type,
          message: action.payload.message,
        },
      }
    case ADVERTS_GET_PENDING:
      return {
        ...state,
        loading: true,
        notification: {
          type: state.notification.type,
          message: state.notification.message,
        },
      }
    case ADVERTS_GET_FULFILLED:
      return {
        ...state,
        loading: false,
        notification: {
          type: state.notification.type,
          message: state.notification.message,
        },
      }
    case ADVERTS_GET_REJECTED:
      return {
        ...state,
        loading: false,
        notification: {
          type: action.payload.type,
          message: action.payload.message,
        },
      }
    case ADVERTS_DETAIL_PENDING:
      return {
        ...state,
        loading: true,
        notification: {
          type: state.notification.type,
          message: state.notification.message,
        },
      }
    case ADVERTS_DETAIL_FULFILLED:
      return {
        ...state,
        loading: false,
        notification: {
          type: state.notification.type,
          message: state.notification.message,
        },
      }
    case ADVERTS_DETAIL_REJECTED:
      return {
        ...state,
        loading: false,
        notification: {
          type: action.payload.type,
          message: action.payload.message,
        },
      }
    case ADVERTS_POST_PENDING:
      return {
        ...state,
        loading: true,
        notification: {
          type: state.notification.type,
          message: state.notification.message,
        },
      }
    case ADVERTS_POST_FULFILLED:
      return {
        ...state,
        loading: false,
        notification: {
          type: action.notification.type,
          message: action.notification.message,
        },
      }
    case ADVERTS_POST_REJECTED:
      return {
        ...state,
        loading: false,
        notification: {
          type: action.payload.type,
          message: action.payload.message,
        },
      }
    case TAGS_GET_PENDING:
      return {
        ...state,
        loading: true,
        notification: {
          type: state.notification.type,
          message: state.notification.message,
        },
      }
    case TAGS_GET_FULFILLED:
      return {
        ...state,
        loading: false,
        notification: {
          type: state.notification.type,
          message: state.notification.message,
        },
      }
    case TAGS_GET_REJECTED:
      return {
        ...state,
        loading: false,
        notification: {
          type: action.payload.type,
          message: action.payload.message,
        },
      }
    case NOTIFICATION_CLOSE:
      return {
        ...state,
        notification: {
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
