const Notification = ({ messageError, message }) => {
    if (messageError, message) {
        return (
            <div className="alert alet-danger">
                {messageError}
            </div>
        )
    } else if (message) {
        return (
            <div className="alert alert-success">
                {message}
            </div>
        )
    }

}

export default Notification