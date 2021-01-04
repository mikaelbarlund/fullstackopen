import React, { useState, useEffect } from 'react'
import { useQuery,useLazyQuery } from '@apollo/client'

import { ALL_BOOKS,ALL_GENRES } from '../queries'
const Books = ({ show }) => {
  const [genre, setGenre] = useState(undefined)
  const genres = useQuery(ALL_GENRES)
  const [getAllBooks, allBooks] = useLazyQuery(ALL_BOOKS, { variables: { genre: genre } })

  useEffect(() => {
    if (show) {
      getAllBooks()
    }
  }, [getAllBooks, show])

  if (!show || allBooks.loading || !allBooks.called) {
    return null
  }
  const books = allBooks.data.allBooks

  return (
    <div>
      <h2>books</h2>
      { genre ? <div>in genre <b>{genre}</b></div> : null}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <div>{genres.loading ? '' : genres.data.genres.map(g => <button key={g} onClick={() => setGenre(g)}>{g}</button>)}
        <button onClick={() => setGenre()}>all genres</button>
      </div>
    </div>
  )
}

export default Books