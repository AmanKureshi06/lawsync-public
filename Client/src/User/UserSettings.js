import React, { useState } from 'react';
import Navbar from '../Components/Navbar';
import '../Style/UserSettings.css';
import Footer from '../Components/Footer';
import UserSidebar from './UserSidebar';
import withAuthProtection from '../utils/withAuthProtection';
import withRoleProtection from '../utils/withRoleProtection';
import withAutoLogout from '../utils/withAutoLogout';

function UserSettings() {
    const [emailNotification, setEmailNotification] = useState(true);
    const [smsNotification, setSmsNotification] = useState(false);

    return (
        <>
            <Navbar />
            <div className='d-flex'>
                <UserSidebar />
                <div className="settings-container">
                    <h1 className="settings-title">Settings</h1>
                    <div className="notification-toggle">
                        <div className="toggle-item">
                            <span>Email Notification</span>
                            <label className="switch">
                                <input
                                    type="checkbox"
                                    checked={emailNotification}
                                    onChange={() => setEmailNotification(!emailNotification)}
                                />
                                <span className="slider"></span>
                            </label>
                        </div>
                        <div className="toggle-item">
                            <span>SMS Notification</span>
                            <label className="switch">
                                <input
                                    type="checkbox"
                                    checked={smsNotification}
                                    onChange={() => setSmsNotification(!smsNotification)}
                                />
                                <span className="slider"></span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default withAutoLogout(withAuthProtection(withRoleProtection(UserSettings,["user"])));