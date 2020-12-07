import React, { useState } from 'react'
const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = async (event) => {
    event.preventDefault()


    createBlog({
      title: title,
      author: author,
      url: url
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form className="blogForm" onSubmit={addBlog}>
      <div>title:
        <input
          type="text"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
          name="title"
          id="title"
        />
      </div>
      <div>author:
        <input
          type="text"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
          name="author"
          id="author"
        />
      </div>
      <div>url:
        <input
          type="text"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
          name="url"
          id="url"
        />
      </div>
      <button id="create-blog" type="submit">create</button>
    </form>
  )
}
export default BlogForm