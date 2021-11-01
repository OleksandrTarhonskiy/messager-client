import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

import { CLIENT, SERVER } from './events';
import './App.css';

const socket = io.connect('http://127.0.0.1:8080');

function App() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSendMessage = () => {
    socket.emit(CLIENT.SEND_MESSAGE, { message });
    setMessages(messages => [...messages, message]);
  };

  useEffect(() => {
    socket.on(SERVER.SEND_MESSAGE, ({ message }) => {
      console.log(message)
      setMessages(messages => [...messages, message]);
    });
  }, []);

  return (
    <div className="App">
      <div>
        {
          messages.map((msg) => <p key={msg}>{msg}</p>)
        }
      </div>
      <input 
        name='message'
        value={message}
        onChange={({ target }) => setMessage(target.value)}
      />
      <button onClick={() => handleSendMessage()}>
        Send
      </button>
    </div>
  );
}

export default App;
