import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  console.log('notification',notification,notification.content)
  const style = {
    display: (notification.content === null ? 'none' : 'block'),
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div style={style}>
      {notification.content}
    </div>
  )
}

export default Notification