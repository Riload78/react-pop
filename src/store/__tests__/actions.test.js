import {
  authLoginPending,
  authLoginFulfilled,
  advertsPending,
  advertsFulfilled,
} from '../actions.js'
import {
  AUTH_LOGIN_PENDING,
  AUTH_LOGIN_FULFILLED,
  ADVERTS_GET_PENDING,
  ADVERTS_GET_FULFILLED,
} from '../types.js'

describe('authLogin', () => {
  describe('authLoginPending', () => {
    test('should return an action with type AUTH_LOGIN_PENDING', () => {
      const expectedAction = {
        type: AUTH_LOGIN_PENDING,
      }
      expect(authLoginPending()).toEqual(expectedAction)
    })
  })

  describe('authLoginFulfilled', () => {
    test('should return an action with type AUTH_LOGIN_FULFILLED', () => {
      const expectedAction = {
        type: AUTH_LOGIN_FULFILLED,
        payload: { 
            type: 'success', 
            message: 'LOGIN SUCCESSFUL',
        },
        notification: {
          type: 'success',
          message: 'LOGIN SUCCESSFUL',
        }
      }
      expect(
        authLoginFulfilled({ type: 'success', message: 'LOGIN SUCCESSFUL' })
      ).toEqual(expectedAction)
    })
  })
  
})

describe('adverts', () => {
  describe('adverts_get_Pending', () => {
    test('should return an action with type ADVERTS_GET_PENDING', () => {
      const expectedAction = {
        type: ADVERTS_GET_PENDING,
      }
      expect(advertsPending()).toEqual(expectedAction)
    })
  })
  describe('advertsGetFulfilled', () => {
    test('should return an action with type ADVERTS_GET_FULFILLED', () => {
      const adverts = [1, 2, 3]
      const expectedAction = {
        type: ADVERTS_GET_FULFILLED,
        payload: adverts,
      }
      const action = advertsFulfilled(adverts)
      expect(action).toEqual(expectedAction)
    })
  })
})
