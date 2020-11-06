import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Country = ({ country }) => {
    const api_key = process.env.REACT_APP_API_KEY
    const [weather, setWeather] = useState({ current: { weather_icons: [], weather_descriptions: [] } })
    const url = `http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`
    console.log(url)
    useEffect(() => {
        axios
            .get(url)
            .then(response => {
                setWeather(response.data)
            })
    }, [])
    return (
        <>
            <h2>{country.name}</h2>
            <div>capital {country.capital}</div>
            <div>population {country.population}</div>
            <h3>languages</h3>
            <ul>
                {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
            </ul>
            <img alt="country flag" src={country.flag} width="250px" />
            <h3>Weather in {country.capital}</h3>
            <div><b>temperature:</b> {weather.current.temperature} Celsius</div>
            <img alt={weather.current.weather_descriptions[0]} src={weather.current.weather_icons[0]} width="100px" />
            <div><b>wind:</b> {weather.current.wind_speed} mph direction {weather.current.wind_dir} </div>
        </>
    )
}
export default Country
