
import React, { useState } from 'react'
import { useQuery } from '@apollo/client'

import { ALL_AUTHORS, ALL_BOOKS } from './queries'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'

const App = () => {
  const [page, setPage] = useState('authors')
  const authors = useQuery(ALL_AUTHORS)
  const books = useQuery(ALL_BOOKS)

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>
      <Authors
        show={page === 'authors'}
        authors={authors.loading ? [] : authors.data.allAuthors}
      />
      <Books
        show={page === 'books'}
        books={books.loading ? [] : books.data.allBooks}
      />
      <NewBook
        show={page === 'add'}
      />
    </div>
  )
}

export default App