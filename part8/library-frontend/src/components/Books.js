import React, { useState, useEffect } from 'react'
import { useLazyQuery } from '@apollo/client'

import { ALL_BOOKS } from '../queries'
const Books = ({ show, recommendation }) => {
  const [genre, setGenre] = useState(undefined)
  const [getAllBooks, allBooks] = useLazyQuery(ALL_BOOKS, { variables: { genre: genre } })
  useEffect(() => {
    if (show && recommendation) {
      setGenre(recommendation)
      console.log('useEffect rec', recommendation, show)
    }
  }, [recommendation, show])

  useEffect(() => {

    if (show) {
      getAllBooks()
      console.log('useEffect genr', genre, show)
    }
  }, [getAllBooks, genre, show])

  if (!show || allBooks.loading || !allBooks.called) {
    return null
  }


  const books = allBooks.data.allBooks


  const genres = books.reduce((a, c) => [...a].concat(c.genres), []).filter((value, index, self) => self.indexOf(value) === index)

  return (
    <div>
      <h2>{recommendation ? 'recommendations' : 'books'}</h2>
      { recommendation ? <div>in your favourite genre <b>{genre}</b></div> : genre ? <div>in genre <b>{genre}</b></div> : null}
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
      <div>{
        genres.map(g => <button key={g} onClick={() => setGenre(g)}>{g}</button>)}
        <button onClick={() => setGenre()}>all genres</button>
      </div>
    </div>
  )
}

export default Books