import React from 'react'
import { useDispatch } from 'react-redux'
import { create } from '../reducers/anecdoteReducer'
import { hide } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()
    const add = (event) => {
        event.preventDefault()
        console.log('create', event.target.anecdote.value)
        dispatch(create(event.target.anecdote.value))
        event.target.anecdote.value = ''
        setTimeout(() => dispatch(hide()), 5000)

    }

    return (
        <>
            <h2>create new</h2>
            <form onSubmit={add}>
                <div><input name="anecdote" /></div>
                <button >create</button>
            </form>
        </>
    )
}

export default AnecdoteForm
