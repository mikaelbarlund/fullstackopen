import React from 'react'

const Total = ({parts}) => 
<p>
    <b>total of {parts.map(a=>a.exercises).reduce((a,b)=>a+b)} exercises</b>
</p>

export default Total