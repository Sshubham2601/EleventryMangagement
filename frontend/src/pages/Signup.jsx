import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/Login.css'
import httpClient from '../utils/api';
function Signup({setIsLogin}) {
  const navigate = useNavigate();
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const handleLogin = () => {
    navigate('/login');
  };
  const handleRegister = () => {
    console.log("name",name)
    console.log("email",email)
    console.log("password",password)
    httpClient.post('/', {
      fullName:name,
      email: email,
      password: password
  })
  .then(response => {
      // Handle successful response here
      setIsLogin(false);
      navigate('/login');
  })
  .catch(error => {
      // Handle error
      console.error('Login error:', error);
      // Example: display error message to user
      alert('Login failed. Please try again.');
  });
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Register</h2>
        <p>Create Your free Account Now !</p>
        <input type="text" placeholder="Name" onChange={(e)=>{setName(e.target.value)}}/>
        <input type="email" placeholder="Email" onChange={(e)=>{setEmail(e.target.value)}}/>
        <input type="password" placeholder="Password" onChange={(e)=>{setPassword(e.target.value)}}/>
        <button onClick={handleRegister}>Register</button>
        <p onClick={handleLogin}>Already have a account ? <span className="register-link">Login</span></p>
      </div>
    </div>
  );
}

export default Signup;
