import { Navigate, Outlet } from 'react-router-dom';

interface RoleGuardProps {
  allowedRoles: string[];
  redirectPath?: string;
}

const RoleGuard = ({ allowedRoles, redirectPath = "/unauthorized" }: RoleGuardProps) => {
  // Get user data from localStorage
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  const userRole = userData.role || "";
  
  // Check if user is logged in
  if (!userData || !userRole) {
    return <Navigate to="/login" replace />;
  }
  
  // Check if user has required role
  if (!allowedRoles.includes(userRole)) {
    return <Navigate to={redirectPath} replace />;
  }
  
  // User is authenticated and authorized, render the protected route
  return <Outlet />;
};

export default RoleGuard;