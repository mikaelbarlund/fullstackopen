
import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({name}) =><h1>{name}</h1>

const Statistic = ({name, count, units}) => <p>{name} {count} {units}</p>
const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Statistics = ({good, neutral, bad}) => {
  let all = good+neutral+bad
  let average = (good-bad)/(all===0?1:all)
  let positive = (good)/(all===0?1:all)
  if(all===0){
    return (
      <>
        <Header name="statistics"/>
        <p>No feedback given</p>
      </>
    )
  } 
  return (
    <>
      <Header name="statistics"/>
      <Statistic name="good"     count={good}/>
      <Statistic name="neutral"  count={neutral}/>
      <Statistic name="bad"      count={bad}/>
      <Statistic name="all"      count={all}/>
      <Statistic name="average"  count={average}  units="%"/>
      <Statistic name="positive" count={positive} units="%"/>
    </>
  )
}
const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  

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
