import React, { useState } from 'react';
import { MessageList, ChatWindow } from '../Components/ChatComponent';
import '../Style/Chat.css';

const UserChat = () => {
    const [conversations] = useState([
        { name: 'Lawyer 1', lastMessage: 'See you at 3 PM' },
        { name: 'Lawyer 2', lastMessage: 'Please review the document' },
        { name: 'Lawyer 3', lastMessage: 'Meeting at 5 PM tomorrow' },
        { name: 'Lawyer 4', lastMessage: 'Update the case file' },
    ]);
    const [messages, setMessages] = useState([]);
    const [selectedConversation, setSelectedConversation] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedName, setSelectedName] = useState('');  // New state for selected conversation name

    const handleSelectConversation = (index) => {
        setSelectedConversation(index);
        setSelectedName(conversations[index].name);  // Set the selected conversation's name
        // Load messages for the selected conversation (optional, can be enhanced)
    };

    const handleSendMessage = (messageText) => {
        setMessages([...messages, { sender: 'user', text: messageText }]);
    };

    return (
        <div className="chat-container">
            <MessageList
                conversations={conversations}
                onSelectConversation={handleSelectConversation}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
            />
            {selectedConversation !== null && (
                <ChatWindow
                    className={selectedConversation !== null ? 'active' : ''}
                    messages={messages}
                    onSendMessage={handleSendMessage}
                    conversationName={selectedName}  // Pass the selected conversation name
                />
            )}
        </div>
    );
};

export default UserChat;
