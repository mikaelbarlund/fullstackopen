import React from 'react'
import { connect } from 'react-redux'
import { like } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
    const vote = (anecdote) => {
        props.like(anecdote)
        props.setNotification(`you voted '${anecdote.content}'`, 3)
    }

    return (
        <>
            {props.anecdotes.map(anecdote =>
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

const mapStateToProps = (state) => {
    return {
        anecdotes: state.anecdotes.filter(a => a.content.includes(state.filter)).sort((a, b) => a.votes < b.votes ? 1 : -1)
    }
}
const mapDispatchToProps = {
    like,
    setNotification,
}

const ConnectedAnecdoteList = connect(
    mapStateToProps,
    mapDispatchToProps
)(AnecdoteList)
export default ConnectedAnecdoteList