import { client } from '../../api/client.js';

const advertsUrl = '/api/v1/adverts'

const getAdverts = async() => {
  try {

    const response = await client.get(advertsUrl);
    console.log(response);
    return response;
  } catch (error) {

    if (error.response) {
      // El servidor respondió con un código de estado fuera del rango 2xx
      console.error("Error response:", error.response.status);
      console.error("Error response data:", error.response.data);
      console.error("Error response headers:", error.response.headers);
    } else if (error.request) {
      // La petición fue hecha pero no se recibió respuesta
      console.error("Error request:", error.request);
    } else {
      // Algo ocurrió al configurar la petición que disparó un error
      console.error("Error message:", error.message);
    }
    console.error("Error config:", error.config);
    // Podrías devolver un valor predeterminado o relanzar el error
    throw error;
  }
}


export default getAdverts