import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

function AuthGuard({ children }: { children: JSX.Element }) {
  const [isValidating, setIsValidating] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setIsAuthenticated(false);
        setIsValidating(false);
        return;
      }

      try {
        const response = await fetch(
          "http://localhost:3000/api/validate-token",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          setIsAuthenticated(true);
          console.log("Token is valid");
        } else {
          const errorData = await response.json();
          setIsAuthenticated(false);
          throw new Error(
            errorData.message || "Failed to validate token"
          );
        }
      } catch (error) {
        console.error("Error validating token:", error);
        setIsAuthenticated(false);
      } finally {
        setIsValidating(false);
      }
    };
    validateToken();
  }, []);

  if (isValidating) {
    return <div>Validating authentication...</div>; // Or a spinner/loader component
  }
  return isAuthenticated ? children : <Navigate to="/login" state={{ from: location }} replace />;
}

export default AuthGuard;
