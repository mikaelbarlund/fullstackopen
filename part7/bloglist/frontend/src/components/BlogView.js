import React, { useState } from 'react'
import { Form, Table, Button, ListGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { likeBlog, commentBlog } from '../reducers/blogsReducer'

const BlogView = ({ match }) => {
  const dispatch = useDispatch()
  const blog = useSelector(state => state.blogs).find(a => String(a.id)===String(match.params.id))
  const [comment, setComment] = useState('')
  if (!blog) {
    return null
  }
  const doAddComment = async (event) => {
    event.preventDefault()
    if(comment){
      setComment('')
      dispatch( commentBlog(blog, comment))
    }
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
              <Button variant="outline-primary" onClick={() => dispatch(likeBlog(blog))}>like</Button>
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

      <h3>comments</h3>
      <Form inline onSubmit={doAddComment}>
        <Form.Group controlId="formLoginUsername" >
          <Form.Control
            type="text"
            value={comment}
            name="Comment"
            onChange={({ target }) => setComment(target.value)}
          />
        </Form.Group>
        <Button variant="outline-primary" id="comment-button" type="submit">add comment</Button>
      </Form>
      <ListGroup>
        {blog.comments.map((comment, i) =>
          <ListGroup.Item key={i}>{comment}</ListGroup.Item>
        )
        }
      </ListGroup>


    </>
  )
}

export default BlogView