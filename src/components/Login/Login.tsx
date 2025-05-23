import React from "react";
import { useState,useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [shake, setShake] = useState(false);

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => {
      setShake(false);
    }, 500);
  }
  const navigate = useNavigate();

  const handleSubmit = async (event: React.MouseEvent) => {
    event.preventDefault();

    const data = {
      username: username,
      password: password,
    };

    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        const jsonResponse = await response.json();
        console.log("Login successful:", jsonResponse);
        setError("");
        setSuccess(true);

        // Handle success scenario, redirect to another page
      } else {
        // console.error('Login failed:', response.status  , response.statusText);
        const errorResponse = await response.json();
        console.error("Error details:", errorResponse);
        // Handle error scenario
        setError(errorResponse.message || "Login failed");
        triggerShake();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleLogout = async () => {
    setSuccess(false);
    setUsername("");
    setPassword("");


    try {
      const response = await fetch("http://localhost:3000/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        console.log("Logout successful");
        setError("");
        setSuccess(false);
      } else {
        console.error("Logout failed:", response.status, response.statusText);
        const errorResponse = await response.json();
        console.error("Error details:", errorResponse);
        setError(errorResponse.message || "Logout failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div className=" col sm">
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-12">
            <h2>Login</h2>
            {error && (
              <div className={`alert alert-danger ${shake ? 'shake' : ''}`}>
                {error}
              </div>
            )}
            {success && (
              <div className="alert alert-success">Login successful!</div>
            )}
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-group">
                {!success && <button
                type="button"
                className="btn btn-primary mt-3 mx-3"
                onClick={handleSubmit}
              >
                Login
              </button> }
                
              <button type="button" className="btn btn-secondary mt-3 mx-3" onClick={() => navigate("/register")}>
                Register
              </button>
              {success && (
                <button
                  className="btn btn-danger mt-3 mx-3"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
