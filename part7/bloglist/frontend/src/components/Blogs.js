import React from 'react'
import { Table } from 'react-bootstrap'
import Blog from './Blog'
import { useSelector } from 'react-redux'

const Blogs = () => {
  const blogs = useSelector(state => state.blogs)

  return (
    <>
      <Table hover>
        <tbody>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog}  />
          )}
        </tbody>
      </Table>
    </>)
}

export default Blogs