import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function LogoutButton() {
    const [error, setError] = useState("");
    const navigate = useNavigate();
  
    const handleLogout = () => {
      try {
        // Clear the auth token
        localStorage.removeItem("authToken");
        localStorage.removeItem("userId");
        localStorage.removeItem("userData");
  
        // Redirect to login page using navigate
        navigate('/login');
      } catch (error) {
        console.error("Error during logout:", error);
        setError("Logout failed");
      }
    };
  
    return (
      <div>
        <button onClick={handleLogout} className="btn btn-danger btn-sm">
          <i className="bi bi-box-arrow-right me-1"></i>
          Logout
        </button>
        {error && <p className="text-danger mt-2">{error}</p>}
      </div>
    );
  }

export default LogoutButton;
