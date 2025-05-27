import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Assuming you have a CSS file for styling
// import 'navbar.css';

function Navbar() {
  return (
    <nav className="bg-blue-600 p-4">
      <ul className="flex space-x-4">
        {/* Use Link instead of a */}
        <li>
          <Link to="/" className="hover:text-gray-300">Home</Link>
        </li>
        <li>
          <Link to="/profile" className="hover:text-gray-300">My Profile</Link>
        </li>
        <li>
          <Link to="#" className="hover:text-gray-300">Activities</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
