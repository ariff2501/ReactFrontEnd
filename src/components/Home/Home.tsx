import { useState, useEffect } from "react";
import {
  format,
  isPast,
  isToday,
  isTomorrow,
  compareAsc,
  differenceInSeconds,
  set,
} from "date-fns";
import {
  Calendar,
  Clock,
  User,
  MapPin,
  Building,
  Home,
  Timer,
} from "lucide-react";

// Match your existing Activity interface
interface Activity {
  id: number;
  employee_id: number;
  activity_type: string; // 'Vacation', 'Sick Leave', 'Remote Work', 'Training', etc.
  start_date: string; // Format: "dd/MM/yyyy"
  end_date: string; // Format: "dd/MM/yyyy"
  description?: string; // Optional field for additional info
}

export default function EmployeeAvailability() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [countdownText, setCountdownText] = useState<string>("");
  const [countdownStatus, setCountdownStatus] = useState<
    "future" | "today" | "in-progress" | "none"
  >("none");

  // Update the current date/time and countdown every minute
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentDateTime(now);

      // Update countdown if we have a closest activity
      if (closestActivity) {
        updateCountdown(now);
      }
    }, 60000); // Update every minute

    // Clean up on unmount
    return () => clearInterval(timer);
  }, [activities]); // Re-establish timer when activities change

  // Calculate and update countdown text
  const updateCountdown = (now: Date) => {
    if (!closestActivity) {
      setCountdownText("");
      setCountdownStatus("none");
      return;
    }

    const startDate = parseDate(closestActivity.start_date);

    // Check if activity is today
    if (isToday(startDate)) {
      // If it's today but in the future
      if (startDate > now) {
        // Calculate hours and minutes until activity
        const diffSeconds = differenceInSeconds(startDate, now);
        const hours = Math.floor(diffSeconds / 3600);
        const minutes = Math.floor((diffSeconds % 3600) / 60);

        if (hours > 0) {
          setCountdownText(
            `${hours} hour${hours > 1 ? "s" : ""} and ${minutes} minute${
              minutes > 1 ? "s" : ""
            }`
          );
        } else {
          setCountdownText(`${minutes} minute${minutes > 1 ? "s" : ""}`);
        }
        setCountdownStatus("today");
      } else {
        // Activity is in progress today
        setCountdownText("in progress now");
        setCountdownStatus("in-progress");
      }
    } else {
      // Activity is in the future (not today)
      const diffDays = Math.ceil(
        (startDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
      );
      setCountdownText(`${diffDays} day${diffDays > 1 ? "s" : ""}`);
      setCountdownStatus("future");
    }
  };

  // Simulate API fetch
  useEffect(() => {
    const fetchActivities = async () => {
      try {
        setLoading(true);
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const token = localStorage.getItem("authToken");
        const userId = localStorage.getItem("userId");
        const response = await fetch(
          `http://localhost:3000/api/activities/user/${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch activities");
        }
        const data = await response.json();
        setActivities(data.data);
        console.log("Activities fetched:", data);

        // Get current date in dd/MM/yyyy format
        const today = new Date();
        const formatDateString = (date: Date) => {
          const day = String(date.getDate()).padStart(2, "0");
          const month = String(date.getMonth() + 1).padStart(2, "0");
          const year = date.getFullYear();
          return `${day}/${month}/${year}`;
        };

        // // Create tomorrow's date
        // const tomorrow = new Date(today);
        // tomorrow.setDate(tomorrow.getDate() + 1);

        // // Create dates for next week
        // const nextWeek = new Date(today);
        // nextWeek.setDate(nextWeek.getDate() + 7);

        // const nextWeekPlus1 = new Date(nextWeek);
        // nextWeekPlus1.setDate(nextWeekPlus1.getDate() + 1);

        // const nextWeekPlus2 = new Date(nextWeek);
        // nextWeekPlus2.setDate(nextWeekPlus2.getDate() + 2);

        // const nextWeekPlus5 = new Date(nextWeek);
        // nextWeekPlus5.setDate(nextWeekPlus5.getDate() + 5);

        // Mock data with current dates
        // const mockActivities: Activity[] = [
        //   {
        //     id: 1,
        //     employee_id: 101,
        //     activity_type: "Remote Work",
        //     start_date: formatDateString(today),
        //     end_date: formatDateString(today),
        //     description: "Working from home"
        //   },
        //   {
        //     id: 2,
        //     employee_id: 101,
        //     activity_type: "Vacation",
        //     start_date: formatDateString(tomorrow),
        //     end_date: formatDateString(nextWeek),
        //     description: "Annual leave"
        //   },
        //   {
        //     id: 3,
        //     employee_id: 101,
        //     activity_type: "Training",
        //     start_date: formatDateString(nextWeekPlus1),
        //     end_date: formatDateString(nextWeekPlus2),
        //     description: "Technical certification"
        //   },
        //   {
        //     id: 4,
        //     employee_id: 101,
        //     activity_type: "Sick Leave",
        //     start_date: formatDateString(nextWeekPlus2),
        //     end_date: formatDateString(nextWeekPlus2)
        //   },
        //   {
        //     id: 5,
        //     employee_id: 101,
        //     activity_type: "Remote Work",
        //     start_date: formatDateString(nextWeekPlus5),
        //     end_date: formatDateString(nextWeekPlus5),
        //     description: "Client site visit"
        //   }
        // ];

        // setActivities(mockActivities);
        setLoading(false);

        // Initialize countdown
        updateCountdown(new Date());
      } catch (err) {
        console.error("Error fetching activities:", err);
        setError("Failed to load upcoming activities");
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  // Parse dates for comparison (assuming dd/MM/yyyy format)
  const parseDate = (dateString: string) => {
    const [day, month, year] = dateString.split("/").map(Number);
    return new Date(year, month - 1, day);
  };

  // Find the closest upcoming activity (starting today or in the future)
  const closestActivity = activities
    .filter((activity) => {
      const startDate = parseDate(activity.start_date);
      // Include activities that start today or in the future
      return isToday(startDate) || startDate > new Date();
    })
    .sort((a, b) =>
      compareAsc(parseDate(a.start_date), parseDate(b.start_date))
    )[0];

  // Get date display label
  const getDateLabel = (dateString: string) => {
    const date = parseDate(dateString);
    if (isToday(date)) return "Today";
    if (isTomorrow(date)) return "Tomorrow";
    return format(date, "EEE, MMM d");
  };

  // Format date range
  const formatDateRange = (startDate: string, endDate: string) => {
    const start = parseDate(startDate);
    const end = parseDate(endDate);

    if (format(start, "yyyy-MM-dd") === format(end, "yyyy-MM-dd")) {
      return getDateLabel(startDate);
    }

    return `${getDateLabel(startDate)} - ${getDateLabel(endDate)}`;
  };

  // Get type-based styling
  const getActivityTypeStyle = (type: string) => {
    switch (type.toLowerCase()) {
      case "vacation":
        return {
          bgColor: "bg-blue-100",
          textColor: "text-blue-800",
          icon: <Calendar size={16} className="text-blue-500" />,
        };
      case "sick leave":
        return {
          bgColor: "bg-red-100",
          textColor: "text-red-800",
          icon: <Clock size={16} className="text-red-500" />,
        };
      case "remote work":
        return {
          bgColor: "bg-green-100",
          textColor: "text-green-800",
          icon: <Home size={16} className="text-green-500" />,
        };
      case "training":
        return {
          bgColor: "bg-purple-100",
          textColor: "text-purple-800",
          icon: <User size={16} className="text-purple-500" />,
        };
      case "meeting":
        return {
          bgColor: "bg-purple-100",
          textColor: "text-purple-800",
          icon: <Calendar size={16} className="text-purple-500" />,
        };
      default:
        return {
          bgColor: "bg-gray-100",
          textColor: "text-gray-800",
          icon: <Calendar size={16} className="text-gray-500" />,
        };
    }
  };

  // Get countdown styling based on status
  const getCountdownStyle = () => {
    switch (countdownStatus) {
      case "today":
        return "text-orange-600 bg-orange-50 border-orange-200";
      case "in-progress":
        return "text-green-600 bg-green-50 border-green-200";
      case "future":
        return "text-blue-600 bg-blue-50 border-blue-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  // Calculate duration in days
  const getDurationDays = (startDate: string, endDate: string) => {
    const start = parseDate(startDate);
    const end = parseDate(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays + 1; // Include both start and end days
  };

  if (loading) {
    return (
      <div className="rounded-lg bg-white shadow p-6 animate-pulse">
        <div className="h-10 bg-slate-200 rounded w-full mb-4"></div>
        <div className="h-6 bg-slate-200 rounded w-1/3 mb-4"></div>
        <div className="h-8 bg-slate-200 rounded w-2/3 mb-4"></div>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 bg-slate-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg bg-white shadow p-6">
        <div className="text-red-500 flex items-center justify-center h-40">
          <Clock className="mr-2" />
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg bg-white shadow">
      {/* Current Date/Time Bar - Made more prominent */}
      <div className="bg-indigo-600 px-6 py-4 rounded-t-lg flex justify-between items-center shadow-md">
        <div className="flex items-center text-white">
          <Calendar size={20} className="mr-3" />
          <span className="font-bold text-xl">
            {format(currentDateTime, "EEEE, MMMM d, yyyy")}
          </span>
        </div>
        <div className="flex items-center text-indigo-100 bg-indigo-700 px-3 py-1.5 rounded-md">
          <Clock size={16} className="mr-2" />
          <span className="font-medium">
            {format(currentDateTime, "h:mm a")}
          </span>
        </div>
      </div>

      {/* Title - Less prominent than the date bar */}
      <div className="p-5 pb-3 border-b border-gray-100">
        <h2 className="text-lg text-gray-700">Your upcoming agendas</h2>
        <p className="text-sm text-gray-500"></p>

        {/* Countdown Timer */}
        {closestActivity && countdownText && (
          <div
            className={`mt-3 flex items-center px-4 py-2 rounded-md border ${getCountdownStyle()}`}
          >
            <Timer size={18} className="mr-2" />
            <span className="font-medium">
              {countdownStatus === "in-progress"
                ? "Current agenda: "
                : "Your next agenda is in "}
              <span className="font-bold">{countdownText}</span>
            </span>
          </div>
        )}
      </div>

      {/* Content container - For empty state or activities */}
      <div className="p-5">
        {activities.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            <Building className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2">No upcoming schedule changes</p>
            <p className="text-sm text-gray-400">
              Employee is working as usual
            </p>
          </div>
        ) : (
          <>
            {/* Next upcoming availability change */}
            {closestActivity && (
              <div>
                <div className="text-sm font-medium text-indigo-600 mb-2">
                  NEXT AGENDA
                </div>
                <div className="border-2 border-indigo-500 rounded-lg p-4 bg-indigo-50 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500"></div>

                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-lg text-gray-900">
                      {closestActivity.activity_type}
                    </h3>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        getActivityTypeStyle(closestActivity.activity_type)
                          .bgColor
                      } ${
                        getActivityTypeStyle(closestActivity.activity_type)
                          .textColor
                      }`}
                    >
                      {getDurationDays(
                        closestActivity.start_date,
                        closestActivity.end_date
                      )}{" "}
                      day
                      {getDurationDays(
                        closestActivity.start_date,
                        closestActivity.end_date
                      ) > 1
                        ? "s"
                        : ""}
                    </span>
                  </div>

                  {closestActivity.description && (
                    <p className="text-gray-600 mt-1">
                      {closestActivity.description}
                    </p>
                  )}

                  <div className="mt-4 flex items-center text-sm text-gray-700">
                    <Calendar size={16} className="mr-1.5 text-gray-500" />
                    <span>
                      {formatDateRange(
                        closestActivity.start_date,
                        closestActivity.end_date
                      )}
                    </span>
                  </div>

                  <div className="mt-4 flex items-center text-sm text-gray-700">
                    <User size={16} className="mr-1.5 text-gray-500" />
                    <span>Employee #{closestActivity.employee_id}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Timeline of upcoming activities */}
            <div className="mt-6">
              <div className="text-sm font-medium text-gray-500 mb-3">
                AGENDA TIMELINE
              </div>
              <div className="border-l-2 border-gray-200 ml-3 space-y-6 pl-8 relative">
                {activities
                  .filter((activity) => activity.id !== closestActivity?.id)
                  .sort((a, b) =>
                    compareAsc(parseDate(a.start_date), parseDate(b.start_date))
                  )
                  .map((activity) => {
                    const typeStyle = getActivityTypeStyle(
                      activity.activity_type
                    );

                    return (
                      <div key={activity.id} className="relative">
                        {/* Timeline dot */}
                        <div
                          className={`absolute -left-[42px] mt-1.5 w-5 h-5 rounded-full ${typeStyle.bgColor} border-4 border-white shadow flex items-center justify-center`}
                        >
                          {typeStyle.icon}
                        </div>

                        {/* Activity card */}
                        <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium text-gray-900">
                                {activity.activity_type}
                              </h4>
                              {activity.description && (
                                <p className="text-sm text-gray-600 mt-1">
                                  {activity.description}
                                </p>
                              )}
                            </div>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${typeStyle.bgColor} ${typeStyle.textColor}`}
                            >
                              {getDurationDays(
                                activity.start_date,
                                activity.end_date
                              )}{" "}
                              day
                              {getDurationDays(
                                activity.start_date,
                                activity.end_date
                              ) > 1
                                ? "s"
                                : ""}
                            </span>
                          </div>

                          <div className="mt-3 flex items-center text-sm text-gray-500">
                            <Calendar size={14} className="mr-1.5" />
                            <span>
                              {formatDateRange(
                                activity.start_date,
                                activity.end_date
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
