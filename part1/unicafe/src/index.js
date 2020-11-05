
import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({name}) =><h1>{name}</h1>

const StatisticLine = ({name, count, units}) => <tr><td>{name}</td><td>{count} {units}</td></tr>
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
      <table>
      <tbody>
      <StatisticLine name="good"     count={good}/>
      <StatisticLine name="neutral"  count={neutral}/>
      <StatisticLine name="bad"      count={bad}/>
      <StatisticLine name="all"      count={all}/>
      <StatisticLine name="average"  count={average}  units="%"/>
      <StatisticLine name="positive" count={positive} units="%"/>
      </tbody>
      </table>
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
