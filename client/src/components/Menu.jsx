import React, { useState, useEffect } from 'react';
import './Menu.css';

const Menu = ({ user, onMenuButtonClick, onSignOut }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const userAuthenticated = async () => {
        try {
            // console.log(localStorage.getItem('token'));
            const response = await fetch('http://localhost:3000/users/isAuth', {
                method: 'GET',
                headers: {
                    'x-access-token': localStorage.getItem('token'),
                }
            });
            const data = await response.json();
            if (response.ok) {
                console.log(data);
                setIsAuthenticated(true); 
                onMenuButtonClick();
            } else {
                setIsAuthenticated(false);
                alert('You need to log in first');
            }
        } catch (error) {
            console.error('Error:', error);
            setIsAuthenticated(false);
        }
    };

    const handleSignOut = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        onSignOut();
    };

    return (
        <div>
            <h1>Welcome Back {user ? user.user : 'Guest'}!</h1>
            <button onClick={userAuthenticated}>Go to Resource</button>
            <button className='signOutButton' onClick={handleSignOut}>Sign Out</button>
        </div>
    );
};

export default Menu;
