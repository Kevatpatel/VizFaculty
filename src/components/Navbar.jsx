import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const NavBar = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleNavigation = () => {
        navigate('/admin-dashboard/receivedpublications'); // Navigate to the ReceivedPublication page
    };

    return (
        <div className='flex items-center justify-between h-12 bg-teal-600 px-5'>
            <p>Welcome {user.name}</p>
            <button
                className='px-4 py-1 bg-teal-700 hover:bg-teal-800 text-white rounded'
                onClick={handleNavigation} // Handle button click
            >
                Publications
            </button>
        </div>
    );
};

export default NavBar;
