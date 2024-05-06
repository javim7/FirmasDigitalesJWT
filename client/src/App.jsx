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
          // If the user is authenticated, set the current user and component
          setCurrentUser(data.user);
          setCurrentComponent('Menu');
        } else {
          // If not authenticated, clear the current user and set the component to 'Form'
          setCurrentUser(null);
          setCurrentComponent('Form');
        }
      } catch (error) {
        console.error('Error:', error);
        // Handle any errors
      }
    };

    checkUserAuthentication();
  }, []);

  //useEffect print the current user
  useEffect(() => {
    console.log(currentUser);
  }, [currentUser]);

  //useEffect print the current component
  useEffect(() => {
    console.log(currentComponent);
  }, [currentComponent]);

  const handleLoginSuccess = (data) => {
    setCurrentUser(data);
    setCurrentComponent('Menu');
  };

  const handleMenuButtonClick = () => {
    setCurrentComponent('Resource');
  };

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
        {currentComponent === 'Resource' && <Resource />}
      </div>
    </>
  )
}

export default App
