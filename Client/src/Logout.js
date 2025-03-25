// Logout.js
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { checkLogout } from './utils/checkLogout';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("Interval running..."); // Debugging line
      checkLogout(navigate);
    }, 10000); // Check every 10 seconds
    return () => clearInterval(interval); // Clean up interval on component unmount
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
