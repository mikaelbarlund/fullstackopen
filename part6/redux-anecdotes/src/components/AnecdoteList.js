import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { like } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    
    const anecdotes = useSelector(state => {
        return state.anecdotes.filter(a => a.content.includes(state.filter)).sort((a, b) => a.votes < b.votes ? 1 : -1)
    })
    const dispatch = useDispatch()

    const vote = (anecdote) => {
        dispatch(like(anecdote))
        dispatch(setNotification(`you voted '${anecdote.content}'`, 3))
    }

    return (
        <>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </>
    )
}

export default AnecdoteList