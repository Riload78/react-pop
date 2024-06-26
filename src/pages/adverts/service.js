import { client, setContentTypeMultipart } from '../../api/client.js'

const advertsUrl = '/api/v1/adverts'
const tagsUrl = '/api/v1/adverts/tags'

const getAdverts = async () => {
  try {
    const response = await client.get(advertsUrl)
    return response
  } catch (error) {
    throw new Error(error.message)
  }
}

const getAdvert = async (id) => {
  try {
    const response = await client.get(`${advertsUrl}/${id}`)
    return response
  } catch (error) {
    throw new Error(error.message)
  }
}

const getTags = async() => {
  try {
    const response = await client.get(tagsUrl)
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

const deleteAdvert = async(id) => {
  try {
    const response  = await client.delete(`${advertsUrl}/${id}`)
    return response
  } catch (error) {
    throw new Error (error.message)
  }
}


const dataAdvert = { getAdverts, getAdvert, getTags, postAdvert, deleteAdvert }
export default dataAdvert
