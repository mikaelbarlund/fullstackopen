
import React, { useState, useEffect } from 'react'
import { useQuery, useLazyQuery, useSubscription, useApolloClient } from '@apollo/client'

import { ME, ALL_AUTHORS, BOOK_ADDED, ALL_BOOKS } from './queries'

import Authors from './components/Authors'
import Books from './components/Books'
import Recommendations from './components/Recommendations'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'

const App = () => {
  const [token, setToken] = useState(null)
  const [login, setLogin] = useState(false)
  const [page, setPage] = useState('authors')
  const authors = useQuery(ALL_AUTHORS)
  const [callMe, me] = useLazyQuery(ME)
  const client = useApolloClient()

  useEffect(() => {
    const storedToken = localStorage.getItem('library-user-token')
    if (storedToken) {
      setToken(storedToken)
      callMe()
    }
  }, [callMe])

  const updateCacheWith = (addedBook) => {
    const hasBook = (set, object) =>
      set.map(p => p.title).includes(object.title)

    const hasAuthor = (set, author) =>
      set.map(p => p.name).includes(author)

    addedBook.genres.forEach(g => {
      const oneGenre = client.readQuery({ query: ALL_BOOKS, variables: { genre: g } })
      if (oneGenre && !hasBook(oneGenre.allBooks, addedBook)) {
        client.writeQuery({
          query: ALL_BOOKS,
          variables: { genre: g },
          data: {
            ...oneGenre,
            allBooks: [...oneGenre.allBooks, addedBook]
          }
        })
      }

    })
    const allGenres = client.readQuery({ query: ALL_BOOKS })
    if (allGenres && !hasBook(allGenres.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: {
          ...allGenres,
          allBooks: [...allGenres.allBooks, addedBook]
        }
      })
    }
    const authorsInCache = client.readQuery({ query: ALL_AUTHORS })
    if (authorsInCache) {
      if (!hasAuthor(authorsInCache.allAuthors, addedBook.author.name)) {
        const author = { name: addedBook.author }
        client.writeQuery({
          query: ALL_AUTHORS,
          data: {
            ...authorsInCache,
            allAuthors: [...authorsInCache.allAuthors, author]
          }
        })
      } else {
        const author = authorsInCache.allAuthors.find(a => a.name === addedBook.author.name)
        client.writeQuery({
          query: ALL_AUTHORS,
          data: {
            ...authorsInCache,
            allAuthors: [...authorsInCache.allAuthors.filter(a => a.name !== author.name), { ...author, bookCount: author.bookCount + 1 }]
          }
        })
      }
    }
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded

      window.alert(`${addedBook.title} added`)
      updateCacheWith(addedBook)
    }
  })
  const logout = () => {
    setLogin(false)
    setToken(null)
    localStorage.clear()
    client.resetStore()

  }
  const doLogin = (token) => {
    setLogin(false)
    setToken(token)
    callMe()
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
      {!token && login ? <LoginForm doLogin={doLogin} /> : <div />}
      <Authors
        show={page === 'authors'}
        authors={authors.loading ? [] : authors.data.allAuthors}
      />
      <Books
        show={page === 'books'}
      />
      <Recommendations
        show={page === 'recommendations'}
        recommendation={me.called && !me.loading && me.data.me ? me.data.me.favoriteGenre : undefined}
      />
      <NewBook
        show={page === 'add'}
      />
    </div >
  )
}

export default App