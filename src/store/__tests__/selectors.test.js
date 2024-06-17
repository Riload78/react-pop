import { getIsLogin, getAdvertDetail, getAdverts } from '../selectors.js'
describe('selectors', () => {
  describe('Login', () => {
    const stateLogin = { auth: true }
    const stateLogout = { auth: false }

    test('should return getIsLogin state', () => {
      const state = stateLogin
      const expected = true
      const actual = getIsLogin(state)
      expect(actual).toEqual(expected)
    })
    test('should return getIsLogOut state', () => {
      const state = stateLogout
      const expected = false
      const actual = getIsLogin(state)
      expect(actual).toEqual(expected)
    })
  })
  describe('getAdvertDetail', () => {
    const advertId = 1
    const adverts = [{ id: advertId }]
    const state = {
      adverts: {
        data: adverts,
      },
    }
    test('should return the correct advert Detail state', () => {
      const expected = adverts[0]
      const actual = getAdvertDetail(advertId)(state)
      expect(actual).toEqual(expected)
    })

    test('should not return the incorrect advert Detail state', () => {
      const actual = getAdvertDetail(2)(state)
      expect(actual).toBeUndefined()
    })
  })
  describe('getAdverts', () => {
    const adverts = [{ id: 1 }]
    const state = {
      adverts: {
        data: adverts,
      },
    }
    test('should return the correct state', () => {
      const expected = {
        data: adverts,
      }

      const actual = getAdverts(state)
      expect(actual).toEqual(expected)
    })
  })
})
