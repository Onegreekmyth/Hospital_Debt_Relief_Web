import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/Home';
import Signup from './pages/Signup';
import OTPVerification from './pages/OTPVerification';
import Dashboard from './pages/Dashboard';


function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/otp-verification" element={<OTPVerification />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  )
}

export default App