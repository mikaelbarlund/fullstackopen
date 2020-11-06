import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', id: 0 }
  ]) 
  const [ newName, setNewName ] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.map(a=>a.name).filter(a=>a===newName).length>0){
    alert(`${newName} is already added to phonebook`)
    } else {
    const personObject = {
      name: newName,
      id: persons.length,
    }
    setPersons(persons.concat(personObject))
    setNewName('')
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          <button type="submit" >add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person=><li key={person.name}>{person.name}</li>)}
      </ul>
      
    </div>
  )

}

export default App