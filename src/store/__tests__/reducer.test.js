import { authLoginFulfilled } from "../actions";
import { auth, defaultState } from "../reducers";
describe('reducer', () => {
    describe('auth', () => {
       test('should manage AUTH_LOGIN_FULFILLED', () => {
         const state = defaultState.auth
         const action = authLoginFulfilled(state)
         const expectreduce = true
         expect(auth(state, action)).toEqual(expectreduce)
       })
    })
})