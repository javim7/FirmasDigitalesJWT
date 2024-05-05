import React, { useState } from 'react';
import Form from './components/Form.jsx';
import Menu from './components/Menu.jsx';
import Resource from './components/Resource.jsx';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentComponent, setCurrentComponent] = useState('Form');

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setCurrentComponent('Menu');
  };

  const handleMenuButtonClick = () => {
    setCurrentComponent('Resource');
  };

  return (
    <>
      <div>
        {currentComponent === 'Form' && (
          <Form onLoginSuccess={handleLoginSuccess} />
        )}
        {currentComponent === 'Menu' && (
          <Menu onMenuButtonClick={handleMenuButtonClick} />
        )}
        {currentComponent === 'Resource' && <Resource />}
      </div>
    </>
  )
}

export default App
