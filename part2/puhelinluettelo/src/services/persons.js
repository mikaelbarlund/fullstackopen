import axios from 'axios'
const personApi = '/api/persons'

const getAll = () => {
  const request = axios.get(personApi)
  return request.then(response => response.data)
}

const create = newObject => {
  const request = axios.post(personApi, newObject)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${personApi}/${id}`, newObject)
  return request.then(response => response.data)
}

const remove = (id) => {
  const request = axios.delete(`${personApi}/${id}`)
  return request.then(response => response.data)
}
const persons = { getAll, create, update, remove }
export default persons