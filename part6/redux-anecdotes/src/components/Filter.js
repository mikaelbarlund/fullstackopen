import React from 'react'
import { useDispatch } from 'react-redux'
import { filter } from '../reducers/filterReducer'

const Filter = () => {
    const dispatch = useDispatch()
    const handleChange = (value) => {
        console.log('filter', value)
        dispatch(filter(value))
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

export default Filter
