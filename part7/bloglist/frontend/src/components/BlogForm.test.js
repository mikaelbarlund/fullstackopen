import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'
describe('<BlogForm /> ', () => {
  test('updates parent state and calls onSubmit', () => {
    const createBlog = jest.fn()
    const authorValue = 'Test Writer'
    const titleValue = 'testing of forms could be easier'
    const urlValue = 'https://fullstackopen.com/osa5/react_sovellusten_testaaminen#testien-suorittaminen'
    const component = render(
      <BlogForm createBlog={createBlog} />
    )
    component.debug()
    const author = component.container.querySelector('#author')
    const title = component.container.querySelector('#title')
    const url = component.container.querySelector('#url')
    const form = component.container.querySelector('.blogForm')

    fireEvent.change(author, {
      target: { value: authorValue }
    })
    fireEvent.change(title, {
      target: { value: titleValue }
    })
    fireEvent.change(url, {
      target: { value: urlValue }
    })

    fireEvent.submit(form)
    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].author).toBe(authorValue)
    expect(createBlog.mock.calls[0][0].title).toBe(titleValue)
    expect(createBlog.mock.calls[0][0].url).toBe(urlValue)
  })
})