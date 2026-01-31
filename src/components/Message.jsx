export default function Message({ message }) {
  return (
    <div className={`message ${message.sender}`}>
      <div className="bubble">{message.text}</div>
      <span className="time">
        {new Date(message.timestamp).toLocaleTimeString()}
      </span>
    </div>
  );
}
