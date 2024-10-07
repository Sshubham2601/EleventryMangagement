import React, { useLayoutEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import GenerateQRCode from './pages/GenerateQRCode';
import ScanQRCode from './pages/ScanQRCode';
import Header from './components/Header';
import './App.css';
import Signup from './pages/Signup';
import { getItem } from './utils/localstorage';
import EditQRCode from './pages/EditQRCode';
function App() {
  const [isLogin,setIsLogin] = useState(false)
  useLayoutEffect(()=>{
    const token = getItem('TOKEN');
    console.log("token: " + token);
    if(token) { 
      setIsLogin(true)
    }
  })
  return (
    <Router>
      <div className="App">
        <Header isLogin={isLogin} setIsLogin={setIsLogin}/>
        <Routes>
          <Route path="/" exact element={<Dashboard isLogin={isLogin}/>} />
          <Route path="/login" element={<Login setIsLogin={setIsLogin}/>} />
          <Route path="/register" element={<Signup setIsLogin={setIsLogin}/>} />
          <Route path="/generate-qr" element={<GenerateQRCode/>} />
          <Route path="/scan-qr" element={<ScanQRCode/>} />
          <Route path="/edit-qr/:id" element={<EditQRCode/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
