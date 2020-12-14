import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import loginService from '../services/login'
import {  useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { setUser } from '../reducers/loginReducer'
import { showNotification } from '../reducers/notificationReducer'
import { Form } from 'react-bootstrap'

const Login = () => {
  const dispatch = useDispatch()
  let history = useHistory()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')



  const handleLogin = async (login) => {
    try {
      const user = await loginService.login(login)
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      dispatch( setUser(user))
      dispatch(showNotification(`${user.name} logged in`, false))
      history.push('/')
    } catch (exception) {
      dispatch(showNotification('wrong credentials', true))
    }
  }
  const doLogin = async (event) => {
    event.preventDefault()
    setUsername('')
    setPassword('')
    handleLogin({
      username, password,
    })
  }
  return (
    <>
      <h2>log in to application</h2>
      <Form inline onSubmit={doLogin}>
        <Form.Group controlId="formLoginUsername" >
          <Form.Label>username</Form.Label>
          <Form.Control
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formLoginPassword">
          <Form.Label>password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </Form.Group>
        <Button variant="outline-primary" id="login-button" type="submit">login</Button>
      </Form>
    </>
  )
}

export default Login