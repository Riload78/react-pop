import {
  authLoginPending,
  authLoginFulfilled,
  authLoginRejected,
  authLogin,
  advertsPending,
  advertsFulfilled,
  advertPostPending,
  advertPostFulfilled,
  advertPostRejected,
  advertsRejected,
} from '../actions.js'
import {
  AUTH_LOGIN_PENDING,
  AUTH_LOGIN_FULFILLED,
  AUTH_LOGIN_REJECTED,
  ADVERTS_GET_PENDING,
  ADVERTS_GET_FULFILLED,
  ADVERTS_POST_PENDING,
  ADVERTS_POST_FULFILLED,
  ADVERTS_POST_REJECTED,
  ADVERTS_GET_REJECTED,
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
        },
      }
      expect(
        authLoginFulfilled({ type: 'success', message: 'LOGIN SUCCESSFUL' })
      ).toEqual(expectedAction)
    })
  })

  describe('authLoginRejected', () => {
    test('should return an action with type AUTH_LOGIN_REJECTED', () => {
      const expectedAction = {
        type: AUTH_LOGIN_REJECTED,
        payload: {
          type: 'error',
          message: 'error',
        },
        notification: {
          type: 'error',
          message: 'error',
        },
      }
      expect(authLoginRejected({ type: 'error', message: 'error' })).toEqual(
        expectedAction
      )
    })
  })

  describe('authLogin', () => {
    const credentials = ['email', 'credentials']
    const isSessionSaved = true
    const action = authLogin(credentials, isSessionSaved)
    const redirect = '/'
    const dispatch = jest.fn()
    const getState = jest.fn()
    const services = {
      auth: {},
    }
    const router = {
      state: {
        location: { state: { from: redirect } },
      },
      navigate: jest.fn(),
    }

    test('should login resolve with error', async () => {
      const error = { type: 'error', message: 'error' }
      services.auth.login = jest.fn().mockRejectedValueOnce(error)
      await action(dispatch, getState, { services, router })
      expect(dispatch).toHaveBeenCalledTimes(2)
      expect(dispatch).toHaveBeenCalledWith(authLoginPending())
      expect(services.auth.login).toHaveBeenCalledWith(
        credentials,
        isSessionSaved
      )
      expect(dispatch).toHaveBeenCalledWith(authLoginRejected(error))
      expect(router.navigate).not.toHaveBeenCalled()
    })

    test('should login resolve successfully', async () => {
      services.auth.login = jest.fn().mockResolvedValue()
      await action(dispatch, getState, { services, router })
      expect(dispatch).toHaveBeenCalledTimes(2)
      expect(dispatch).toHaveBeenCalledWith(authLoginPending())
      expect(services.auth.login).toHaveBeenCalledWith(
        credentials,
        isSessionSaved
      )
      expect(dispatch).toHaveBeenCalledWith(
        authLoginFulfilled({ type: 'success', message: 'LOGIN SUCCESSFUL' })
      )
      expect(router.navigate).toHaveBeenCalledWith(redirect, { replace: true })
    })
  })
})

describe('adverts', () => {
  test('should return an action with type ADVERTS_GET_PENDING', () => {
    const expectedAction = {
      type: ADVERTS_GET_PENDING,
    }
    expect(advertsPending()).toEqual(expectedAction)
  })

  test('should return an action with type ADVERTS_GET_FULFILLED', () => {
    const adverts = [1, 2, 3]
    const expectedAction = {
      type: ADVERTS_GET_FULFILLED,
      payload: adverts,
      adverts: {
        maxPrice: 0,
      },
    }
    const action = advertsFulfilled(adverts)
    expect(action).toEqual(expectedAction)
  })

  test('should return an action with type ADVERTS_GET_REJECTED', () => {
    const error = {
      type: 'error',
      message: 'error',
    }
    const expectedAction = {
      type: ADVERTS_GET_REJECTED,
      payload: error,
      notification: {
        type: 'error',
        message: 'error',
      }
    }
    const action = advertsRejected(error)
    expect(action).toEqual(expectedAction)  
  })
})

describe('createAdvert', () => {
  test('should return an action with type ADVERTS_POST_PENDING', () => {
    const expectedAction = {
      type: ADVERTS_POST_PENDING,
    }
    expect(advertPostPending()).toEqual(expectedAction)
  })

  test('should return an action with type ADVERTS_POST_FULFILLED', () => {
    const advert = {}
    const notification = {
      type: 'success',
      message: 'Advert created successfully',
    }
    const expectedAction = {
      type: ADVERTS_POST_FULFILLED,
      payload: advert,
      notification: {
        type: 'success',
        message: 'Advert created successfully',
      },
    }
    const action = advertPostFulfilled(advert, notification)
    expect(action).toEqual(expectedAction)
  })

  test('should return an action with type ADVERTS_POST_REJECTED', () => {
    const error = {
      type: 'error',
      message: 'error',
    }
    const expectedAction = {
      type: ADVERTS_POST_REJECTED,
      payload: error,
      notification: {
        type: 'error',
        message: 'error',
      },
    }
    const action = advertPostRejected(error)
    expect(action).toEqual(expectedAction)
  })
})
