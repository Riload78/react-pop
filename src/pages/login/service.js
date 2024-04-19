import { client, setAuthorizationHeader } from '../../api/client.js'
import storage from '../../helper/storage.js'

const loginUrl = '/api/auth/login'

const login = credentials => {
  console.log(credentials)
  return client.post(loginUrl, credentials).then(({ accessToken }) => {
    setAuthorizationHeader(accessToken)
    storage.set('auth', accessToken)
  })
}

export default login
