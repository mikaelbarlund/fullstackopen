
import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({name}) =><h1>{name}</h1>

const Statistic = ({name, count}) => <p>{name} {count}</p>
const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Statistics = ({good, neutral, bad}) => {
  return (
    <>
      <Header name="statistics"/>
      <Statistic name="good" count={good}/>
      <Statistic name="neutral" count={neutral}/>
      <Statistic name="bad" count={bad}/>
    </>
  )
}
const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  const setToValue = newValue => {
    setGood(newValue)
  }
  return (
    <>
      <Header name="give feedback"/>
      <Button handleClick={() => setGood(good+1)} text = {"good"}/>
      <Button handleClick={() => setNeutral(neutral+1)} text = {"neutral"}/>
      <Button handleClick={() => setBad(bad+1)} text = {"bad"}/>
      <Statistics good={good} 
                  neutral={neutral}
                  bad={bad}
      />
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
