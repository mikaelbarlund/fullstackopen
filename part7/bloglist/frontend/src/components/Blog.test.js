import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
//import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

describe('<Blog />', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Test Writer',
    url: 'https://fullstackopen.com/osa5/react_sovellusten_testaaminen#testien-suorittaminen',
    likes: 9
  }

  let component
  let likeHandler
  let removeHandler
  beforeEach(() => {
    likeHandler = jest.fn()
    removeHandler = jest.fn()
    component = render(
      <Blog blog={blog} like={likeHandler} remove={removeHandler} />
    )
  })
  test('renders short content by default', () => {
    component.debug()
    expect(component.container).toHaveTextContent(
      blog.title
    )
    expect(component.container).toHaveTextContent(
      blog.author
    )
    expect(component.container).not.toHaveTextContent(
      blog.url
    )
    expect(component.container).not.toHaveTextContent(
      blog.likes
    )
  })

  test('renders detailed content after clicking', () => {
    const show = component.getByText('show')
    fireEvent.click(show)
    component.debug()
    expect(component.container).toHaveTextContent(
      blog.title
    )
    expect(component.container).toHaveTextContent(
      blog.author
    )
    expect(component.container).toHaveTextContent(
      blog.url
    )
    expect(component.container).toHaveTextContent(
      blog.likes
    )
  })

  test('clicking the like button 2x calls event handler 2x', async () => {
    component.debug()
    const show = component.getByText('show')
    fireEvent.click(show)
    const like = component.getByText('like')
    fireEvent.click(like)
    fireEvent.click(like)
    expect(likeHandler.mock.calls).toHaveLength(2)
  })
})