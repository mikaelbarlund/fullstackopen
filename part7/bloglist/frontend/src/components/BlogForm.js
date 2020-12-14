import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogsReducer'
import { Form , Button, Modal } from 'react-bootstrap'
const BlogForm = () => {
  const dispatch = useDispatch()
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const addBlog = async () => {
    handleClose()
    dispatch(createBlog({
      title: title,
      author: author,
      url: url
    }))
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <><Button variant="outline-primary" id="create-new-blog-button" onClick={handleShow}>
    create new
    </Button>
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>create new blog</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Control size="lg" type="text" placeholder="Title" value={title}
              onChange={({ target }) => setTitle(target.value)}
              name="title"
              id="title"/>
            <br />
            <Form.Control type="text" placeholder="Author" value={author}
              onChange={({ target }) => setAuthor(target.value)}
              name="author"
              id="author"/>
            <br />
            <Form.Control type="text" placeholder="Url"  value={url}
              onChange={({ target }) => setUrl(target.value)}
              name="url"
              id="url"/>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
            Close
        </Button>
        <Button variant="primary" id="save-blog-changes" onClick={addBlog}>
            Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
    </>
  )
}
export default BlogForm