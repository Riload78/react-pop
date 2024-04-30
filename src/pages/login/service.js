import {
  client,
  removeAuthorizationHeader,
  setAuthorizationHeader,
} from '../../api/client.js'
import storage from '../../helper/storage.js'

const loginUrl = '/api/auth/login'

const login = async (credentials, isSave) => {
  try {
    const response = await client.post(loginUrl, credentials)
    const { accessToken } = response
    setAuthorizationHeader(accessToken)

    if (isSave) {
      storage.set('auth', accessToken)
    }
  } catch (error) {
    throw new Error(error.message)
  }
}

const logout = () => {
  removeAuthorizationHeader()
  storage.remove('auth')
}

const getUserInfo = async () => {
  try {
    const response = await client.get('/api/auth/me')
    return response
  } catch (error) {
    throw new Error(error.message)
  }
}

const auth = { login, logout, getUserInfo }
export default auth
