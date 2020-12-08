import React from 'react'
import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { likeBlog } from '../reducers/blogsReducer'
import { useSelector } from 'react-redux'

const BlogView = ({ match }) => {
  const dispatch = useDispatch()
  const blog = useSelector(state => state.blogs).find(a => String(a.id)===String(match.params.id))
  if (!blog) {
    return null
  }

  return (
    <>
      <h2>{blog.title} {blog.author}</h2>
      <Table>
        <tbody>
          <tr >
            <td colSpan="2">
              <a href={blog.url} traget="blank">
                {blog.url}
              </a>
            </td>
          </tr>
          <tr>
            <td>
              {blog.likes} likes
            </td>
            <td>
              <button onClick={() => dispatch(likeBlog(blog))}>like</button>
            </td>
          </tr>
          <tr >
            <td colSpan="2">
              <Link to={`/users/${blog.user.id}`}>
                  added by {blog.user.name}
              </Link>
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  )
}

export default BlogView