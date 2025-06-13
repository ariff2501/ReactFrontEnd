import { useState } from "react";
import reactLogo from "./assets/react.svg";
import Navbar from "./components/Navbar/Navbar";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import DashboardLayout from "./components/DashboardLayout/DashboardLayout";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home/Home";
import Profile from "./components/Profile/Profile";
import Activities from "./components/Activities/Activities";
import AuthGuard from "./components/AuthGuard/AuthGuard";
import ActivityCalendar from "./components/ActivityCalendar/ActivityCalendar";

function App() {
  return (
    <Router>
      <Routes>
        {/* Main route uses DashboardLayout as a wrapper */}

        <Route
          path="/"
          element={
            <AuthGuard>
              <DashboardLayout />
            </AuthGuard>
          }
        >
          {/* Nested routes inside dashboard */}
          <Route index element={<Home />} />
          <Route path="profile" element={<Profile role="hr"/>} />
          <Route path="activities" element={<Activities />} />
          <Route path="activityCalendar" element={<ActivityCalendar/>} />
        </Route>

        {/* Login and Register routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* You can add other non-dashboard routes globally if needed */}
      </Routes>
    </Router>
  );
}

export default App;
