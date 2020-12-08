import React from 'react'
import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Users = () => {
  const users = useSelector(state => state.users)
  return (
    <>
      <h2>users</h2>
      <Table striped>
        <tbody>
          {users.map(user =>
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>
                  {user.name}
                </Link>
              </td>
              <td>
                {user.blogs.length}
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </>
  )
}

export default Users