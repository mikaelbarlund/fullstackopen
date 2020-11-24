import React from 'react'
import { connect } from 'react-redux'
import { create } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
    const add = async (event) => {
        event.preventDefault()
        const anecdote = event.target.anecdote.value
        event.target.anecdote.value = ''
        props.create(anecdote)
        props.setNotification(`you added '${anecdote}'`, 3)
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

const mapDispatchToProps = {
    create,
    setNotification
}

const ConnectedAnecdoteList = connect(
    null,
    mapDispatchToProps
)(AnecdoteForm)
export default ConnectedAnecdoteList