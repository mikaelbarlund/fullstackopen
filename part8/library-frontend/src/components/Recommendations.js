import React, { useEffect } from 'react'
import { useLazyQuery } from '@apollo/client'

import { ALL_BOOKS } from '../queries'
const Books = ({ show, recommendation }) => {
    const [getAllBooks, allBooks] = useLazyQuery(ALL_BOOKS, { variables: { genre: recommendation } })
    useEffect(() => {
        if (show) {
            getAllBooks()
        }
    }, [getAllBooks, show])

    if (!show || allBooks.loading || !allBooks.called) {
        return null
    }

    const books = allBooks.data.allBooks
    return (
        <div>
            <h2>recommendations</h2>
            <div>in your favourite genre <b>{recommendation}</b></div>
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>
                            author
            </th>
                        <th>
                            published
            </th>
                    </tr>
                    {books.map(a =>
                        <tr key={a.title}>
                            <td>{a.title}</td>
                            <td>{a.author.name}</td>
                            <td>{a.published}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default Books