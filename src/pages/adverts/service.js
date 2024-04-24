import { client, setContentTypeMultipart } from '../../api/client.js'

const advertsUrl = '/api/v1/adverts'

const getAdverts = async () => {
  try {
    const response = await client.get(advertsUrl)
    return response
  } catch (error) {
    throw new Error(error.message)
  }
}

const getAdvert = async id => {
  try {
    const response = await client.get(`${advertsUrl}/${id}`)
    
    console.log(response)
    return response
  } catch (error) {
    throw new Error(error.message)
  }
}

const postAdvert = async(data) => {
  try {
    setContentTypeMultipart()
    const response = await client.post(advertsUrl, data)
    return response
  } catch (error) {
    throw new Error(error.message)
  }
}

const dataAdvert = { getAdverts, getAdvert, postAdvert }
export default dataAdvert
