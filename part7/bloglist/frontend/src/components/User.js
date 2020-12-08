import React from 'react'
import { ListGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const User = ({ match }) => {
  const user = useSelector(state => state.users).find(a => String(a.id)===String(match.params.id))
  if (!user) {
    return null
  }
  console.log(match.params.id, user)
  return (
    <>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ListGroup>
        {user.blogs.map(blog => (
          <ListGroup.Item key={blog.id}><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></ListGroup.Item>
        ))
        }
      </ListGroup>
    </>
  )
}

export default User