export default function Notification({message, isError}) {
    if (message === null) {
        return null
    }

    return (
        <div className={`notification ${isError? "error": "success"}`}>
            {message}
        </div>
    )
}