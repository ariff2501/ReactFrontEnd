import React, { useState } from "react";
import { format } from "date-fns";

interface ActivityFormData {
  activity_type: string;
  start_date: string;
  end_date: string;
  employee_id: string;
  description?: string;
}

interface ActivityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => Promise<void>;
}

interface FormErrors {
  activity_type?: string;
  start_date?: string;
  end_date?: string;
  employee_id?: string;
  submit?: string;
}

function ActivityModal({ isOpen, onClose, onSubmit }: ActivityModalProps) {
  const [formData, setFormData] = useState<ActivityFormData>({
    activity_type: "",
    start_date: format(new Date(), "yyyy-MM-dd"),
    end_date: format(new Date(), "yyyy-MM-dd"),
    employee_id: "",
    description: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Activity type options
  const activityTypes = [
    "Meeting",
    "Training",
    "Vacation",
    "Sick Leave",
    "Project",
    "Other",
  ];
  // Types for HTML elements
  type FormElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
  const handleChange = (e: React.ChangeEvent<FormElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when field is edited
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.activity_type) {
      newErrors.activity_type = "Activity type is required";
    }

    if (!formData.start_date) {
      newErrors.start_date = "Start date is required";
    }

    if (!formData.end_date) {
      newErrors.end_date = "End date is required";
    } else if (new Date(formData.end_date) < new Date(formData.start_date)) {
      newErrors.end_date = "End date cannot be before start date";
    }

    if (!formData.employee_id) {
      newErrors.employee_id = "Employee ID is required";
    } else if (isNaN(Number(formData.employee_id))) {
      newErrors.employee_id = "Employee ID must be a number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Format dates to match your API expectations (dd/MM/yyyy)
      const formattedData = {
        ...formData,
        employee_id: Number(formData.employee_id),
        start_date: format(new Date(formData.start_date), "dd/MM/yyyy"),
        end_date: format(new Date(formData.end_date), "dd/MM/yyyy"),
        description: formData.description || "",
      };

      await onSubmit(formattedData);
      onClose();
    } catch (error) {
      console.error("Error adding activity:", error);
      setErrors({ submit: "Failed to add activity. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center">
      <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4 md:mx-auto">
        {/* Modal header */}
        <div className="flex items-start justify-between p-4 border-b rounded-t">
          <h3 className="text-lg font-semibold text-gray-900">
            Add New Activity
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
        <form onSubmit={handleSubmit} className="p-6">
          {errors.submit && (
            <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
              {errors.submit}
            </div>
          )}

          <div className="mb-4">
            <label
              htmlFor="activity_type"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Activity Type*
            </label>
            <select
              id="activity_type"
              name="activity_type"
              value={formData.activity_type}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
                errors.activity_type ? "border-red-300" : "border-gray-300"
              }`}
            >
              <option value="">Select an activity type</option>
              {activityTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            {errors.activity_type && (
              <p className="mt-1 text-sm text-red-600">
                {errors.activity_type}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="start_date"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Start Date*
              </label>
              <input
                type="date"
                id="start_date"
                name="start_date"
                value={formData.start_date}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
                  errors.start_date ? "border-red-300" : "border-gray-300"
                }`}
              />
              {errors.start_date && (
                <p className="mt-1 text-sm text-red-600">{errors.start_date}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="end_date"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                End Date*
              </label>
              <input
                type="date"
                id="end_date"
                name="end_date"
                value={formData.end_date}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
                  errors.end_date ? "border-red-300" : "border-gray-300"
                }`}
              />
              {errors.end_date && (
                <p className="mt-1 text-sm text-red-600">{errors.end_date}</p>
              )}
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="employee_id"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Employee ID*
            </label>
            <input
              type="text"
              id="employee_id"
              name="employee_id"
              value={formData.employee_id}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
                errors.employee_id ? "border-red-300" : "border-gray-300"
              }`}
              placeholder="Enter employee ID"
            />
            {errors.employee_id && (
              <p className="mt-1 text-sm text-red-600">{errors.employee_id}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 border-gray-300"
              rows={3}
              placeholder="Enter a brief description of the activity"
            ></textarea>
          </div>

          {/* Modal footer */}
          <div className="flex items-center justify-end space-x-3 mt-6">
            <button
              type="button"
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Saving...
                </span>
              ) : (
                "Add Activity"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ActivityModal;
