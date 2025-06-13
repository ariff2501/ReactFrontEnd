import { useState, useEffect } from "react";
import { 
  format, 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval, 
  isSameMonth, 
  isSameDay, 
  addMonths, 
  subMonths,
  parseISO,
  isWithinInterval,
  getDaysInMonth,
  getDay,
  addDays
} from "date-fns";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Info,
  X,
  User,
  MapPin,
  Clock
} from "lucide-react";

// Activity type from your existing code
interface Activity {
  id: number;
  employee_id: number;
  activity_type: string;  // 'Vacation', 'Sick Leave', 'Remote Work', 'Training', etc.
  start_date: string;     // Format: "dd/MM/yyyy"
  end_date: string;       // Format: "dd/MM/yyyy"
  description?: string;   // Optional field for additional info
}

export default function ActivityCalendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [activities, setActivities] = useState<Activity[]>([]);
  const [modalActivity, setModalActivity] = useState<Activity | null>(null);
  const [loading, setLoading] = useState(true);

  // Load activities
  useEffect(() => {
    const loadActivities = async () => {
      setLoading(true);
      // Mock data - in a real app, you'd fetch from an API
      await new Promise(resolve => setTimeout(resolve, 800)); // Simulate API delay
      
      // Sample activity data
      const sampleActivities: Activity[] = [
        {
          id: 1,
          employee_id: 101,
          activity_type: "Vacation",
          start_date: "15/05/2023",
          end_date: "20/05/2023",
          description: "Annual leave"
        },
        {
          id: 2,
          employee_id: 102,
          activity_type: "Training",
          start_date: "08/05/2023",
          end_date: "09/05/2023",
          description: "Product management certification"
        },
        {
          id: 3,
          employee_id: 103,
          activity_type: "Sick Leave",
          start_date: "12/05/2023",
          end_date: "13/05/2023"
        },
        {
          id: 4,
          employee_id: 101,
          activity_type: "Remote Work",
          start_date: "22/05/2023",
          end_date: "26/05/2023",
          description: "Working from home"
        },
        {
          id: 5,
          employee_id: 104,
          activity_type: "Training",
          start_date: "18/05/2023",
          end_date: "19/05/2023",
          description: "Leadership workshop"
        },
        {
          id: 6,
          employee_id: 105,
          activity_type: "Vacation",
          start_date: "01/06/2023",
          end_date: "10/06/2023",
          description: "Summer vacation"
        },
        {
          id: 7,
          employee_id: 106,
          activity_type: "Sick Leave",
          start_date: "05/06/2023",
          end_date: "06/06/2023"
        }
      ];
      
      // Create current month activities
      const thisMonth = new Date();
      const thisMonthStr = format(thisMonth, "MM/yyyy");
      
      // Add some activities for the current month by modifying the sample dates
      const currentMonthActivities = [
        ...sampleActivities,
        {
          id: 8,
          employee_id: 107,
          activity_type: "Remote Work",
          start_date: `05/${thisMonthStr}`,
          end_date: `09/${thisMonthStr}`,
          description: "Working from client site"
        },
        {
          id: 9,
          employee_id: 108,
          activity_type: "Training",
          start_date: `15/${thisMonthStr}`,
          end_date: `16/${thisMonthStr}`,
          description: "Technical training"
        },
        {
          id: 10,
          employee_id: 109,
          activity_type: "Vacation",
          start_date: `20/${thisMonthStr}`,
          end_date: `25/${thisMonthStr}`,
          description: "Personal time off"
        },
        {
          id: 11,
          employee_id: 100,
          activity_type: "Sick Leave",
          start_date: `21/${thisMonthStr}`,
          end_date: `26/${thisMonthStr}`,
          description: "Brain Cancer treatment"
        },
        {
          id: 12,
          employee_id: 105,
          activity_type: "Sick Leave",
          start_date: `21/${thisMonthStr}`,
          end_date: `26/${thisMonthStr}`,
          description: "Brain Cancer treatment"
        },
        {
          id: 13,
          employee_id: 100,
          activity_type: "Sick Leave",
          start_date: `21/${thisMonthStr}`,
          end_date: `26/${thisMonthStr}`,
          description: "Brain Cancer treatment"
        },
        {
          id: 14,
          employee_id: 100,
          activity_type: "Sick Leave",
          start_date: `21/${thisMonthStr}`,
          end_date: `26/${thisMonthStr}`,
          description: "Brain Cancer treatment"
        }
      ];
      
      setActivities(currentMonthActivities);
      setLoading(false);
    };
    
    loadActivities();
  }, []);

  // Parse date from "dd/MM/yyyy" format
  const parseDate = (dateString: string) => {
    const [day, month, year] = dateString.split('/').map(Number);
    return new Date(year, month - 1, day);
  };

  // Helper to get color for activity type
  const getActivityColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'vacation':
        return {
          bg: 'bg-blue-100',
          text: 'text-blue-800',
          border: 'border-blue-200'
        };
      case 'sick leave':
        return {
          bg: 'bg-red-100',
          text: 'text-red-800',
          border: 'border-red-200'
        };
      case 'remote work':
        return {
          bg: 'bg-green-100',
          text: 'text-green-800',
          border: 'border-green-200'
        };
      case 'training':
        return {
          bg: 'bg-purple-100',
          text: 'text-purple-800',
          border: 'border-purple-200'
        };
      default:
        return {
          bg: 'bg-gray-100',
          text: 'text-gray-800',
          border: 'border-gray-200'
        };
    }
  };

  // Get activities for a specific date
  const getActivitiesForDate = (date: Date) => {
    return activities.filter(activity => {
      const startDate = parseDate(activity.start_date);
      const endDate = parseDate(activity.end_date);
      
      return isWithinInterval(date, { start: startDate, end: endDate });
    });
  };

  // Handle month navigation
  const previousMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  
  // Build calendar data
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = monthStart;
  const endDate = monthEnd;
  
  // Get array of days for the month view
  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const startOfGrid = monthStart;
    const dayOfWeek = getDay(startOfGrid); // 0 = Sunday, 1 = Monday, etc.
    
    // Create array of date objects for the calendar grid
    const calendarDays = [];
    
    // Add days from previous month to fill the first row
    const prevMonthDays = dayOfWeek;
    for (let i = prevMonthDays - 1; i >= 0; i--) {
      calendarDays.push(addDays(startOfGrid, -i - 1));
    }
    
    // Add all days of the current month
    for (let i = 0; i < daysInMonth; i++) {
      calendarDays.push(addDays(startOfGrid, i));
    }
    
    // Calculate how many days to add from next month
    const totalCalendarDays = 42; // 6 rows of 7 days
    const nextMonthDays = totalCalendarDays - calendarDays.length;
    
    // Add days from next month
    for (let i = 1; i <= nextMonthDays; i++) {
      calendarDays.push(addDays(monthEnd, i));
    }
    
    return calendarDays;
  };
  
  const calendarDays = generateCalendarDays();
  
  // Format date for display in modal
  const formatDateForDisplay = (dateString: string) => {
    try {
      const date = parseDate(dateString);
      return format(date, "MMMM d, yyyy");
    } catch (error) {
      return dateString;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md w-full">
      {/* Header */}
      <div className="p-4 flex justify-between items-center border-b border-gray-200">
        <div className="flex items-center">
          <div className="bg-blue-100 p-2 rounded-md mr-3">
            <CalendarIcon size={20} className="text-blue-700" />
          </div>
          <h1 className="text-xl font-medium text-gray-800">Activity Calendar</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Month navigation */}
          <div className="flex items-center space-x-1">
            <button 
              onClick={previousMonth}
              className="p-1.5 rounded-full hover:bg-gray-100"
              aria-label="Previous month"
            >
              <ChevronLeft size={20} className="text-gray-600" />
            </button>
            
            <h2 className="text-lg font-medium text-gray-700 min-w-[180px] text-center">
              {format(currentMonth, "MMMM yyyy")}
            </h2>
            
            <button 
              onClick={nextMonth}
              className="p-1.5 rounded-full hover:bg-gray-100"
              aria-label="Next month"
            >
              <ChevronRight size={20} className="text-gray-600" />
            </button>
          </div>
          
          {/* Today button */}
          <button 
            onClick={() => setCurrentMonth(new Date())}
            className="px-3 py-1.5 text-sm font-medium text-blue-700 bg-blue-50 rounded-md hover:bg-blue-100"
          >
            Today
          </button>
        </div>
      </div>
      
      {/* Calendar grid */}
      <div className="p-4">
        {loading ? (
          <div className="h-[600px] flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-gray-600">Loading activities...</span>
          </div>
        ) : (
          <>
            {/* Legend */}
            <div className="flex flex-wrap gap-2 mb-4">
              <div className="flex items-center px-2 py-1 rounded bg-blue-50 text-sm">
                <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                <span>Vacation</span>
              </div>
              <div className="flex items-center px-2 py-1 rounded bg-red-50 text-sm">
                <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                <span>Sick Leave</span>
              </div>
              <div className="flex items-center px-2 py-1 rounded bg-green-50 text-sm">
                <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                <span>Remote Work</span>
              </div>
              <div className="flex items-center px-2 py-1 rounded bg-purple-50 text-sm">
                <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
                <span>Training</span>
              </div>
            </div>
            
            {/* Days of the week */}
            <div className="grid grid-cols-7 mb-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="py-2 text-center text-sm font-medium text-gray-500">
                  {day}
                </div>
              ))}
            </div>
            
            {/* Calendar cells */}
            <div className="grid grid-cols-7 border-t border-l border-gray-200">
              {calendarDays.map((day, idx) => {
                const dateActivities = getActivitiesForDate(day);
                const isCurrentMonth = isSameMonth(day, currentMonth);
                const isToday = isSameDay(day, new Date());
                
                return (
                  <div 
                    key={idx} 
                    className={`min-h-[100px] p-1 border-r border-b border-gray-200 ${
                      !isCurrentMonth ? 'bg-gray-50' : ''
                    }`}
                  >
                    {/* Date number */}
                    <div className={`text-right mb-1 ${!isCurrentMonth ? 'text-gray-400' : 'text-gray-700'}`}>
                      <span className={`inline-block w-6 h-6 text-center leading-6 text-sm
                        ${isToday ? 'bg-blue-600 text-white rounded-full' : ''}
                      `}>
                        {format(day, "d")}
                      </span>
                    </div>
                    
                    {/* Activities for this day */}
                    <div className="space-y-1 overflow-y-auto max-h-[80px]">
                      {dateActivities.map(activity => {
                        const colors = getActivityColor(activity.activity_type);
                        const isStart = isSameDay(parseDate(activity.start_date), day);
                        const isEnd = isSameDay(parseDate(activity.end_date), day);
                        
                        return (
                          <div
                            key={activity.id}
                            className={`px-1 py-0.5 text-xs truncate rounded-sm cursor-pointer
                              ${colors.bg} ${colors.text} border-l-2 ${colors.border}
                              ${isStart ? 'rounded-l-sm' : ''}
                              ${isEnd ? 'rounded-r-sm' : ''}
                            `}
                            onClick={() => setModalActivity(activity)}
                          >
                            {activity.activity_type}: {activity.employee_id}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
      
      {/* Activity detail modal */}
      {modalActivity && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-800">Activity Details</h3>
              <button 
                onClick={() => setModalActivity(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-4">
              <div className="mb-4">
                <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium ${getActivityColor(modalActivity.activity_type).bg} ${getActivityColor(modalActivity.activity_type).text}`}>
                  {modalActivity.activity_type}
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-start">
                  <User size={18} className="text-gray-400 mr-2 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-500">Employee ID</p>
                    <p className="text-gray-700">{modalActivity.employee_id}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <CalendarIcon size={18} className="text-gray-400 mr-2 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-500">Duration</p>
                    <p className="text-gray-700">
                      {formatDateForDisplay(modalActivity.start_date)} - {formatDateForDisplay(modalActivity.end_date)}
                    </p>
                  </div>
                </div>
                
                {modalActivity.description && (
                  <div className="flex items-start">
                    <Info size={18} className="text-gray-400 mr-2 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500">Description</p>
                      <p className="text-gray-700">{modalActivity.description}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="bg-gray-50 px-4 py-3 border-t border-gray-200 flex justify-end">
              <button
                onClick={() => setModalActivity(null)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
