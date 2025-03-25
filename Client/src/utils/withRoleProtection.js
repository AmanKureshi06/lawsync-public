import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const withRoleProtection = (WrappedComponent, allowedRoles) => {
  return (props) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true); // State to manage loading

    useEffect(() => {
      const validateAccess = () => {
        const userEmail = localStorage.getItem("userEmail");
        const userRole = localStorage.getItem("role");

        console.log("User Email:", userEmail);
        console.log("User Role:", userRole);
        console.log("Allowed Roles:", allowedRoles);

        // Check if the user is logged in
        if (!userEmail) {
          console.log("Redirecting to login: No user logged in");
          navigate("/login");
          return;
        }

        // Check if the user's role is allowed
        if (!allowedRoles.includes(userRole)) {
          console.log(`Redirecting to error page: Role '${userRole}' not allowed`);
          navigate("/error/403");
          return;
        }

        // Valid user and role
        console.log("Access granted");
        setLoading(false);
      };

      // Initial validation when the component mounts
      validateAccess();

      // Listen for changes in localStorage (cross-tab sync)
      window.addEventListener("storage", validateAccess);

      // Cleanup the event listener on unmount
      return () => {
        window.removeEventListener("storage", validateAccess);
      };
    }, [navigate, allowedRoles]);

    // Prevent rendering of the wrapped component until loading is complete
    if (loading) {
      return <div>Loading...</div>; // Display a loading spinner or placeholder
    }

    return <WrappedComponent {...props} />;
  };
};

export default withRoleProtection;
