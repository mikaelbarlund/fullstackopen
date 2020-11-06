import React   from 'react'
import Header2  from './Header2'
import Content from './Content'
import Total   from './Total'

const Course =({course}) =>   (
    <>
      <Header2  name = {course.name} />
      <Content parts  = {course.parts}  />
      <Total   parts  = {course.parts}  />
    </>
)

export default Course