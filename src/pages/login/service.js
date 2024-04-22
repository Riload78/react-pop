import { client, removeAuthorizationHeader, setAuthorizationHeader } from '../../api/client.js'
import storage from '../../helper/storage.js'

const loginUrl = '/api/auth/login'

const login = (credentials, isSave) => {
  return client.post(loginUrl, credentials).then(({ accessToken }) => {
    setAuthorizationHeader(accessToken)
    isSave && storage.set('auth', accessToken)
  })
}

const logout = () => {
  removeAuthorizationHeader()
  storage.remove('auth')
}
const auth = { login, logout }
export default auth