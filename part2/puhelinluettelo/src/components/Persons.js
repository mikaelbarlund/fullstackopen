import React from 'react'
import Person from './Person'

const Persons = ({ persons, filter, deleteHandler }) => {
    return (
        <ul>
            {persons.filter(person => person.name.includes(filter)).map(person => <Person key={person.name} person={person} deleteHandler={deleteHandler} />)}
        </ul>
    )
}
export default Persons