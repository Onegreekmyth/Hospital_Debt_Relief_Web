import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/Home';
import Signup from './pages/Signup';


function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  )
}

export default App