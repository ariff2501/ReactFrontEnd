// import React from "react";
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import "./Login.css";

// const Login = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState(false);

//   const [shake, setShake] = useState(false);

//   const triggerShake = () => {
//     setShake(true);
//     setTimeout(() => {
//       setShake(false);
//     }, 500);
//   };
//   const navigate = useNavigate();

//   const handleSubmit = async (event: React.MouseEvent) => {
//     event.preventDefault();

//     const data = {
//       username: username,
//       password: password,
//     };

//     try {
//       const response = await fetch("http://localhost:3000/api/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//       });
//       if (response.ok) {
//         const jsonResponse = await response.json();
//         console.log("Login successful");
//         setError("");
//         setSuccess(true);
//         // Assuming jsonResponse contains the token as jsonResponse.token
//         localStorage.setItem("authToken", jsonResponse.token);
//         localStorage.setItem("userId", jsonResponse.user.id); // Store user ID if needed
//         // console.log("Auth token stored in localStorage:", localStorage.getItem("authToken"));
//         // console.log("User ID stored in localStorage:", localStorage.getItem("userId"));
//         navigate('/');

//         // Handle success scenario, redirect to another page
//       } else {
//         // console.error('Login failed:', response.status  , response.statusText);
//         const errorResponse = await response.json();
//         // console.error("Error details:", errorResponse);
//         // Handle error scenario
//         setError(errorResponse.message || "Login failed");
//         triggerShake();
//       }
//     } catch (error) {
//       // console.error("Error:", error);
//       setError(
//         error instanceof Error ? error.message : "An unexpected error occurred"
//       );
//     }
//   };

//   const handleLogout = () => {
//     setSuccess(false);
//     setUsername("");
//     setPassword("");
//     setError("");
  
//     try {
//       // Clear the auth token
//       localStorage.removeItem('authToken');
  
//       // Optionally, redirect to login page or any other page
//       // navigate('/login'); // If using react-router's useNavigate hook
//     } catch (error) {
//       console.error("Error during logout:", error);
//       setError("Logout failed");
//     }
//   };
//   return (
//     <div className=" col sm">
//       <div className="container mt-5">
//         <div className="row">
//           <div className="col-md-12">
//             <h2>Login</h2>
//             {error && (
//               <div className={`alert alert-danger ${shake ? "shake" : ""}`}>
//                 {error}
//               </div>
//             )}
//             {success && (
//               <div className="alert alert-success">Login successful!</div>
//             )}
//             <div className="form-group">
//               <label htmlFor="username">Username</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="username"
//                 name="username"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//               />
//             </div>
//             <div className="form-group">
//               <label htmlFor="password">Password</label>
//               <input
//                 type="password"
//                 className="form-control"
//                 id="password"
//                 name="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//             </div>
//             <div className="form-group">
//               {!success && (
//                 <button
//                   type="button"
//                   className="btn btn-primary mt-3 mx-3"
//                   onClick={handleSubmit}
//                 >
//                   Login
//                 </button>
//               )}

//               <button
//                 type="button"
//                 className="btn btn-secondary mt-3 mx-3"
//                 onClick={() => navigate("/register")}
//               >
//                 Register
//               </button>
//               {success && (
//                 <button
//                   className="btn btn-danger mt-3 mx-3"
//                   onClick={handleLogout}
//                 >
//                   Logout
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default Login;

import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [shake, setShake] = useState(false);
  const navigate = useNavigate();

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => {
      setShake(false);
    }, 500);
  };

  const handleSubmit = async (event : React.FormEvent<HTMLFormElement>) => {
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
        console.log("Login successful");
        setError("");
        setSuccess(true);
        localStorage.setItem("authToken", jsonResponse.token);
        localStorage.setItem("userId", jsonResponse.user.id);
        navigate('/');
      } else {
        const errorResponse = await response.json();
        setError(errorResponse.message || "Login failed");
        triggerShake();
      }
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
    }
  };

  const handleLogout = () => {
    setSuccess(false);
    setUsername("");
    setPassword("");
    setError("");
  
    try {
      localStorage.removeItem('authToken');
    } catch (error) {
      console.error("Error during logout:", error);
      setError("Logout failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        
        {/* Error message */}
        {error && (
          <div className={`${shake ? "animate-shake" : ""} rounded-md bg-red-50 p-4 mb-4`}>
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-red-800">{error}</p>
              </div>
            </div>
          </div>
        )}
        
        {/* Success message */}
        {success && (
          <div className="rounded-md bg-green-50 p-4 mb-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-green-800">Login successful!</p>
              </div>
            </div>
          </div>
        )}
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="mb-4">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                Forgot your password?
              </a>
            </div>
          </div>

          <div className="flex space-x-4">
            {!success && (
              <button
                type="submit"
                className="group relative flex-1 justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign in
              </button>
            )}
            
            <button
              type="button"
              className="group relative flex-1 justify-center py-2 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={() => navigate("/register")}
            >
              Register
            </button>
            
            {success && (
              <button
                type="button"
                className="group relative flex-1 justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                onClick={handleLogout}
              >
                Logout
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

// Add this to your global CSS or create a custom Tailwind plugin
// Add to tailwind.config.js under extend.animation
// animation: {
//   shake: 'shake 0.5s cubic-bezier(.36,.07,.19,.97) both',
// },
// keyframes: {
//   shake: {
//     '10%, 90%': { transform: 'translate3d(-1px, 0, 0)' },
//     '20%, 80%': { transform: 'translate3d(2px, 0, 0)' },
//     '30%, 50%, 70%': { transform: 'translate3d(-4px, 0, 0)' },
//     '40%, 60%': { transform: 'translate3d(4px, 0, 0)' },
//   },
// },

export default Login;