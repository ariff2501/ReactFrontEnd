import { Calendar } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface NavbarProps {
  onAddActivity?: () => void;
  userRole: string; // Optional role prop if needed for future use
}

function Navbar({ onAddActivity, userRole }: NavbarProps) {
  const location = useLocation();

  const isActive = (path: string): boolean => {
    return location.pathname === path;
  };

  const navItems = [
    { path: "/", label: "Dashboard", icon: "home" },
    { path: "/profile", label: "My Profile", icon: "user" },
    {
      path: "/activities",
      label: "Activities",
      icon: "clipboard",
      hasAction: true,
      roleRequired:"admin"
    },
    { path: "/activityCalendar", label: "Calendar View", icon: "calendar" },
  ];

  // Filter nav items based on user role
  const authorizedNavItems = navItems.filter(item => {
    // If no role required, show to everyone
    if (!item.roleRequired) return true;
    
    // If roleRequired is an array, check if user's role is in the array
    if (Array.isArray(item.roleRequired)) {
      return item.roleRequired.includes(userRole);
    }
    
    // If roleRequired is a string, check if it matches user's role
    return item.roleRequired === userRole;
  });

  return (
    <div className="w-full">
      <div className="mb-6 flex items-center justify-center">
        <h1 className="text-xl font-bold text-indigo-600">AppName</h1>
      </div>

      <nav>
        <ul className="space-y-2">
          {authorizedNavItems.map((item) => (
            <li key={item.path}>
              <div className="flex flex-col">
                <Link
                  to={item.path}
                  className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                    isActive(item.path)
                      ? "bg-indigo-50 text-indigo-600 font-medium"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {/* Icons */}
                  {item.icon === "home" && (
                    <svg
                      className="w-5 h-5 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      ></path>
                    </svg>
                  )}
                  {item.icon === "user" && (
                    <svg
                      className="w-5 h-5 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      ></path>
                    </svg>
                  )}
                  {item.icon === "clipboard" && (
                    <svg
                      className="w-5 h-5 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                      ></path>
                    </svg>
                  )}
                  {item.icon === "calendar" && (
                    <Calendar className="w-5 h-5 mr-3" />
                  )}
                  <span>{item.label}</span>
                </Link>

                {/* Add Activity button - only shows under Activities when it's active */}
                {item.hasAction && isActive(item.path) && onAddActivity && (
                  <button
                    onClick={onAddActivity}
                    className="ml-12 mt-2 flex items-center text-sm text-indigo-600 hover:text-indigo-800 font-medium"
                  >
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      ></path>
                    </svg>
                    Add Activity
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
