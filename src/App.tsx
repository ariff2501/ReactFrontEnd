import { useState } from 'react'
import reactLogo from './assets/react.svg'
import Message from './Message'
import Navbar from './components/Navbar'  
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import { BrowserRouter as Router,Route, Routes } from 'react-router-dom'
import './App.css'


function App() {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<Message />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
