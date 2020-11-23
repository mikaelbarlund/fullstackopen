import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { like } from '../reducers/anecdoteReducer'
import { hide } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes.filter(a => a.content.includes(state.filter)).sort((a, b) => a.votes < b.votes ? 1 : -1))
    const filter = useSelector(state => state.filter)
    const dispatch = useDispatch()

    const vote = (id) => {
        console.log('vote', id)
        dispatch(like(id))
        setTimeout(() => dispatch(hide()), 5000)
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