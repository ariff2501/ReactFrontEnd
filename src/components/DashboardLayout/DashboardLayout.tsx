// import React from "react";
// import Navbar from "../Navbar/Navbar";
// import Sidebar from "../Sidebar/Sidebar";
// import { Outlet } from "react-router-dom";
// import LogoutButton from "../Buttons/LogoutButton";


// function DashboardLayout() {
//   // This component serves as the main layout for the dashboard
//   // It can include a sidebar, header, and main content area
//   return (
//     <div className="container-fluid vh-100 p-0">
//       <div className="row h-100 g-0">
//         {/* Sidebar */}
//         <div className="col-auto bg-light border-end p-2" style={{ width: '250px' }}>
//           <div >
//               <Navbar/>
//           </div>
//         </div>
        
//         {/* Header and Main Content Column */}
//         <div className="col d-flex flex-column h-100">
//           {/* Top Utility Bar */}
//           <div className="bg-dark text-white py-2 px-4 d-flex justify-content-end align-items-center">
//             {/* Search Bar */}
//             <div className="me-3">
//               <div className="input-group">
//                 <input 
//                   type="text" 
//                   className="form-control form-control-sm" 
//                   placeholder="Search..." 
//                   aria-label="Search"
//                 />
//                 <button className="btn btn-outline-light btn-sm" type="button">
//                   <i className="bi bi-search"></i>
//                   Search
//                 </button>
//               </div>
//             </div>
//             {/* Settings Icon */}
//             <button className="btn btn-link text-white me-3" title="Settings">
//               <i className="bi bi-gear-fill"></i>
//               <span className="ms-1 d-none d-md-inline">Settings</span>
//             </button>
//             {/* Logout Button */}
//             <LogoutButton/>
//            </div> 
          
//           {/* Main Content */}
//           <div className="flex-grow-1 p-4 overflow-auto">
//           <Outlet />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default DashboardLayout;

import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import LogoutButton from "../Buttons/LogoutButton";

function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user") || "{}");
    setUserRole(userData.role || "");
  }, []);
  // Handle "Add Activity" button from navbar
  const handleAddActivity = () => {
    // If we're already on the activities page, we'll let the Activities component handle this
    // Otherwise, navigate to activities page and open the modal
    if (location.pathname !== '/activities') {
      navigate('/activities', { state: { openAddModal: true } });
    } else {
      // We need to communicate to the Activities component to open the modal
      // This can be done via context, or by using a custom event
      window.dispatchEvent(new CustomEvent('openAddActivityModal'));
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-white shadow-lg transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="h-full flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <Navbar onAddActivity={handleAddActivity} userRole={userRole}/>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1 w-full">
        {/* Top Utility Bar */}
        <header className="bg-white shadow-sm z-10">
          <div className="px-4 py-3 flex items-center justify-between">
            {/* Menu button (mobile only) */}
            <button 
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Search */}
            <div className="flex-1 max-w-md mx-4">
              <div className="relative">
                <input
                  type="text"
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Search..."
                />
                <div className="absolute left-3 top-2.5 text-gray-400">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Right side utilities */}
            <div className="flex items-center space-x-3">
              <button className="p-2 rounded-full text-gray-600 hover:bg-gray-100 focus:outline-none">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
              <LogoutButton />
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 bg-gray-100">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;