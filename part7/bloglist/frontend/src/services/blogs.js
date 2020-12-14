import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data.sort((a, b) => a.likes > b.likes ? -1 : 1)
}

const create = async (token, newObject) => {
  const config = {
    headers: { Authorization: `bearer ${token}` },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async(token, id, newObject) => {
  const config = {
    headers: { Authorization: `bearer ${token}` },
  }
  const response =await axios.put(`${baseUrl}/${id}`, newObject, config)
  return response.data
}

const addComment = async(token, id, newObject) => {
  const config = {
    headers: { Authorization: `bearer ${token}` },
  }
  const response =await axios.post(`${baseUrl}/${id}/comments`, newObject, config)
  return response.data
}

const remove = async(token, id) => {
  const config = {
    headers: { Authorization: `bearer ${token}` },
  }
  const response =await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}
export default { getAll, create, update, remove, addComment }
