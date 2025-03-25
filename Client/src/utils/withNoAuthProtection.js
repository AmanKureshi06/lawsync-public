import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const withNoAuthProtection = (WrappedComponent) => {
  return (props) => {
    const navigate = useNavigate();

    useEffect(() => {
      const userEmail = localStorage.getItem('userEmail');
      if (userEmail) {
        // If the user is logged in, fetch their role from the database
        axios.post('http://localhost:5000/api/auth/role', { email: userEmail })
          .then((response) => {
            if (response.data && response.data.role) {
              const { role } = response.data;
              // Redirect based on the user role
              if (role === 'user') {
                navigate('/usereditprofile');  // Redirect to user edit profile
              } else if (role === 'lawyer') {
                navigate('/profile');  // Redirect to lawyer edit profile
              } else if (role === 'admin') {
                navigate('/admin/dashboard');  // Fallback to profile if no specific role is found
              } else {
                navigate('/')
              }
            } else {
              console.error('Role not found in response:', response);
              navigate('/profile');
            }
          })
          .catch((error) => {
            console.error('Error fetching user role:', error);
            navigate('/profile');  // If there's an error fetching role, navigate to profile
          });
      }
    }, [navigate]);

    return <WrappedComponent {...props} />;
  };
};

export default withNoAuthProtection;
