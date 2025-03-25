import React, { useState, useEffect } from 'react';
import '../Style/Chat.css';
import { SendHorizonal } from 'lucide-react';
import axios from 'axios';

// Message List to display and filter lawyers based on search query
export const MessageList = ({ onSelectLawyer, searchQuery, setSearchQuery }) => {
    const [lawyers, setLawyers] = useState([]);

    useEffect(() => {
        const fetchLawyers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/lawyer/list');
                setLawyers(response.data);
            } catch (error) {
                console.error('Error fetching lawyers:', error);
            }
        };
        fetchLawyers();
    }, []);

    const filteredLawyers = lawyers.filter((lawyer) =>
        lawyer.fullName?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="message-list">
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search lawyers by full name"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                />
            </div>
            {filteredLawyers.map((lawyer) => (
                <div key={lawyer.email} className="message-list-item" onClick={() => onSelectLawyer(lawyer)}>
                    <h4>{lawyer.fullName}</h4>
                </div>
            ))}
        </div>
    );
};

// Chat window to send and display messages
export const ChatWindow = ({ messages, onSendMessage, conversationName, backButton }) => {
    const [input, setInput] = useState('');

    const handleSend = () => {
        if (input.trim()) {
            onSendMessage(input);
            setInput('');
        }
    };

    return (
        <div className="chat-window">
            <div className="chat-header">
                <button className="back-button mobile-back-button" onClick={backButton}>Back</button>
                <h3 className="chatname-header">{conversationName}</h3>
            </div>
            <div className="chat-messages">
                {messages.map((message, index) => (
                    <div key={index} className={`chat-message ${message.sender === localStorage.getItem("userEmail") ? "user" : "lawyer"}`}>
                        <p>{message.text}</p>
                        <span className="message-time">{new Date(message.timestamp).toLocaleTimeString()}</span>
                    </div>
                ))}
            </div>
            <div className="chat-input">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a message"
                />
                <button onClick={handleSend}><SendHorizonal /></button>
            </div>
        </div>
    );
};

// Main component that handles chat logic
export const ChatComponent = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedLawyer, setSelectedLawyer] = useState(null);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if (selectedLawyer) {
            fetchMessages();
        }
    }, [selectedLawyer]);

    const fetchMessages = async () => {
        if (!selectedLawyer) return;
    
        const userEmail = localStorage.getItem("userEmail");
    
        try {
            const response = await axios.post("http://localhost:5000/api/messages/get", {
                sender: userEmail,
                receiver: selectedLawyer.email,
            });
    
            setMessages(response.data);
        } catch (error) {
            console.error("Error fetching messages:", error);
        }
    };
    

    const handleSelectLawyer = (lawyer) => {
        console.log("Selected Lawyer:", lawyer);
        if (!lawyer.email) {
            console.error("Lawyer has no email:", lawyer);
        }
        setSelectedLawyer(lawyer);
        setMessages([]);
    };
    
    const handleSendMessage = async (messageText) => {
        const userEmail = localStorage.getItem("userEmail");
    
        if (!selectedLawyer || !selectedLawyer.email) {
            console.error("No lawyer selected or lawyer email missing", selectedLawyer);
            return;
        }
    
        const newMessage = {
            sender: userEmail,
            receiver: selectedLawyer.email,
            text: messageText,
            timestamp: new Date().toISOString(),
        };
    
        try {
            await axios.post('http://localhost:5000/api/messages', newMessage);
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };
    

    const handleBackButton = () => {
        setSelectedLawyer(null);
        setMessages([]);
    };

    return (
        <div className="chat-component">
            {!selectedLawyer ? (
                <MessageList searchQuery={searchQuery} setSearchQuery={setSearchQuery} onSelectLawyer={handleSelectLawyer} />
            ) : (
                <ChatWindow messages={messages} onSendMessage={handleSendMessage} conversationName={selectedLawyer.fullName} backButton={handleBackButton} />
            )}
        </div>
    );
};
