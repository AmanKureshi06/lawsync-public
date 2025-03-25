import React from 'react';
import withAuthProtection from '../utils/withAuthProtection';
import withRoleProtection from '../utils/withRoleProtection';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import AdminSidebar from './AdminSidebar';
import '../Style/Complaints.css';
import withAutoLogout from '../utils/withAutoLogout';

function Complaints() {
    return (
        <>
            <Navbar />
            <div className='edit-profile-container '>
                <AdminSidebar />
                <div className="complaints-container">
                    <div className="complaints-content">
                        <h1>Complaints</h1>
                        <div className="complaints-list">
                            {/* Map through complaints and render them here */}
                            <div className="complaint-item">
                                <h3>Complaint Title</h3>
                                <p><strong>User:</strong> John Doe</p>
                                <p><strong>Description:</strong> This is a sample complaint description.</p>
                                <p><strong>Status:</strong> Pending</p>
                            </div>
                            {/* Repeat complaint-item for each complaint */}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default withAutoLogout(withAuthProtection(withRoleProtection(Complaints, ['admin'])));
