const Notification = ({ notification }) => {
    const style = {
        color: notification.type === 'error' ? 'red' : 'green',
        background: 'lightgrey',
        fontSize: '20px',
        borderStyle: 'solid',
        borderRadius: '5px',
        padding: '10px',
        marginBottom: '10px'
    }

    if (notification.text === null) {
        return null
    }

    return (
        <div style={style}>
            {notification.text}
        </div>
    )
}
export default Notification