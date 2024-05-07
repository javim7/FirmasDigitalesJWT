import React from 'react';
import './Resource.css';

function Resource({ onResourceButtonClick, onSignOut, user }) {

  const handleGoToMenu = () => {
    onResourceButtonClick();
  }

  const handleSignOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    onSignOut();
  };

  const handleDownload = () => {
    const imageUrl = 'https://i.imgur.com/1O7EUtZ.png';
    const anchorElement = document.createElement('a');
  
    anchorElement.href = imageUrl;
    anchorElement.target = '_blank'; 
    anchorElement.rel = 'noopener noreferrer'; 
  
    const fileExtension = imageUrl.split('.').pop();
    
    anchorElement.download = `image.${fileExtension}`;
    
    anchorElement.click();
  };
  

  return (
    <div className='resourceWrapper'>
      <h1>{user ? user.user : 'Guest'}'s protected resource</h1>
      <img className='resourceImage' src="https://i.imgur.com/1O7EUtZ.png" alt="" />
      <div className='buttonWrapper'>
        <button className='downloadButton buttonR' onClick={handleDownload}>Open Image</button>
        <button className='buttonR' onClick={handleGoToMenu}>Go to Menu</button>
        <button className='signOutButton' onClick={handleSignOut}>Sign Out</button>
      </div>
    </div>
  );
}

export default Resource;
