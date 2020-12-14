import blogService from '../services/blogs'
import { showNotification } from '../reducers/notificationReducer'

const reducer = (state = [], action) => {
  switch (action.type) {
  case 'CREATE':
    return [...state, action.data]
  case 'EDIT':
    return [...state.filter(a => a.id !== action.data.id), { ...action.data }]
  case 'INIT_BLOGS':
    return action.data
  default: return state
  }
}

export const createBlog = (blog) => {
  return async (dispatch, getState) => {
    const newBlog = await blogService.create(getState().login.token,blog)
    dispatch({
      type: 'CREATE',
      data: newBlog
    })
    dispatch(showNotification(`created blog ${blog.title}`, false))
  }
}

export const commentBlog = (blog, comment) => {
  return async (dispatch, getState) => {
    try {
      await blogService.addComment(getState().login.token, blog.id, { comment:comment })
      const blogs = await blogService.getAll()
      dispatch({
        type: 'INIT_BLOGS',
        data: blogs,
      })
      dispatch(showNotification(`added comment ${comment}`, false))
    } catch (exception) {
      dispatch(showNotification(`cannot comment blog ${blog.title}`, true))
    }
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    })
  }
}

export const likeBlog =  (blog) => {
  return async (dispatch, getState) => {
    try {
      const newBlog =  { ...blog, user: blog.user.id, likes: blog.likes + 1 }
      await blogService.update(getState().login.token, newBlog.id, newBlog)
      const blogs = await blogService.getAll()
      dispatch({
        type: 'INIT_BLOGS',
        data: blogs,
      })
      dispatch(showNotification(`liked blog ${blog.title}`, false))
    } catch (exception) {
      dispatch(showNotification(`cannot like blog ${blog.title}`, true))
    }
  }
}

export const removeBlog =  (blog) => {
  return async (dispatch, getState) => {
    if (window.confirm(`Remove blog ${blog.title}`))
      try {
        await blogService.remove(getState().login.token,blog.id)
        const blogs = await blogService.getAll()
        dispatch({
          type: 'INIT_BLOGS',
          data: blogs,
        })
        dispatch((showNotification(`removed ${blog.title}`, false)))
      } catch (exception) {
        dispatch(showNotification('cannot remove blog', true))
      }
  }
}

export default reducer