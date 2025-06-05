// import { useEffect, useState } from "react";
// import { parse, format, set } from 'date-fns';

// interface Activity {
//   id: number;
//   employee_id: number;
//   activity_type: string;
//   start_date: string;
//   end_date: string;
// }
// function formatDate(dateString: string) {
//     try {
//       const parsedDate = parse(dateString, 'dd/MM/yyyy', new Date());
//       return format(parsedDate, 'dd/MM/yyyy');
//     } catch {
//       return 'Invalid Date';
//     }
//   }
  
// function Activities() {
//   const [activities, setActivities] = useState<Activity[]>([]);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(true); 

//   useEffect(() => {
//     const fetchActivities = async () => {
//     setLoading(true);
//       try {
//         const response = await fetch("http://localhost:3000/api/activities");
//         if (!response.ok) {
//           const errorResponse = await response.json();
//           throw new Error(errorResponse.message || "Failed to fetch activities."); 
//         }
//         const data = await response.json();
//         setActivities(data);
//         console.log("Activities fetched successfully:", data);
//       } catch (error) {
//         setError(error instanceof Error ? error.message : "Failed to fetch activities. Please try again later.");
//       }finally {
//         setLoading(false);
//       }
//     };

//     fetchActivities();
//   }, []);

//   if(error) {
//     return <div className={`alert alert-danger `}>{error}</div>;
//   }
//   if(loading) {
//     return <div className={`alert `}>Loading...</div>;
//   }
//   return (
//     <div className="flex flex-col items-start">
//       {activities.map(activity => (
//         <div key={activity.id} className="mb-4">
//           <span className="font-bold">{activity.start_date} - {activity.end_date}:</span>
//           <span className="ml-2">{activity.activity_type} by Employee {activity.employee_id}</span>
//         </div>
//       ))}
//     </div>
//   );

// //   return (
// //     <div>
// //       <h1>Activities</h1>
// //       <ul>
// //         {activities.map((activity) => (
// //           <li key={activity.id}>
// //             <strong>Activity ID:</strong> {activity.id} | 
// //             <strong>Employee ID:</strong> {activity.employee_id} | 
// //             <strong>Type:</strong> {activity.activity_type} | 
// //             <strong>Start Date:</strong> {formatDate(activity.start_date)} | 
// //             <strong>End Date:</strong> {formatDate(activity.end_date)}
// //           </li>
// //         ))}
// //       </ul>
// //     </div>
// //   );
// }

// export default Activities;
import { useEffect, useState } from "react";
import { parse, format, isValid } from 'date-fns';

interface Activity {
  id: number;
  employee_id: number;
  activity_type: string;
  start_date: string;
  end_date: string;
}

function formatDate(dateString: string) {
  try {
    const parsedDate = parse(dateString, 'dd/MM/yyyy', new Date());
    return isValid(parsedDate) ? format(parsedDate, 'dd MMM yyyy') : 'Invalid Date';
  } catch {
    return 'Invalid Date';
  }
}

function Activities() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [sortBy, setSortBy] = useState<"date" | "type" | "employee">("date");

  useEffect(() => {
    const fetchActivities = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:3000/api/activities");
        if (!response.ok) {
          const errorResponse = await response.json();
          throw new Error(errorResponse.message || "Failed to fetch activities.");
        }
        const data = await response.json();
        setActivities(data);
        console.log("Activities fetched successfully:", data);
      } catch (error) {
        setError(error instanceof Error ? error.message : "Failed to fetch activities. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  // Get unique activity types for filter dropdown
  const activityTypes = [...new Set(activities.map(a => a.activity_type))];

  // Filter and sort activities
  const filteredActivities = activities
    .filter(activity => filter === "" || activity.activity_type === filter)
    .sort((a, b) => {
      if (sortBy === "date") {
        return new Date(a.start_date).getTime() - new Date(b.start_date).getTime();
      } else if (sortBy === "type") {
        return a.activity_type.localeCompare(b.activity_type);
      } else {
        return a.employee_id - b.employee_id;
      }
    });

  // Activity type color mapping
  const getActivityTypeColor = (type: string) => {
    const colorMap: {[key: string]: string} = {
      "Meeting": "bg-blue-100 text-blue-800",
      "Training": "bg-green-100 text-green-800",
      "Vacation": "bg-yellow-100 text-yellow-800",
      "Sick Leave": "bg-red-100 text-red-800",
      "Project": "bg-purple-100 text-purple-800",
      // Add more mappings as needed
    };
    
    return colorMap[type] || "bg-gray-100 text-gray-800";
  };

  if (error) {
    return (
      <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">
        <span className="font-medium">Error:</span> {error}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Employee Activities</h1>
        
        {/* Controls row */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 space-y-3 md:space-y-0">
          {/* Filter dropdown */}
          <div className="flex items-center">
            <label htmlFor="filter" className="mr-2 text-sm font-medium text-gray-700">
              Filter by type:
            </label>
            <select
              id="filter"
              className="border border-gray-300 rounded-md px-3 py-1.5 text-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="">All Types</option>
              {activityTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          
          {/* Sort options */}
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-gray-700">Sort by:</span>
            <div className="flex bg-gray-100 rounded-md p-1">
              <button
                className={`px-3 py-1 text-sm rounded-md ${sortBy === "date" ? "bg-white shadow-sm" : "text-gray-600 hover:bg-gray-200"}`}
                onClick={() => setSortBy("date")}
              >
                Date
              </button>
              <button
                className={`px-3 py-1 text-sm rounded-md ${sortBy === "type" ? "bg-white shadow-sm" : "text-gray-600 hover:bg-gray-200"}`}
                onClick={() => setSortBy("type")}
              >
                Type
              </button>
              <button
                className={`px-3 py-1 text-sm rounded-md ${sortBy === "employee" ? "bg-white shadow-sm" : "text-gray-600 hover:bg-gray-200"}`}
                onClick={() => setSortBy("employee")}
              >
                Employee
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Loading state */}
      {loading ? (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
          <span className="ml-3 text-gray-600">Loading activities...</span>
        </div>
      ) : filteredActivities.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No activities found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {filter ? `No ${filter} activities found.` : "No activities to display."}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Timeline */}
          <div className="border-l-2 border-indigo-200 ml-3 space-y-6 pl-8 relative">
            {filteredActivities.map((activity, index) => (
              <div key={activity.id} className="relative">
                {/* Timeline dot */}
                <div className="absolute -left-[42px] mt-1.5 w-5 h-5 rounded-full bg-indigo-500 border-4 border-white shadow"></div>
                
                {/* Activity card */}
                <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow p-4">
                  <div className="flex flex-col md:flex-row justify-between md:items-center mb-2">
                    <div className="flex items-center mb-2 md:mb-0">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getActivityTypeColor(activity.activity_type)}`}>
                        {activity.activity_type}
                      </span>
                      <span className="ml-2 text-sm text-gray-500">
                        Employee #{activity.employee_id}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500">
                      ID: {activity.id}
                    </div>
                  </div>
                  
                  <div className="flex items-center mt-2">
                    <svg className="h-5 w-5 text-gray-400 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <div>
                      <span className="font-medium text-gray-700">{formatDate(activity.start_date)}</span>
                      <span className="mx-2 text-gray-400">to</span>
                      <span className="font-medium text-gray-700">{formatDate(activity.end_date)}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Activities;