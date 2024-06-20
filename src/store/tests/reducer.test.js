import {
  authLoginFulfilled,
  sessionSave,
  advertsFulfilled,
  advertsRejected,
  advertsPending,
  advertPostPending,
  advertPostFulfilled,
} from '../actions'
import { auth, defaultState, session, adverts } from '../reducers'
describe('reducer', () => {
  describe('auth', () => {
    test('should manage AUTH_LOGIN_FULFILLED', () => {
      const state = defaultState.auth
      const action = authLoginFulfilled(state)
      const expectreduce = true
      expect(auth(state, action)).toEqual(expectreduce)
    })
  })

  describe('session', () => {
    test('should return the initial state when undefined action', () => {
      const state = defaultState.session
      expect(session(state, {})).toBe(true)
    })

    test('should return the initial state when undefined state', () => {
      const state = undefined
      const action = {}
      expect(session(state, action)).toBe(true)
    })

    test('should manage SESSION_SAVE', () => {
      const state = defaultState.session
      const action = sessionSave(false)
      const expectreduce = false
      expect(session(state, action)).toEqual(expectreduce)
    })
  })

  describe('adverts', () => {
    test('should return the initial state when undefined state', () => {
      const initialState = defaultState.adverts
      expect(adverts(undefined, {})).toEqual(initialState)
    })

    test('should manage ADVERTS_GET_FULFILLED', () => {
      const state = defaultState.adverts
      const advertList = [{}]

      jest.spyOn(advertList, 'reduce').mockImplementation(() => 1000)

      const action = advertsFulfilled(advertList)
      const nextState = adverts(state, action)
      const expectreduce = {
        loaded: true,
        data: advertList,
        maxPrice: 1000,
        tags: [],
      }
      expect(nextState).toEqual(expectreduce)
    })
    test('should manage ADVERTS_GET_PENDING', () => {
      const state = defaultState.adverts
      const action = advertsPending()
      const expectreduce = {
        ...state,
        loaded: false,
      }
      expect(adverts(state, action)).toEqual(expectreduce)
    })

    test('should manage ADVERTS_GET_REJECTED', () => {
      const state = defaultState.adverts
      const error = {}
      const action = advertsRejected(error)
      const expectreduce = {
        ...state,
        loaded: false,
      }
      expect(adverts(state, action)).toEqual(expectreduce)
    })

    test('should manage ADVERTS_POST_PENDING', () => {
      const state = defaultState.adverts
      const action = advertPostPending()
      const expectreduce = {
        ...state,
        loaded: false,
      }
      expect(adverts(state, action)).toEqual(expectreduce)
    })
    test('should manage ADVERTS_POST_FULFILLED', () => {
      const state = defaultState.adverts
      const newAdvert = {}
      const notification = {}
      const action = advertPostFulfilled(newAdvert, notification)
      const nextState = adverts(state, action)

      const expectreduce = {
        ...state,
        loaded: true,
        data: [...state.data, newAdvert],
        maxPrice: 0,
      }
      expect(nextState).toEqual(expectreduce)
    })
  })
})

