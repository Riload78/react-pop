/* 
import UseAdverts from './hooks/UseAdverts.js'
import UseCreateAdvert from './hooks/UseCreateAdvert.js'
import UseAdvertDelete from './hooks/UseAdvertDelete.js'
import UseAdvert from './hooks/UseAdvert.js'
import UseTags from './hooks/UseTags.js' */

import hooks from './hooks'
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
} from './types'


const {UseAdverts, UseCreateAdvert, UseAdvertDelete, UseAdvert, UseTags, UseAuth} = hooks

export const authLogin = (credentials, isSessionSaved) => {
 /*  return async function (dispatch, _getState, {services:{auth} , router}) {
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
  } */
 return UseAuth(credentials, isSessionSaved)
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
// export const advertMaxPriceFulfilled = adverts => ({
//   type: MAX_PRICE,
//   payload: adverts,
//   adverts:{
//     maxPrice: adverts.reduce(
//       (max, advert) => (advert.price > max ? advert.price : max),
//       0
//     )
//   }
// })

export const advertsRejected = error => ({
  type: ADVERTS_GET_REJECTED,
  payload: error,
  notification: {
    type: error.type,
    message: error.message,
  },
})
export const advertsLoad = () => {
  return UseAdverts()
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
 return UseCreateAdvert(advert)
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
 return UseAdvertDelete(id)
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
 return UseAdvert(advertId)
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
 return UseTags()
}

export const hideNotification = () => ({
  type: NOTIFICATION_CLOSE,
  payload: null,
  notification: {
    type: null,
    message: null,
  },
})
