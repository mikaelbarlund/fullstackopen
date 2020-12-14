import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from '../reducers/loginReducer'
import { Navbar, Nav } from 'react-bootstrap'

import { Link } from 'react-router-dom'



const Menu = () => {
  const dispatch = useDispatch()
  const login = useSelector(state => state.login)



  const handleLogout = async () => {
    window.localStorage.clear()
    dispatch( setUser({}))
  }





  return (
    <>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand as={Link} to="/">blogs</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Nav>
          <Nav.Link as={Link} to='/users' >users</Nav.Link>
        </Nav>
        <Navbar.Collapse className="justify-content-end">
          {login.token ?
            <Nav.Link onClick={handleLogout}>logout</Nav.Link>
            :
            <Nav.Link as={Link} to='/login' >login</Nav.Link>
          }
        </Navbar.Collapse>
      </Navbar>
    </>

  )
}

export default Menu