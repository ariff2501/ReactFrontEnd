import React from 'react';
import './Navbar.css'; // Assuming you have a CSS file for styling
// import 'navbar.css';

function Navbar() {
  return (
    <nav className="bg-blue-600 p-4">
      <ul className="fl ">
        <li>
          <a href="#home" className="hover:text-gray-300">
            My Profile
          </a>
        </li>
        <li>
          <a href="/login" className="hover:text-gray-300">
            Employees
          </a>
        </li>
        <li>
          <a href="#contact" className="hover:text-gray-300">
            Activities
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
