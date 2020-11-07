import React, { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [filter, setFilter] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleFilterChange = (event) => setFilter(event.target.value)
  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    let findPersons = persons.filter(n => n.name === newName)
    if (findPersons.length > 0) {
      let findPerson = findPersons[0]
      if (window.confirm(`${findPerson.name} is already added to phonebook, replace the old number with a new one?`)) {
        personService
          .update(findPerson.id, { ...findPerson, number: newNumber })
          .then((returnedPerson) => {
            setPersons(persons.filter(n => n.id !== findPerson.id).concat(returnedPerson))
            setNewName('')
            setNewNumber('')
          })
      }

    } else {
      const personObject = {
        name: newName,
        number: newNumber
      }
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const deleteHandler = id => {
    console.log(id)
    if (window.confirm(`Delete ${persons.find(n => n.id === id).name}`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(n => n.id !== id))
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h3>add new</h3>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h3>Numbers</h3>
      <Persons persons={persons} filter={filter} deleteHandler={deleteHandler} />
    </div>
  )
}
export default App