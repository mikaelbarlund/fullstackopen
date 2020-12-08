const reducer = (state = { type: null, text: null, id: null }, action) => {
  switch (action.type) {
  case 'SHOW':
    return action.data
  case 'HIDE':
    if (action.data.id === state.id) return action.data
    else return state
  default: return state
  }
}

export const showNotification = (notification, error) => {
  return async dispatch => {
    const timeoutId = setTimeout(() => dispatch({
      type: 'HIDE',
      data: { type: null, text: null, id: timeoutId }
    }), 3000)
    dispatch({
      type: 'SHOW',
      data: { type: error ? 'error' : 'notification', text: notification, id: timeoutId }
    })

  }
}
export default reducer