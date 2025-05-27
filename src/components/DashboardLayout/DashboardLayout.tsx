import React from "react";
import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";
function DashboardLayout() {
  // This component serves as the main layout for the dashboard
  // It can include a sidebar, header, and main content area
  // You can add your sidebar and header components here

  // Example structure:
  // return (
  //   <div className="container-fluid vh-100 p-0">
  //     <div className="row h-100 g-0">
  //       <Sidebar />
  //       <Header />
  //       <MainContent />
  //     </div>
  //   </div>
  // );
  return (
    <div className="container-fluid vh-100 p-0">
      <div className="row h-100 g-0">
        {/* Sidebar */}
        <div className="col-auto bg-light border-end p-4" style={{ width: '250px' }}>
          <div className="h-100 border border-2 border-dashed rounded d-flex justify-content-center text-muted">
              <Navbar />
          </div>
        </div>
        
        {/* Header and Main Content Column */}
        <div className="col d-flex flex-column h-100">
          {/* Top Utility Bar */}
          <div className="bg-dark text-white py-2 px-4 d-flex justify-content-end align-items-center">
            {/* Search Bar */}
            <div className="me-3">
              <div className="input-group">
                <input 
                  type="text" 
                  className="form-control form-control-sm" 
                  placeholder="Search..." 
                  aria-label="Search"
                />
                <button className="btn btn-outline-light btn-sm" type="button">
                  <i className="bi bi-search"></i>
                  Search
                </button>
              </div>
            </div>
            {/* Settings Icon */}
            <button className="btn btn-link text-white me-3" title="Settings">
              <i className="bi bi-gear-fill"></i>
              <span className="ms-1 d-none d-md-inline">Settings</span>
            </button>
            {/* Logout Button */}
            <button className="btn btn-danger btn-sm">
              <i className="bi bi-box-arrow-right me-1"></i>
              Logout
            </button>
           </div> 
          {/* Header */}
          <div className="bg-white border-bottom p-4" style={{ height: '100px' }}>
            <div className="h-100 border border-2 border-dashed rounded d-flex align-items-center justify-content-center text-muted">
              Header / Title Area
            </div>
          </div>
          
          {/* Main Content */}
          <div className="flex-grow-1 p-4 overflow-auto">
          <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;
