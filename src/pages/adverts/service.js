import { client } from '../../api/client.js'

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

const dataAdvert = { getAdverts, getAdvert }
export default dataAdvert
