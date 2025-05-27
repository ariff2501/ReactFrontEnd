import { useState } from 'react'
import reactLogo from './assets/react.svg'
import Navbar from './components/Navbar/Navbar'  
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import DashboardLayout from './components/DashboardLayout/DashboardLayout'
import { BrowserRouter as Router,Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './components/Home/Home'
import Profile from './components/Profile/Profile'


function App() {
  return (
    <Router>
      <Routes>

        {/* Main route uses DashboardLayout as a wrapper */}
        <Route path="/" element={<DashboardLayout />}>
          {/* Nested routes inside dashboard */}
          <Route index element={<Home />} />           
          <Route path="profile" element={<Profile />} />
        </Route>

        {/* You can add other non-dashboard routes globally if needed */}
      </Routes>
    </Router>
  );
  
}

export default App
