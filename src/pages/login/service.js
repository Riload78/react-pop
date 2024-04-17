import { client, setAuthorizationHeader } from '../../api/client.js'

const login = async credentials => {
  console.log(credentials)
  try {
    const response = await client.post('/api/auth/login', credentials)
    const token = response.accessToken
    setAuthorizationHeader(token)
    return token
  } catch (error) {
    throw new Error(error.message)
  }
}

export default login
