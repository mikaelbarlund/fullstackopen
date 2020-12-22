
import React, { useState, useEffect } from 'react'
import { useQuery, useApolloClient } from '@apollo/client'

import { ME, ALL_AUTHORS } from './queries'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'

const App = () => {
  const [token, setToken] = useState(null)
  const [login, setLogin] = useState(false)
  const [page, setPage] = useState('authors')
  const authors = useQuery(ALL_AUTHORS)
  const me = useQuery(ME)

  const client = useApolloClient()
  useEffect(() => {
    const storedToken = localStorage.getItem('library-user-token')
    if (storedToken) {
      setToken(storedToken)
    }
  }, [])


  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }
  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token ? <button onClick={() => setPage('recommendations')}>recommendations</button> : null}
        {token ? <button onClick={() => setPage('add')}>add book</button> : null}
        {token ? <button onClick={() => logout()}>logout</button> : null}
        {!token ? <button onClick={() => setLogin(!login)}>login</button> : null}
      </div>
      {!token && login ? <LoginForm setToken={setToken} /> : <div />}
      <Authors
        show={page === 'authors'}
        authors={authors.loading ? [] : authors.data.allAuthors}
      />
      <Books
        show={page === 'books'}
      />
      <Books
        show={page === 'recommendations'}
        recommendation={!me.loading ? me.data.me.favoriteGenre : undefined}
      />
      <NewBook
        show={page === 'add'}
      />
    </div >
  )
}

export default App