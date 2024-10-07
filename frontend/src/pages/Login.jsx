import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/Login.css'
import httpClient from '../utils/api';
import { setItem } from '../utils/localstorage';
function Login({isLogin,setIsLogin}) {
  const navigate = useNavigate();
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const handleLogin = () => {
    console.log("email",email)
    console.log("password",password)
    httpClient.post('/login', {
      email: email,
      password: password
  })
  .then(response => {
      // Handle successful response here
      setItem('TOKEN', response.data.data?.accessToken)
      console.log("response.data?.accessToken",response.data.data?.accessToken)
      // Example: navigate to dashboard or set user state
      setIsLogin(true);
      navigate('/');
  })
  .catch(error => {
      // Handle error
      console.error('Login error:', error);
      // Example: display error message to user
      alert('Login failed. Please try again.');
  });
    setIsLogin(true)
  };
  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Sign in</h2>
        <input type="email" placeholder="Email" onChange={(e)=>{setEmail(e.target.value)}}/>
        <input type="password" placeholder="Password" onChange={(e)=>{setPassword(e.target.value)}}/>
        <button onClick={handleLogin}>Sign in</button>
        <p onClick={handleRegister}>Don't have an account? <span className="register-link">Register</span></p>
      </div>
    </div>
  );
}

export default Login;
