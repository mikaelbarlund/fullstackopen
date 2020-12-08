import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { likeBlog, removeBlog } from '../reducers/blogsReducer'
import { Link } from 'react-router-dom'
const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const [details, setDetails] = useState(false)

  const blogStyle = {
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px'
  }

  const toggleDetails = async () => {
    setDetails(!details)
  }


  if (!details) return (
    <>
      <div className="blog" style={blogStyle}>
        <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link> <button onClick={toggleDetails}>show</button>
      </div>
    </>
  )
  else return (
    <>
      <div className="detailedblog" style={blogStyle}>
        <div><Link to={`/blogs/${blog.id}`}>{blog.title}</Link> <button onClick={toggleDetails}>hide</button> </div>
        <div>{blog.url}</div>
        <div>likes {blog.likes}<button onClick={() => dispatch(likeBlog(blog))}>like</button></div>
        <div>{blog.author}</div>
        <button onClick={() => dispatch(removeBlog(blog))}>remove</button>
      </div>
    </>
  )
}

export default Blog
