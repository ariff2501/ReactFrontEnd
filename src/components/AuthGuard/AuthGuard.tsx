import { Navigate } from "react-router-dom";

function AuthGuard({ children }: { children: JSX.Element }) {
  const isAuthenticated = Boolean(localStorage.getItem("authToken"));

  return isAuthenticated ? children : <Navigate to="/login" />;
}

export default AuthGuard;