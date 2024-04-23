import { client, removeAuthorizationHeader, setAuthorizationHeader } from '../../api/client.js'
import storage from '../../helper/storage.js'

const loginUrl = '/api/auth/login'

const login = async (credentials, isSave) => {
  try {
    // Ejecutar la petición POST y esperar la respuesta
    const response = await client.post(loginUrl, credentials)

    // Extraer el accessToken de la respuesta
    const { accessToken } = response

    // Establecer el header de autorización con el token recibido
    setAuthorizationHeader(accessToken)

    // Si se debe guardar la sesión, almacenar el accessToken en el almacenamiento local
    if (isSave) {
      storage.set('auth', accessToken)
    }
  } catch (error) {
    // Manejar errores que podrían surgir durante la petición
    throw new Error(error.message) // Re-lanza el error para manejarlo más arriba en la cadena de llamadas si es necesario
  }
}

const logout = () => {
  removeAuthorizationHeader()
  storage.remove('auth')
}
const auth = { login, logout }
export default auth