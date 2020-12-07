import React, { useState } from 'react'

const Blog = ({ blog, like, remove }) => {
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
        {blog.title} {blog.author} <button onClick={toggleDetails}>show</button>
      </div>
    </>
  )
  else return (
    <>
      <div className="detailedblog" style={blogStyle}>
        <div>{blog.title} <button onClick={toggleDetails}>hide</button> </div>
        <div>{blog.url}</div>
        <div>likes {blog.likes}<button onClick={like}>like</button></div>
        <div>{blog.author}</div>
        <button onClick={remove}>remove</button>
      </div>
    </>
  )
}

export default Blog
