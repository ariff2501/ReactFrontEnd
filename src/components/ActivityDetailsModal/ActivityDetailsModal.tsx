import React, { useEffect, useState } from "react";
import { formatDate } from "../Activities/Activities"; // Adjust the import path as necessary

interface ActivityDetails {
  id: number;
  activity_type: string;
  start_date: string;
  end_date: string;
  employee_id: number;
  description?: string;
  employee?: {
    id: number;
    name: string;
    family_name?: string;
    email: string;
    department: string;
    position: string;
  };
}

interface ActivityDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  //   data: ActivityDetails | null;
  activityId: number | string | null;
}

// Activity type color mapping
const getActivityTypeColor = (type: string) => {
  const colorMap: { [key: string]: string } = {
    Meeting: "bg-blue-100 text-blue-800",
    Training: "bg-green-100 text-green-800",
    Vacation: "bg-yellow-100 text-yellow-800",
    "Sick Leave": "bg-red-100 text-red-800",
    Project: "bg-purple-100 text-purple-800",
    // Add more mappings as needed
  };

  return colorMap[type] || "bg-gray-100 text-gray-800";
};

function ActivityDetailsModal({
  isOpen,
  onClose,
  activityId,
}: ActivityDetailsModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [detailsData, setDetailsData] = useState<ActivityDetails | null>(null);

  useEffect(() => {
    const fetchActivityDetails = async () => {
      try {
        setLoading(true);
        console.log(
          "Fetching activity details for ID:",
          activityId,
          "Type:",
          typeof activityId
        );
        const response = await fetch(
          `http://localhost:3000/api/activities/${activityId}/details`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            errorData.message || "Failed to fetch activity details"
          );
        }
        const responseData = await response.json();
        console.log("Activity details fetched:", responseData);
        setDetailsData(responseData.data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unexpected error occurred"
        );
        console.error(err);
      }
      setLoading(false);
    };
    if (isOpen && activityId) {
      fetchActivityDetails();
    }
  }, [isOpen, activityId]);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-xl p-6">
          <p className="text-gray-700">Loading...</p>
        </div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-xl p-6">
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    );
  }
  if (!isOpen || !detailsData) {
    return null;
  }
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center">
      <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4 md:mx-auto">
        {/* Modal header */}
        <div className="flex items-start justify-between p-4 border-b rounded-t">
          <h3 className="text-lg font-semibold text-gray-900">
            Activity Details
          </h3>
          <button
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
            onClick={onClose}
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>

        {/* Modal body */}
        <div className="p-6">
          {/* Activity Type Badge */}
          <div className="mb-4">
            <span
              className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getActivityTypeColor(
                detailsData.activity_type
              )}`}
            >
              {detailsData.activity_type}
            </span>
          </div>

          {/* Activity Information */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-700 border-b pb-2 mb-3">
              Activity Information
            </h4>

            {detailsData.id && (
              <div className="mb-2">
                <p className="text-sm text-gray-500">
                  ID:{" "}
                  <span className="font-medium text-gray-700">
                    {detailsData.id}
                  </span>
                </p>
              </div>
            )}

            <div className="mb-3">
              <div className="flex items-center">
                <svg
                  className="h-5 w-5 text-gray-400 mr-1.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <div>
                  <span className="font-medium text-gray-700">
                    {detailsData.start_date}
                  </span>
                  <span className="mx-2 text-gray-400">to</span>
                  <span className="font-medium text-gray-700">
                    {detailsData.end_date}
                  </span>
                </div>
              </div>
            </div>

            {detailsData.description && (
              <div className="mb-2">
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  Description
                </h4>
                <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-md">
                  {detailsData.description}
                </p>
              </div>
            )}
          </div>

          {/* Employee Information */}
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-700 border-b pb-2 mb-3">
              Employee Information
            </h4>

            {detailsData.employee ? (
              <div className="space-y-2">
                <div className="flex">
                  <span className="text-sm text-gray-500 w-24">Name:</span>
                  <span className="text-sm font-medium text-gray-700">
                    {detailsData.employee.name}{" "}
                    {detailsData.employee.family_name}
                  </span>
                </div>
                <div className="flex">
                  <span className="text-sm text-gray-500 w-24">ID:</span>
                  <span className="text-sm font-medium text-gray-700">
                    {detailsData.employee.id}
                  </span>
                </div>
                <div className="flex">
                  <span className="text-sm text-gray-500 w-24">Email:</span>
                  <span className="text-sm font-medium text-gray-700">
                    {detailsData.employee.email}
                  </span>
                </div>
                <div className="flex">
                  <span className="text-sm text-gray-500 w-24">
                    Department:
                  </span>
                  <span className="text-sm font-medium text-gray-700">
                    {detailsData.employee.department}
                  </span>
                </div>
                <div className="flex">
                  <span className="text-sm text-gray-500 w-24">Position:</span>
                  <span className="text-sm font-medium text-gray-700">
                    {detailsData.employee.position}
                  </span>
                </div>
              </div>
            ) : (
              <p className="text-sm text-gray-500 italic">
                No employee information available
              </p>
            )}
          </div>
        </div>

        {/* Modal footer */}
        <div className="flex items-center justify-end p-4 border-t">
          <button
            type="button"
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default ActivityDetailsModal;
