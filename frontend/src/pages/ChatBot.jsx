import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./ChatBot.css";

const ChatBot = ({ record, onClose }) => {
    const [messages, setMessages] = useState([
        { sender: "ai", text: "Hello! How can I help you today? ", time: getTime() }
    ]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const chatBoxRef = useRef(null);

    function getTime() {
        const d = new Date();
        return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
    }

    useEffect(() => {
        if (chatBoxRef.current)
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }, [messages, isTyping]);

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMsg = { sender: "user", text: input, time: getTime() };
        setMessages((prev) => [...prev, userMsg]);
        setInput("");
        setIsTyping(true);

        try {
            const res = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/ai/chat`,
                {
                    message: input,
                    context: record,
                }
            );
            setMessages((prev) => [
                ...prev,
                { sender: "ai", text: res.data.reply, time: getTime() },
            ]);
        } catch (err) {
            console.error(err);
            setMessages((prev) => [
                ...prev,
                { sender: "ai", text: "Something went wrong. Please try again.", time: getTime() },
            ]);
        } finally {
            setIsTyping(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <div className="cb-overlay">
            <div className="cb-container">

                {/* Header */}
                <div className="cb-header">
                    <div className="cb-header-left">
                        <div className="cb-avatar">
                            🤖
                            <span className="cb-online-dot" />
                        </div>
                        <div className="cb-header-info">
                            <p className="cb-agent-name">AI Assistant</p>
                            <p className="cb-status">Online</p>
                        </div>
                    </div>
                    <button className="cb-close-btn" onClick={onClose} aria-label="Close chat">
                        ✕
                    </button>
                </div>

                {/* Messages */}
                <div className="cb-chat-box" ref={chatBoxRef}>
                    {messages.map((msg, i) => (
                        <div key={i} className={`cb-msg-wrap cb-msg-wrap--${msg.sender}`}>
                            <div className={`cb-bubble cb-bubble--${msg.sender}`}>
                                {msg.text}
                            </div>
                            <span className="cb-time">{msg.time}</span>
                        </div>
                    ))}

                    {isTyping && (
                        <div className="cb-msg-wrap cb-msg-wrap--ai">
                            <div className="cb-typing">
                                <span className="cb-dot" />
                                <span className="cb-dot cb-dot--2" />
                                <span className="cb-dot cb-dot--3" />
                            </div>
                        </div>
                    )}
                </div>

                {/* Input */}
                <div className="cb-footer">
                    <div className="cb-input-row">
                        <input
                            className="cb-input"
                            type="text"
                            value={input}
                            placeholder="Type a message..."
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            autoComplete="off"
                        />
                        <button
                            className="cb-send-btn"
                            onClick={sendMessage}
                            disabled={isTyping || !input.trim()}
                            aria-label="Send message"
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="22" y1="2" x2="11" y2="13" />
                                <polygon points="22 2 15 22 11 13 2 9 22 2" />
                            </svg>
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ChatBot;