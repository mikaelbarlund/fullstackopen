import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({text, handleClick}) => <button onClick={handleClick}>{text}</button>
const Header = ({name}) =><h1>{name}</h1>
const Anecdote = ({anecdote, anecdotePoints}) =><div>{anecdote}<br/>has {anecdotePoints} votes</div>

const Best = ({anecdotes, points}) => {
  let popular = points.indexOf(Math.max(...points))
  return(
    <>
    <Header name="Anecdote with most votes"/>
    <Anecdote anecdote={anecdotes[popular]} anecdotePoints={points[popular]} />
    </>
  )
}

const App = ({anecdotes}) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(anecdotes.map(()=>0))

  return (
    <>
    <Header name="Anecdote of the day"/>
    <Anecdote anecdote={anecdotes[selected]} anecdotePoints={points[selected]} />
    <Button text="next anecdote" handleClick={()=> {
        let i = Math.floor(Math.random() * anecdotes.length)
        const copy = [ ...points ]
        copy[i] += 1
        setSelected(i)
        setPoints(copy)
      }} />
    <Best anecdotes={anecdotes} points={points} />
    </>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)