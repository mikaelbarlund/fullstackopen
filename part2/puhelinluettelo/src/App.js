import React, { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
const personApi = '/api/persons'
const App = () => {
  const [persons, setPersons] = useState([])
  const [filter, setFilter] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [notification, setNotification] = useState({ type: 'error', text: null })
  const handleFilterChange = (event) => setFilter(event.target.value)
  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const showNotification = (message, error) => {
    setNotification({ type: error ? 'error' : 'notification', text: message })
    setTimeout(() => {
      setNotification({ ...notification, text: null })
    }, 3000)
  }

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
            showNotification(`Updated ${returnedPerson.name}`)
          }).catch(error => {
            setPersons(persons.filter(n => n.id !== findPerson.id))
            showNotification(`Information of ${newName} has already been removed from server`, true)
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
          showNotification(`Added ${returnedPerson.name}`)
        })
    }
  }

  const deleteHandler = id => {
    if (window.confirm(`Delete ${persons.find(n => n.id === id).name}`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(n => n.id !== id))
          showNotification(`Deleted ${persons.find(n => n.id === id).name}`)
        }).catch(error => {
          setPersons(persons.filter(n => n.id !== id))
          showNotification(`Information of ${newName} has already been removed from server`, true)
        })
    }
  }

  useEffect(() => {
    axios
      .get(personApi)
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  return (
    <div>
      <h2>Phonebook!</h2>
      <Notification notification={notification} />
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h3>add new</h3>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h3>Numbers</h3>
      <Persons persons={persons} filter={filter} deleteHandler={deleteHandler} />
    </div>
  )
}
export default App