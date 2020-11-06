import React from 'react'

const Country = ({ country }) => {
    return (
        <>
            <h2>{country.name}</h2>
            <div>capital {country.capital}</div>
            <div>population {country.population}</div>
            <h3>languages</h3>
            <ul>
                {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
            </ul>
            <img src={country.flag} width="400px" />
        </>
    )
}
export default Country