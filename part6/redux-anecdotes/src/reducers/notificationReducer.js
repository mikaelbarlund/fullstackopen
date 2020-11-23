const reducer = (state = null, action) => {
    console.log('state now: ', state)
    console.log('action', action)
    switch (action.type) {
        case 'SHOW':
            return action.notification
        case 'CREATE':
            return `you added '${action.anecdote.content}'`
        case 'LIKE':
            return `you voted '${action.anecdote.content}'`
        case 'HIDE':
            return null
        default: return state
    }
}

export const show = (notification) => {
    return {
        type: 'SHOW',
        notification: notification
    }
}

export const hide = () => {
    return {
        type: 'HIDE'
    }
}

export default reducer