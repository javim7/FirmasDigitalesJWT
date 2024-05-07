import React, {useState, useEffect} from 'react';
import Form from './components/Form.jsx';
import Menu from './components/Menu.jsx';
import Resource from './components/Resource.jsx';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentComponent, setCurrentComponent] = useState('Form');

  useEffect(() => {
    const checkUserAuthentication = async () => {
      try {
        const response = await fetch('http://localhost:3000/users/isAuth', {
          method: 'GET',
          headers: {
            'x-access-token': localStorage.getItem('token'),
          }
        });
        const data = await response.json();
        if (response.ok) {
          const user = localStorage.getItem('user');
          setCurrentUser(user);
          console.log(user);
          setCurrentComponent('Menu');
        } else {
          setCurrentUser(null);
          setCurrentComponent('Form');
        }
      } catch (error) {
        console.error('Error:', error);
        setCurrentUser(null);
      }
    };

    checkUserAuthentication();
  }, []);

  const handleLoginSuccess = (data) => {
    setCurrentUser(data);
    setCurrentComponent('Menu');
  };

  const handleMenuButtonClick = () => {
    setCurrentComponent('Resource');
  };

  const handleResourceButtonClick = () => {
    setCurrentComponent('Menu');
  }

  const handleSignOut = () => {
    setCurrentUser(null);
    setCurrentComponent('Form');
  };

  return (
    <>
      <div>
        {currentComponent === 'Form' && (
          <Form onLoginSuccess={handleLoginSuccess} />
        )}
        {currentComponent === 'Menu' && (
          <Menu 
          user={currentUser}
          onMenuButtonClick={handleMenuButtonClick} 
          onSignOut={handleSignOut}
          />
        )}
        {currentComponent === 'Resource' && (
        <Resource 
        onResourceButtonClick={handleResourceButtonClick}
        onSignOut={handleSignOut}
        user={currentUser}
        />
        )}
      </div>
    </>
  )
}

export default App
