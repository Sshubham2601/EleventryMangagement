import React from 'react'
import '../assets/Header.css'
import { useNavigate } from 'react-router-dom'
const Header = ({isLogin,setIsLogin}) => {
    const navigate = useNavigate()

    const handleOnClickRegister = ()=>{
        navigate('/register')
    }
    const handleOnClickLogin = ()=>{
        navigate('/login')
    }
    const handleLogoClick = ()=>{
        navigate('/')
    }
    const handleGenerateQRClick = ()=>{
        navigate('/generate-qr')
    }
    const handleScanQRClick = ()=>{
        navigate('/scan-qr')
    }
    const handleOnClickLogout = ()=>{
        localStorage.clear()
        setIsLogin(false)
    }
  return (
    <header className='header'>
        <div className='header-logo' onClick={handleLogoClick}>Inventory Management System</div>
        <div className='header-tagline'>
            <div className='Generate-QR' onClick={handleGenerateQRClick}>Generate QR Code</div>
            <div className='Scan-QR' onClick={handleScanQRClick}>Scan QR Code</div>
        </div>
        <div className='header-btn'>
            {!isLogin?<><button onClick={handleOnClickLogin}>Sign-in</button><button onClick={handleOnClickRegister}>Register</button></>:<button onClick={handleOnClickLogout}>Logout</button>}
        </div>
    </header>
  )
}

export default Header