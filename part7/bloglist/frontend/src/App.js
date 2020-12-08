import React, { useEffect, useRef } from 'react'
import Blogs from './components/Blogs'
import Login from './components/Login'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import Users from './components/Users'
import User from './components/User'
import BlogView from './components/BlogView'
import Notification from './components/Notification'

import loginService from './services/login'
import { useDispatch, useSelector } from 'react-redux'

import { showNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogsReducer'
import { initializeUsers } from './reducers/usersReducer'
import { setUser } from './reducers/loginReducer'
import { Switch, Route, Link, useRouteMatch } from 'react-router-dom'

const App = () => {
  const dispatch = useDispatch()
  const blogFormRef = useRef()
  const login = useSelector(state => state.login)
  const user = useRouteMatch('/users/:id')
  const blog = useRouteMatch('/blogs/:id')


  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
    }
  }, [dispatch])

  const handleLogin = async (login) => {
    try {
      const user = await loginService.login(login)
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      dispatch( setUser(user))
      dispatch(showNotification(`${user.name} logged in`, false))
    } catch (exception) {
      dispatch(showNotification('wrong credentials', true))
    }
  }

  const handleLogout = async () => {
    window.localStorage.clear()
    dispatch( setUser({}))
  }

  const loginForm = () => (
    <Togglable buttonLabel='login'>
      <Login
        handleLogin={handleLogin}
      />
    </Togglable >
  )
  const loggedContent = () => {

    return(
      <>
        <p>{login.user.name} logged in <button onClick={handleLogout}>logout</button></p>
        <Switch>
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
            <Togglable buttonLabel="create new blog" ref={blogFormRef}>
              <h2>create new</h2>
              <BlogForm />
            </Togglable>
            <Blogs />
          </Route>
        </Switch>

      </>
    )
  }

  return (
    <div className="container">
      <h1><Link to={'/blogs'}>blogs</Link></h1>
      <Notification />
      {login.token ?
        loggedContent() :
        loginForm()
      }
      <div>blogs app, Mikael Bärlund, mooc fullstackopen 2020
      </div>
    </div>
  )
}

export default App