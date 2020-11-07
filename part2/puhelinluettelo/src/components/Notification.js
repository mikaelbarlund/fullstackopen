const Notification = ({ message, type }) => {
    const style = {
        color: type === 'error' ? 'red' : 'green',
        background: 'lightgrey',
        fontSize: '20px',
        borderStyle: 'solid',
        borderRadius: '5px',
        padding: '10px',
        marginBottom: '10px'
    }

    if (message === null) {
        return null
    }

    return (
        <div style={style}>
            {message}
        </div>
    )
}
export default Notification