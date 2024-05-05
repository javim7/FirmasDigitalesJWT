import React from 'react';
import './Menu.css';

const Menu = ({ onMenuButtonClick }) => {
    return (
        <div>
            <h1>Welcome Back!</h1>
            <button onClick={onMenuButtonClick}>Go to Resource</button>
        </div>
    );
};

export default Menu;