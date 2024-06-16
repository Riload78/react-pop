import { getIsLogin, getAdvertDetail } from '../selectors.js'
describe('selectors', () => {
    describe('getIsLogin', () => {
        test('should return the correct state', () => {
            const state = {
                auth: true
            }
            const expected = true
            const actual = getIsLogin(state)
            expect(actual).toEqual(expected)
        })
    })
    describe('getAdvertDetail', () => {
        test('should return the correct state', () => {
            const state = {
                adverts: {
                    data: [
                        {
                            id: 1
                        }
                    ]
                }
            }
            const expected = {
                id: 1
            }
            const actual = getAdvertDetail(1)(state)
            expect(actual).toEqual(expected)
        })
    })
})