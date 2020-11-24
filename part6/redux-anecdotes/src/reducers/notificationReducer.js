const reducer = (state = { content: null, id: null }, action) => {
    switch (action.type) {
        case 'SHOW':
            return action.data
        case 'HIDE':
            if (action.data.id === state.id) return action.data
            else return state
        default: return state
    }
}

export const show = (notification) => {
    return {
        type: 'SHOW',
        data: { content: notification, id: null }
    }
}

export const hide = () => {
    return {
        type: 'HIDE',
        data: { content: null, id: null }
    }
}

export const setNotification = (notification, delay) => {
    return async dispatch => {
        //if (timeoutID) clearTimeout(timeoutID)
        const timeoutId = setTimeout(() => dispatch({
            type: 'HIDE',
            data: { content: null, id: timeoutId }
        }), delay * 1000)
        dispatch({
            type: 'SHOW',
            data: { content: notification, id: timeoutId }
        })

    }
}

export default reducer