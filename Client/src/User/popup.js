import React, { useState } from "react";
import "../Style/Popup.css";
import '../Style/Calender.css';
import { Clock, Lock, MessageCircle, Pencil, Settings, Wallet } from "lucide-react";

const Sidebar = () => {
    
    const [showPopup, setShowPopup] = useState(false);
    const [showPopup2, setShowPopup2] = useState(false);

    const togglePopup = () => {
        console.log("Toggling Change Password popup");
        setShowPopup(!showPopup);
    };

    const togglePopup2 = () => {
        console.log("Toggling Set Availability popup");
        setShowPopup2(!showPopup2);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted");  
    };

    return (
        <div className="app-container">
            <div className="sidebar">
                <div className="profile-info">
                    <img
                        src="https://via.placeholder.com/100" // Replace with dynamic image source
                        alt="Profile"
                        className="profile-image"
                    />
                    <h2>Esther Howard</h2>
                </div>
                <ul className="menu">
                    {/* <Link to={'/profile'} className="text-black"> */}
                    <a href="/profile" style={{ textDecoration: 'none', color: 'black' }}>
                        <li className="d-flex align-items-center gap-2 border-bottom">
                            <Pencil color="#2278c9" size={20} />
                            Edit Profile
                        </li>
                    </a>
                    {/* </Link> */}
                    <a href="/profile/wallet" style={{ textDecoration: 'none', color: 'black' }}>
                        <li className="d-flex align-items-center gap-2 border-bottom">
                            <Wallet color="#2278c9" />
                            My Wallet
                        </li>
                    </a>
                    {/* <li onClick={togglePopup2} className="d-flex align-items-center gap-2 border-bottom">
                        <Clock color="#2278c9" />
                        Set Availability
                    </li> */}
                    <a href="/user/chat" style={{ textDecoration: 'none', color: 'black' }}>
                        <li className="d-flex align-items-center gap-2 border-bottom">
                            <MessageCircle color="#2278c9" />
                            Messages <span className="notification">2</span>
                        </li>
                    </a>
                    <li onClick={togglePopup} className="d-flex align-items-center gap-2 border-bottom">
                        <Lock color="#2278c9" />
                        Change Password
                    </li>
                    <a href="/setting" style={{ textDecoration: 'none', color: 'black' }}>
                        <li className="d-flex align-items-center gap-2 border-bottom">
                            <Settings color="#2278c9" />
                            Settings
                        </li>
                    </a>
                </ul>
            </div>

            {showPopup && (
                <div className="popup" aria-hidden={!showPopup} aria-modal={showPopup}>
                    <div className="aria-modal">
                        <button className="close-button" onClick={togglePopup}>&times;</button>
                        <h2 className="modal-title">Change Password</h2>
                        <form className="password-form" onSubmit={handleSubmit}>
                            <div className="input-group">
                                <label>
                                    <input type="password" placeholder="Current Password" />
                                </label>
                            </div>
                            <div className="input-group">
                                <label>
                                    <input type="password" placeholder="New Password" />
                                </label>
                            </div>
                            <div className="input-group">
                                <label>
                                    <input type="password" placeholder="Confirm New Password" />
                                </label>
                            </div>
                            <button type="submit" className="submit-button">Register</button>
                        </form>
                    </div>
                </div>
            )}

        </div>
    );
};

export default Sidebar;
