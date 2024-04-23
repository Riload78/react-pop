import { client } from '../../api/client.js';

const advertsUrl = '/api/v1/adverts'

const getAdverts = async() => {
  try {
    const response = await client.get(advertsUrl);
    return response;
  } catch (error) {
    throw new error(error.message);
  }
}


export default getAdverts