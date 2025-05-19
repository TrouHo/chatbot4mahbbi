import React, { useState, useEffect } from "react";
import "./App.css";
import botAvatar from "./assets/bot.png";
import userAvatar from "./assets/user.png";

function App() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const chatBoxRef = React.useRef(null);

useEffect(() => {
  if (chatBoxRef.current) {
    chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
  }
}, [messages]);

// Load messages từ localStorage khi mở lại trang
useEffect(() => {
  const saved = localStorage.getItem("chatMessages");
  if (saved) {
    setMessages(JSON.parse(saved));
  }
}, []);

// Lưu mỗi khi messages thay đổi
useEffect(() => {
  localStorage.setItem("chatMessages", JSON.stringify(messages));
}, [messages]);


  const handleSend = () => {
    if (inputText.trim() === "") return;

    const userMessage = { sender: "user", text: inputText };
    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsTyping(true);

    // Giả lập bot trả lời sau 1.5s
    setTimeout(() => {
      const botReply = {
        sender: "bot",
        text: "Tớ đang nghe nè 💬" // hoặc fetch từ backend sau
      };
      setMessages((prev) => [...prev, botReply]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="chat-window">
      <div className="chat-header">
        <div className="moon-icon">🌙</div>
        <div className="window-buttons">
          <button className="minimize">–</button>
          <button className="maximize">▢</button>
          <button className="close">✕</button>
        </div>
      </div>

      <div className="chat-body">
        <div className="chat-box" ref={chatBoxRef}>
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.sender}`}>
              <img
                src={msg.sender === "bot" ? botAvatar : userAvatar}
                alt={`${msg.sender} avatar`}
                className="avatar"
              />
              <div className="bubble">{msg.text}</div>
            </div>
          ))}

          {isTyping && (
            <div className="message bot">
            <img src={botAvatar} alt="bot" className="avatar" />
            <div className="bubble typing-bubble"></div>
           </div>
          )}

        </div>
      </div>

      <div className="chat-input-area">
        <img src={userAvatar} alt="User Avatar" className="avatar user" />
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}

export default App;
