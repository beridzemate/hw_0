// client/src/Chat.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    useEffect(() => {
        // Fetch messages when the component mounts
        axios.get('http://localhost:5000/messages')
            .then(response => setMessages(response.data))
            .catch(error => console.error('Error fetching messages:', error));
    }, []);

    const sendMessage = () => {
        if (input.trim()) {
            const newMessage = { text: input, timestamp: new Date().toISOString() };
            axios.post('http://localhost:5000/messages', newMessage)
                .then(response => {
                    setMessages([...messages, response.data]);
                    setInput('');
                })
                .catch(error => console.error('Error sending message:', error));
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
            <h2>Chat</h2>
            <div style={{ border: '1px solid #ddd', padding: '10px', marginBottom: '10px', height: '200px', overflowY: 'auto' }}>
                {messages.map((msg, index) => (
                    <div key={index} style={{ marginBottom: '10px' }}>
                        <span><strong>{msg.timestamp.split('T')[1].split('.')[0]}:</strong> {msg.text}</span>
                    </div>
                ))}
            </div>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message"
                style={{ width: '100%', padding: '10px' }}
            />
            <button onClick={sendMessage} style={{ width: '100%', padding: '10px', marginTop: '5px' }}>
                Send
            </button>
        </div>
    );
};

export default Chat;
