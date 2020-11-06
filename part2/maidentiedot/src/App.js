import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Countries from './components/Countries'

function App() {
  const [countries, setContries] = useState([])
  const [filter, setFilter] = useState('')
  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setContries(response.data)
      })
  }, [])
  const handleFilterChange = (event) => setFilter(event.target.value)
  const handleShowButton = (value) => setFilter(value)
  return (
    <>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <Countries countries={countries} filter={filter} handleShowButton={handleShowButton} />
    </>
  );
}

export default App;
