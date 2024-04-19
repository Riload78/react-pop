import { client } from '../../api/client.js';

const advertsUrl = '/api/v1/adverts'

const getAdverts = () => {
  return client.get(advertsUrl);
}


export default getAdverts