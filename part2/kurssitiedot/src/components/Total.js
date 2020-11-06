import React from 'react'

const Total = (props) => 
<p>
    <b>total of {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises} exercises</b>
</p>

export default Total