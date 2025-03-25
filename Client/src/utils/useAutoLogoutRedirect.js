import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useAutoLogoutRedirect = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Check if user is logged in
        const userEmail = localStorage.getItem('userEmail');
        if (!userEmail) {
            navigate('/login');  // If not logged in, redirect to login
            return;
        }

        // Function to handle the storage event across different tabs
        const handleStorageChange = () => {
            if (!localStorage.getItem('userEmail')) {
                navigate('/login');  // Redirect to login if user is logged out in another tab
            }
        };

        // Listen for changes in localStorage
        window.addEventListener('storage', handleStorageChange);

        // Cleanup the event listener when the component is unmounted
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, [navigate]); // Runs once when component mounts
};

export default useAutoLogoutRedirect;
