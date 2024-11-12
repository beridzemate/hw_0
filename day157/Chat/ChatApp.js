import { useState } from "react";

const ChatApp = () => {
  const [messages, setMessages] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessages([{ message: e.target.message.value, createdAt: new Date() }, ...messages]);
    e.target.reset();
  };

  const clearChat = () => {
    setMessages([]);
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px' }}>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Type a message" name="message" required />
        <button type="submit">Send</button>
        <button onClick={clearChat} type="button">Clear Chat</button>
      </form>

      <ol>
        {messages.map((obj, index) => (
          <li key={index}>
            {obj.message} - {obj.createdAt.toLocaleTimeString()}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default ChatApp;
