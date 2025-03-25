import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// Higher-Order Component for Auto Logout
const withAutoLogout = (WrappedComponent) => {
  return (props) => {
    const navigate = useNavigate();

    useEffect(() => {
      const checkLogout = () => {
        const loginTimestamp = localStorage.getItem('loginTimestamp');
        if (loginTimestamp) {
          // const logoutTime = 10 * 1000; // 10 seconds for testing
          const logoutTime = 24 * 60 * 60 * 1000; // 1 day in milliseconds
          const currentTime = new Date().getTime();
          const elapsedTime = currentTime - parseInt(loginTimestamp, 10);

          if (elapsedTime > logoutTime) {
            localStorage.clear();
            navigate('/login');
            toast.error('Session expired. Please log in again.', {
              position: 'top-right',
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
            });
          }
        }
      };

      const interval = setInterval(checkLogout, 10000); // Check every 10 seconds
      return () => clearInterval(interval); // Cleanup on unmount
    }, [navigate]);

    return <WrappedComponent {...props} />;
  };
};

export default withAutoLogout;
