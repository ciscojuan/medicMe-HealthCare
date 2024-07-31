const Notification = ({ messageError, message }) => {
    if (messageError) {
        return (
            <div className="error">
                {messageError}
            </div>
        )
    } else if (message) {
        return (
            <div className="success">
                {message}
            </div>
        )
    }


}

export default Notification