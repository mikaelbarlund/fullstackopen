import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { Form, Button } from 'react-bootstrap'
import { LOGIN } from '../queries'

const LoginForm = ({ setToken }) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')


    const [login, result] = useMutation(LOGIN, {
        onError: (error) => {
            console.log(error.graphQLErrors[0].message)
        }
    })

    useEffect(() => {
        if (result.data) {
            const token = result.data.login.value
            setToken(token)
            localStorage.setItem('library-user-token', token)
        }
    }, [result.data]) // eslint-disable-line



    const submit = async (event) => {
        event.preventDefault()

        login({ variables: { username, password } })
    }

    return (
        <>
            <h2>log in to application</h2>
            <Form onSubmit={submit}>
                <Form.Group controlId="formLoginUsername" >
                    <Form.Label>username</Form.Label>
                    <Form.Control
                        type="text"
                        value={username}
                        name="Username"
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="formLoginPassword">
                    <Form.Label>password</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        name="Password"
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </Form.Group>
                <Button variant="outline-primary" id="login-button" type="submit">login</Button>
            </Form>
        </>
    )
}

export default LoginForm