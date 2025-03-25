// App.js
import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import "../Style/Message.css";
import Sidebar from "../Components/Sidebar";




const Message = () => {
  const messages = [
    { name: 'Kristin Watson', message: 'Lorem ipsum dolor sit amet', time: '11:23 pm' },
    { name: 'Darrell Steward', message: 'Lorem ipsum dolor sit amet consectetur.', time: '', unread: 2 },
    { name: 'Albert Flores', message: 'Lorem ipsum dolor sit amet consectetur.', time: '07:13 pm' },
    { name: 'Jerome Bell', message: 'Lorem ipsum dolor sit amet consectetur.', time: '01:34 pm' },
    { name: 'Ronald Richards', message: 'Lorem ipsum dolor sit amet consectetur.', time: '02:10 pm' },
    { name: 'Marvin McKinney', message: 'Lorem ipsum dolor sit amet consectetur.', time: '11:27 pm' },
  ];

  return (
    <>
      <Navbar></Navbar>
      <div className="edit-profile-container">
        <Sidebar />
        <div className="content">
          <h1 className="title">Messages</h1>
          <ul className="message-list">
            {messages.map((msg, index) => (
              <li className="message-item" key={index}>
                <div className="avatar"></div>
                <div className="message-content">
                  <h2 className="name">{msg.name}</h2>
                  <p className="message" style={{ backgroundColor: 'transparent' }}>{msg.message}</p>
                </div>
                <div className="message-info">
                  <span className="time">{msg.time}</span>
                  {msg.unread && <span className="unread-badge">{msg.unread}</span>}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Message;
