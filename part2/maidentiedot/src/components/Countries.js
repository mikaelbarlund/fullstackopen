import React from 'react'
import Country from './Country'

const Countires = ({ countries, filter, handleShowButton }) => {

    let filteredCoutries = countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase()))
    if (filteredCoutries.length === 1) {
        return (
            <Country country={filteredCoutries[0]} />
        )
    }
    if (filteredCoutries.length <= 10) {
        return (
            <>
                {filteredCoutries.map(country => <div key={country.name} >{country.name} <button onClick={() => handleShowButton(country.name)}>show</button></div>)}
            </>
        )
    }
    return (<div>Too many matches, specify another filter</div>)
}


export default Countires