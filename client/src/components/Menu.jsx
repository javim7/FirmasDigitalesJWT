import React, { useState, useEffect } from 'react';
import './Menu.css';

const Menu = ({ user, onMenuButtonClick, onSignOut }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(true);

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
        localStorage.removeItem('user');
        setIsAuthenticated(false);
        onSignOut();
    };

    return (
        <div className='wrapper'>
            <h1>Welcome back {user ? user.user : 'Guest'}!</h1>
            <img className='menuImg' src="https://ras-blogdb.restdb.io/media/5834555ede7a912e00000942" alt="" />
            <p>Click the button below to acess the protected resource</p>
            <div className='buttonWrapper'>
                <button onClick={userAuthenticated}>Go to Resource</button>
                <button className='signOutButton' onClick={handleSignOut}>Sign Out</button>
            </div>
            {!isAuthenticated && <p className='pError'>Protected resource not available for you!</p>}
        </div>
    );
};

export default Menu;
