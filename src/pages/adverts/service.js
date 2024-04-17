import { client, setAuthorizationHeader } from '../../api/client.js';

const advertsUrl = '/api/v1/adverts'

const getAdverts = async (token) => {
    try {
        debugger
        const response = await client.get(
          advertsUrl,
          setAuthorizationHeader(token)
        )
        console.log(response);
        return response
        
    } catch (error) {
        throw new Error(error.message);
    }
}

export default getAdverts