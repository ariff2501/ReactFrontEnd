// import React from "react";
// import { Link } from "react-router-dom";
// import "./Navbar.css"; // Assuming you have a CSS file for styling
// // import 'navbar.css';

// function Navbar() {
//   return (
//     <div className="flex-container">
//       <aside className="vertical-sidebar">
//         <input
//           type="checkbox"
//           role="switch"
//           id="checkbox-input"
//           className="checkbox-input"
//         />
//         <nav>
//           <header>
//             <div className="sidebar__toggle-container">
//               <label
//                 htmlFor="checkbox-input"
//                 id="label-for-checkbox-input"
//                 className="nav__toggle"
//               ></label>
//               <span className="toggle--icons" aria-hidden="true">
//                 {" "}
//                 <svg
//                   width="24"
//                   height="24"
//                   viewBox="0 0 24 24"
//                   className="toggle-svg-icon toggle--open"
//                 ></svg>
//               </span>
//             </div>
//           </header>
//           <section className="sidebar__wrapper">
//             <ul className="sidebar__list list--primary">
//               {/* Use Link instead of a */}
//               <li className="sidebar__item">
//                 <Link to="/" className="sidebar__link">
//                   <span className="text">Home</span>
//                 </Link>
//               </li>
//               <li className="sidebar__item">
//                 <Link to="/profile" className="sidebar__link">
//                   <span className="text">My Profile</span>
//                 </Link>
//               </li>
//               <li className="sidebar__item">
//                 <Link to="/activities" className="sidebar__link">
//                   <span className="text">Activities</span>
//                 </Link>
//               </li>
//             </ul>
//           </section>
//         </nav>
//       </aside>
//     </div>
//   );
// }

// export default Navbar;

import React from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  
  // Function to check if a link is active
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // Navigation items
  const navItems = [
    { path: "/", label: "Dashboard", icon: "home" },
    { path: "/profile", label: "My Profile", icon: "user" },
    { path: "/activities", label: "Activities", icon: "clipboard" }
  ];

  return (
    <div className="w-full">
      {/* Logo/Brand */}
      <div className="mb-6 flex items-center justify-center">
        <h1 className="text-xl font-bold text-indigo-600">AppName</h1>
      </div>
      
      {/* Navigation Links */}
      <nav>
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                  isActive(item.path)
                    ? "bg-indigo-50 text-indigo-600 font-medium"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {/* Icon */}
                {item.icon === "home" && (
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                  </svg>
                )}
                {item.icon === "user" && (
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                )}
                {item.icon === "clipboard" && (
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                  </svg>
                )}
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;