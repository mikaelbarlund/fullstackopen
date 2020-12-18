
import React, { useState } from 'react'
import Select from 'react-select';
import { useMutation } from '@apollo/client'
import { EDIT_YEAR_OF_BIRTH, ALL_AUTHORS } from '../queries'

const Authors = (props) => {
  const [name, setName] = useState({})
  const [yearTo, setYearTo] = useState('')
  const [changeYearOfBirth] = useMutation(EDIT_YEAR_OF_BIRTH, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      console.log(error.graphQLErrors[0] ? error.graphQLErrors[0].message : error)
    }
  })

  if (!props.show) {
    return null
  }
  const authors = props.authors


  const submit = async (event) => {
    event.preventDefault()

    changeYearOfBirth({ variables: { name: name.value, setBornTo: parseInt(yearTo) } })

    setName('')
    setYearTo('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <div>
        <h2>Set birthyear</h2>

        <form onSubmit={submit}>
          <div>
            name
            <Select
              value={name}
              onChange={setName}
              options={authors.map(a => { return { value: a.name, label: a.name } })}
            />
          </div>
          <div>
            born <input
              value={yearTo}
              onChange={({ target }) => setYearTo(target.value)}
            />
          </div>
          <button type='submit'>update author</button>
        </form>
      </div>
    </div>
  )
}

export default Authors
