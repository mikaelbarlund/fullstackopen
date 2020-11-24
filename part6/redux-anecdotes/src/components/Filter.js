import React from 'react'
import { connect } from 'react-redux'
import { filter } from '../reducers/filterReducer'

const Filter = (props) => {
    const handleChange = (value) => {
        console.log('filter', value)
        props.filter(value)
    }
    const style = {
        marginBottom: 10
    }

    return (
        <div style={style}>
            filter <input name="filter" onChange={e => handleChange(e.target.value)} />
        </div>
    )
}

const mapDispatchToProps = {
    filter,
}

const ConnectedAnecdoteList = connect(
    null,
    mapDispatchToProps
)(Filter)
export default ConnectedAnecdoteList
