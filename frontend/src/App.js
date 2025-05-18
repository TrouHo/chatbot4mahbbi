import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input) return;
    const newMsg = { sender: "You", text: input };
    setMessages([...messages, newMsg]);

    const res = await axios.post('http://localhost:5000/chat', { message: input });
    const reply = { sender: "Bot", text: res.data.reply };
    setMessages([...messages, newMsg, reply]);
    setInput("");
  };

  return (
    <div className="chatbox">
      <div className="messages">
        {messages.map((msg, i) => (
          <div key={i} className={`msg ${msg.sender === "You" ? "you" : "bot"}`}>
            <b>{msg.sender}: </b>{msg.text}
          </div>
        ))}
      </div>
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && sendMessage()}
        placeholder="Type your message..."
      />
    </div>
  );
}

export default App;
