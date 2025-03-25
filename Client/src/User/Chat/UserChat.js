import React, { useState, useEffect } from "react";
import { MessageList, ChatWindow } from "../../Components/ChatComponent";

const UserChat = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLawyer, setSelectedLawyer] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (selectedLawyer) {
      fetchMessages();
      // Polling messages every 2 seconds
      const interval = setInterval(fetchMessages, 1000);
      return () => clearInterval(interval);
    }
  }, [selectedLawyer]);

  const fetchMessages = async () => {
    if (!selectedLawyer) return;

    const senderEmail = localStorage.getItem("userEmail");

    try {
      const response = await fetch("http://localhost:5000/api/messages/get", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sender: senderEmail,
          receiver: selectedLawyer.email,
        }),
      });

      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const handleSendMessage = async (messageText) => {
    const senderEmail = localStorage.getItem("userEmail");

    if (!senderEmail) {
      console.error("No sender email found in localStorage");
      return;
    }

    if (!selectedLawyer || !selectedLawyer.email) {
      console.error("No lawyer selected or lawyer email missing");
      return;
    }

    const requestBody = {
      sender: senderEmail,
      receiver: selectedLawyer.email,
      text: messageText,
    };

    try {
      const response = await fetch("http://localhost:5000/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to send message");
      }

      const newMessage = await response.json();
      setMessages((prevMessages) => [...prevMessages, newMessage]);

      // Fetch latest messages immediately after sending
      fetchMessages();
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="user-chat">
      {/* ) : ( */}
      <MessageList
        onSelectLawyer={(lawyer) => {
          setSelectedLawyer(lawyer);
          setMessages([]); // Reset messages when switching lawyers
        }}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      
      {selectedLawyer && (
        <ChatWindow
          messages={messages}
          onSendMessage={handleSendMessage}
          conversationName={selectedLawyer.fullName}
          backButton={() => setSelectedLawyer(null)}
        />
      )}
      {/* )} */}
    </div>
  );
};

export default UserChat;
