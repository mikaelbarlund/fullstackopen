const reducer = (state = { token:null, user:{} }, action) => {
  switch (action.type) {
  case 'SET_TOKEN':
    return { ...state, token:action.data }
  case 'SET_USER':
    return { ...state, user:action.data }
  default: return state
  }
}

export const setToken = (token) => {
  return async dispatch => {
    dispatch({
      type: 'SET_TOKEN',
      data: token,
    })
  }
}
export const setUser = (user) => {
  return async dispatch => {
    dispatch({
      type: 'SET_USER',
      data: user,
    })
    dispatch({
      type: 'SET_TOKEN',
      data: user.token,
    })
  }
}

export default reducer