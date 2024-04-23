import { client } from '../../api/client.js';

const advertsUrl = '/api/v1/adverts'

const getAdverts = async() => {
  try {

    const response = await client.get(advertsUrl);
    // console.log(response);
    return response;
  } catch (error) {

    /* if (error.response) {
      // El servidor respondió con un código de estado fuera del rango 2xx
      console.error("Error response data:", error.response.data);
      console.error("Error response headers:", error.response.headers);
      return error.response.status;
    } */
    
    // Podrías devolver un valor predeterminado o relanzar el error
    throw new error(error.message);
  }
}


export default getAdverts