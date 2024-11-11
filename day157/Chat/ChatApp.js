// ChatApp.js
import React from 'react';

const ChatApp = () => {
  return (
    <div className="chat-app">
      <h1>Chat App</h1>
      <div className="chat-box">
        <input type="text" placeholder="Type a message..." />
        <button>Send</button>
      </div>
    </div>
  );
};

export default ChatApp;
