
import { useState, useEffect } from 'react'
import axios from 'axios'

export const useResource = (baseUrl) => {
    const [resources, setResources] = useState([])

    useEffect(() => {
        axios
          .get(baseUrl)
          .then(response => {
            console.log(response.data)
            setResources(response.data)
          }).catch(e => {
            console.log(e)
          })
      }
        , [baseUrl])

    const create = async (resource) => {
        console.log(resource)
        const response = await axios.post(baseUrl, resource)
        setResources([...resources,response.data])
    }

    const service = {
        create
    }

    return [
        resources, service
    ]
}