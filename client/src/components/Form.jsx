import React, {useState, useEffect} from 'react';
import './Form.css';

const Form = () => {

  const [activeTab, setActiveTab] = useState('login');
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [signupUsername, setSignupUsername] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

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
              type="email" 
              placeholder="Email"
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
              onClick={() => console.log(loginUsername, loginPassword)}
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
              type="email" 
              placeholder="Email"
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
              onClick={() => console.log(signupUsername, signupPassword, confirmPassword)}
              >Sign Up</button>
            </div>
          </form>
        )
      }
      
    </div>
  );
}

export default Form;
