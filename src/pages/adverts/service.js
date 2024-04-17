import { client } from '../../api/client.js';

const advertsUrl = '/api/v1/adverts'

const getAdverts = async (token) => {
    try {
        const response = await client.get(advertsUrl, token);
        return response
        
    } catch (error) {
        throw new Error(error.message);
    }
}

export default getAdverts