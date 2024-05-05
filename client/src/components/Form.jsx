import React, {useState, useEffect} from 'react';
import CryptoJS from 'crypto-js';
import './Form.css';

const Form = ({ onLoginSuccess }) => {

  const [activeTab, setActiveTab] = useState('login');
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [signupUsername, setSignupUsername] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleLogin = async () => {
    try {
      // Hash the password
      const hashedPassword = CryptoJS.SHA256(loginPassword).toString();
      // Make a POST request to the server
      const response = await fetch('http://localhost:3000/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: loginUsername,
          password: hashedPassword,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to login');
      }
      // alert(data.message); // Display success message
      // Clear form fields after successful login
      setLoginUsername('');
      setLoginPassword('');
      // Call the onLoginSuccess function passed from App.jsx
      onLoginSuccess();
    } catch (error) {
      console.error('Error:', error);
      alert(error.message || 'Failed to login');
    }
  };

  const handleSignup = async () => {
    if (signupPassword !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    // Hash the password
    const hashedPassword = CryptoJS.SHA256(signupPassword).toString();
    try {
      // Make a POST request to the server
      const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: signupUsername,
          password: hashedPassword,
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to create user');
      }
      alert('User created successfully!');
      // Clear form fields after successful signup
      setSignupUsername('');
      setSignupPassword('');
      setConfirmPassword('');
      setActiveTab('login');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to create user');
    }
  };

  return (
    <div className="login-box">

      <div className="lb-header">
        <a
          href="#"
          className={activeTab === 'login' ? 'active' : ''}
          onClick={() => setActiveTab('login')}
        >
          Login
        </a>
        <a
          href="#"
          className={activeTab === 'signup' ? 'active' : ''}
          onClick={() => setActiveTab('signup')}
        >
          Sign Up
        </a>
      </div>
      {
        activeTab === 'login' ? (
          <form className="email-login">
            <div className="u-form-group">
              <input 
              type="text" 
              placeholder="Username"
              value={loginUsername}
              onChange={(e) => setLoginUsername(e.target.value)}
              />
            </div>
            <div className="u-form-group">
              <input 
              type="password" 
              placeholder="Password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              />
            </div>
            <div className="u-form-group">
              <button
              onClick={() => handleLogin()}
              >Log in</button>
            </div>
            <div className="u-form-group">
              <a href="#" className="forgot-password">Forgot password?</a>
            </div>
          </form>
        ) : (
          <form className="email-signup">
            <div className="u-form-group">
              <input 
              type="text" 
              placeholder="Username"
              value={signupUsername}
              onChange={(e) => setSignupUsername(e.target.value)}
              />
            </div>
            <div className="u-form-group">
              <input 
              type="password" 
              placeholder="Password"
              value={signupPassword}
              onChange={(e) => setSignupPassword(e.target.value)}
              />
            </div>
            <div className="u-form-group">
              <input 
              type="password" 
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="u-form-group">
              <button
              onClick={() => handleSignup()}
              >Sign Up</button>
            </div>
          </form>
        )
      }
      
    </div>
  );
}

export default Form;
