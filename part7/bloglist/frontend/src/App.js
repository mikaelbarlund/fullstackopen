import React, { useEffect } from 'react'
import Menu from './components/Menu'
import Blogs from './components/Blogs'

import BlogForm from './components/BlogForm'
import Users from './components/Users'
import User from './components/User'
import BlogView from './components/BlogView'
import Notification from './components/Notification'

import { useDispatch, useSelector } from 'react-redux'

import { initializeBlogs } from './reducers/blogsReducer'
import { initializeUsers } from './reducers/usersReducer'

import { Switch, Route, useRouteMatch } from 'react-router-dom'
import Login from './components/Login'

import { setUser } from './reducers/loginReducer'
const App = () => {
  const dispatch = useDispatch()
  const login = useSelector(state => state.login)
  const user = useRouteMatch('/users/:id')
  const blog = useRouteMatch('/blogs/:id')

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
    }
  }, [dispatch])
  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [dispatch])


  const loggedContent = () => {

    return(
      <><Switch>
        <Route path="/users/:id">
          <User match={user} />
        </Route>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/blogs/:id">
          <BlogView match={blog} />
        </Route>
        <Route path="/">
          <BlogForm />
          <Blogs/>
        </Route></Switch>
      </>
    )
  }

  return (
    <div className="container">
      <Menu />
      <Notification />

      {login.token ?
        loggedContent() :

        <Login />


      }

      <div>blogs app, Mikael Bärlund, mooc fullstackopen 2020
      </div>

    </div>
  )
}

export default App