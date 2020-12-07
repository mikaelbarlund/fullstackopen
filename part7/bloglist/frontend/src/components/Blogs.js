import React from 'react'
import Blog from './Blog'
import blogService from '../services/blogs'
import { useDispatch } from 'react-redux'
import { showNotification } from '../reducers/notificationReducer'
const Blogs = ({ blogs, setBlogs }) => {
  const dispatch = useDispatch()
  const like = async (blog) => {
    try {
      await blogService.update(blog.id, { ...blog, user: blog.user.id, likes: blog.likes + 1 })
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    } catch (exception) {
      dispatch(showNotification('cannot like blog', true))
    }
  }
  const remove = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title}`))
      try {
        await blogService.remove(blog.id)
        const blogs = await blogService.getAll()
        setBlogs(blogs)
        dispatch((showNotification(`removed ${blog.title}`, false)))
      } catch (exception) {
        dispatch(showNotification('cannot remove blog', true))
      }
  }

  return (
    <>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} like={() => like(blog)} remove={() => remove(blog)} />
      )}
    </>)
}

export default Blogs