import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { likeBlog, removeBlog } from '../reducers/blogsReducer'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'
const Blog = ({ blog }) => {

  const dispatch = useDispatch()
  const [details, setDetails] = useState(false)

  const toggleDetails = async () => {
    setDetails(!details)
  }


  if (!details) return (
    <>
      <tr key={blog.id}>
        <td>
          <div className="blog"><Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link></div>
        </td>
        <td><Button variant="outline-primary" onClick={toggleDetails}>show</Button></td>
      </tr>
    </>
  )
  else return (
    <>
      <tr key={blog.id}>
        <td>
          <div className="blog"><Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link></div>
          <div>{blog.url}</div>
          <div>likes {blog.likes}</div>
          <div><Button variant="outline-primary" id="likeButton" onClick={() => dispatch(likeBlog(blog))}>like</Button><Button variant="outline-primary" onClick={() => dispatch(removeBlog(blog))}>remove</Button></div>
        </td>
        <td>  <Button variant="outline-primary" onClick={toggleDetails}>hide</Button>
        </td>
      </tr>
    </>
  )
}

export default Blog
