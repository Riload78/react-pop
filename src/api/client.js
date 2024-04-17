import axios from 'axios'

export const client = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL
})

client.interceptors.response.use(response => response.data)

/* export const setAuthorizationHeader = token => {
  client.defaults.headers.common['Authorization'] = `Bearer ${token}`
  return client.defaults.headers.common['Authorization']
} */

export const setAuthorizationHeader = token => {
  return {
    headers: {
      Authorization: `Bearer ${token}`, // Aquí se utiliza el esquema Bearer, común para tokens JWT
    },
  }
}
