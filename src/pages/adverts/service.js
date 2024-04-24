import { client } from '../../api/client.js';

const advertsUrl = '/api/v1/adverts'

export const getAdverts = async() => {
  try {
    const response = await client.get(advertsUrl);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}

export const getAdvert = async(id) => {
  try {
    const response = await client.get(`${advertsUrl}/${id}`);
    console.log(response);
    return response;
  } catch (error) {
    throw new Error(error.message)
  }
}

