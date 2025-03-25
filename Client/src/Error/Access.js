// AccessDenied.js
import React from 'react';
import '../Style/AccessDenied.css';
import Footer from '../Components/Footer';
import Navbar from '../Components/Navbar';

const Access = () => {
  return (
    <>
    <Navbar/>
      <div className="access-denied-container">
        <div className="access-denied-content">
          <h1 className="error-code">403</h1>
          <h2 className="error-message">Access Denied</h2>
          <p className="error-description">
            You do not have permission to view this page. Please contact your administrator for more details.
          </p>
          <button className="go-back-btn" onClick={() => window.location.href = "/"}>Go Back</button>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default Access;
