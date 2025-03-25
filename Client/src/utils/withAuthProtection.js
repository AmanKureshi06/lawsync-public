import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// This HOC will wrap any component to protect it
const withAuthProtection = (WrappedComponent) => {
  return (props) => {
    const navigate = useNavigate();
    
    useEffect(() => {
      const userEmail = localStorage.getItem('userEmail');
      if (!userEmail) {
        // Redirect to login page if user is not logged in
        navigate('/login');
      }
    }, [navigate]);

    return <WrappedComponent {...props} />;
  };
};

export default withAuthProtection;
