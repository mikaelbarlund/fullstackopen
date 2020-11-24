import anecdoteService from '../services/anecdotes'

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_NOTES':
      return action.data

    case 'LIKE':
      return [...state.filter(a => a.id !== action.data.id), { ...action.data }]

    case 'CREATE':
      return [...state, action.data]

    default: return state

  }
}

export const like = (anecdote) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.edit({ ...anecdote, votes: anecdote.votes + 1 })
    dispatch({
      type: 'LIKE',
      data: newAnecdote
    })
  }
}

export const create = (anecdote) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(anecdote)
    console.log(newAnecdote)
    dispatch({
      type: 'CREATE',
      data: newAnecdote
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_NOTES',
      data: anecdotes,
    })
  }

}

export default reducer