// NotFound.js
import React from 'react';
import '../Style/NotFound.css';
import Footer from '../Components/Footer';
import Navbar from '../Components/Navbar';

const NotFound = () => {
    return (
        <>
        <Navbar/>
            <div className="not-found-container">
                <div className="not-found-content">
                    <h1 className="error-code">404</h1>
                    <h2 className="error-message">Page Not Found</h2>
                    <p className="error-description">
                        The page you're looking for doesn't exist or has been moved. Please check the URL or return to the homepage.
                    </p>
                    <button className="go-back-btn" onClick={() => window.location.href = "/"}>Go Back</button>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default NotFound;