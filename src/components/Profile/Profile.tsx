import { useState, ReactNode, useEffect } from "react";
import {
  Calendar,
  Mail,
  Phone,
  Building,
  Users,
  Briefcase,
  Clock,
  Edit,
  Save,
  X,
  FileText,
  CreditCard,
  MapPin,
  AlertCircle,
  User,
  Heart,
  ClipboardList,
  Activity,
  Lock,
  ShieldCheck,
  Eye,
  EyeOff
} from "lucide-react";

// Define types for HR-focused employee data
interface Employee {
  id: string;
  employeeId: string;
  name: string;
  avatar: string;
  position: string;
  department: string;
  employmentStatus: "Full-time" | "Part-time" | "Contract" | "Temporary";
  email: string;
  phone: string;
  officeLocation: string;
  startDate: string;
  probationEndDate: string;
  manager: string;
  workSchedule: string;
  salary: {
    amount: number;
    currency: string;
    effectiveDate: string;
  };
  benefits: string[];
  documents: {
    name: string;
    status: "Valid" | "Expired" | "Missing";
    expiryDate?: string;
  }[];
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  leaveBalance: {
    annual: number;
    sick: number;
    personal: number;
  };
  performanceReviews?: {
    date: string;
    rating: number;
    comments: string;
  }[];
}

interface EmployeeInfoProps {
  employee?: Employee;
  role: "hr" | "employee"; // Role-based view
}

// Define type for the InfoItem component
interface InfoItemProps {
  icon: ReactNode;
  label: string;
  children: ReactNode;
}

export default function Profile({ role = "employee" }: EmployeeInfoProps) {
  // Sample employee data focused on HR information
  const sampleEmployee: Employee = {
    id: "1",
    employeeId: "EMP-2022-001",
    name: "John Doe",
    avatar: "https://via.placeholder.com/150",
    position: "Software Engineer",
    department: "Engineering",
    employmentStatus: "Full-time",
    email: "john.doe@example.com",
    phone: "+1234567890",
    officeLocation: "New York - Floor 5",
    startDate: "2022-01-10",
    probationEndDate: "2022-04-10",
    manager: "Jane Smith",
    workSchedule: "Monday-Friday, 9:00 AM - 5:00 PM",
    salary: {
      amount: 85000,
      currency: "USD",
      effectiveDate: "2023-01-15"
    },
    benefits: [
      "Health Insurance (Silver Plan)",
      "Dental Coverage",
      "401(k) - 5% contribution",
      "25 days PTO"
    ],
    documents: [
      { name: "Employment Contract", status: "Valid" },
      { name: "ID/Passport", status: "Valid", expiryDate: "2027-05-20" },
      { name: "Work Visa", status: "Missing" },
      { name: "Tax Forms", status: "Valid" }
    ],
    emergencyContact: {
      name: "Mary Doe",
      relationship: "Spouse",
      phone: "+1987654321"
    },
    leaveBalance: {
      annual: 18,
      sick: 7,
      personal: 3
    },
    performanceReviews: [
      {
        date: "2022-06-15",
        rating: 4,
        comments: "Excellent team player, consistently meets deadlines."
      },
      {
        date: "2023-01-20",
        rating: 5,
        comments: "Outstanding performance, led the successful product launch."
      }
    ]
  };

  const [isEditing, setIsEditing] = useState(false);
  const [editedEmployee, setEditedEmployee] = useState<Employee>({} as Employee);
  const [employee, setEmployee] = useState<Employee>({} as Employee);
  const [showSensitiveInfo, setShowSensitiveInfo] = useState(role === "hr");

  useEffect(() => {
    // Simulate fetching employee data from an API
    setEmployee(sampleEmployee);
    setEditedEmployee(sampleEmployee);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    
    // Handle nested objects
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      
      // Type-safe approach to handle nested objects
      setEditedEmployee(prev => {
        const parentKey = parent as keyof Employee;
        const parentObj = prev[parentKey];
        
        // Check if parentObj is a valid object before spreading
        if (parentObj && typeof parentObj === 'object' && !Array.isArray(parentObj)) {
          return {
            ...prev,
            [parentKey]: {
              ...parentObj,
              [child]: value
            }
          };
        }
        
        // Fallback for invalid parent objects
        return {
          ...prev,
          [parentKey]: { [child]: value }
        };
      });
    } else {
      setEditedEmployee(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Handle array type fields (benefits)
  const handleArrayChange = (name: keyof Employee, value: string) => {
    setEditedEmployee(prev => ({
      ...prev,
      [name]: value.split('\n').filter(item => item.trim() !== '')
    }));
  };

  const handleSave = () => {
    // Here you would typically send the updated data to your server
    // For now, we'll just update the local state
    setEmployee(editedEmployee);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedEmployee(employee);
    setIsEditing(false);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    
    try {
      const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    } catch (error) {
      return 'Invalid date';
    }
  };

  const getDocumentStatusColor = (status: string) => {
    switch (status) {
      case 'Valid': return 'bg-green-100 text-green-800';
      case 'Expired': return 'bg-red-100 text-red-800';
      case 'Missing': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Determine which fields can be edited based on role
  const canEdit = (fieldName: string) => {
    if (role === "hr") return true;
    
    // Fields that employees can edit themselves
    const employeeEditableFields = [
      "phone", "email", "emergencyContact", 
      // Nested fields
      "emergencyContact.name", "emergencyContact.relationship", "emergencyContact.phone"
    ];
    
    return employeeEditableFields.includes(fieldName);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden w-full">
      {/* Header with role indicator */}
      <div className="bg-gray-100 px-6 py-4 flex justify-between items-center border-b border-gray-200">
        <div className="flex items-center">
          <div className={`p-2 rounded-md mr-3 ${role === "hr" ? "bg-purple-100" : "bg-blue-100"}`}>
            <User size={20} className={role === "hr" ? "text-purple-700" : "text-blue-700"} />
          </div>
          <div>
            <h1 className="text-xl font-medium text-gray-800">Employee Information</h1>
            <div className="flex items-center text-sm">
              <span className="text-gray-500 mr-2">Viewing as:</span>
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${role === "hr" ? "bg-purple-100 text-purple-800" : "bg-blue-100 text-blue-800"}`}>
                {role === "hr" ? "HR Administrator" : "Employee"}
              </span>
              
              {/* Role toggle (demo purposes) */}
              <button 
                onClick={() => window.location.search = role === "hr" ? "?role=employee" : "?role=hr"}
                className="ml-2 text-xs text-gray-500 underline hover:text-gray-700"
              >
                Switch View
              </button>
            </div>
          </div>
        </div>
        
        {/* Edit button - shown based on permissions */}
        {!isEditing ? (
          <button 
            onClick={() => setIsEditing(true)}
            className={`flex items-center px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              role === "hr" 
              ? "bg-purple-600 text-white hover:bg-purple-700" 
              : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            <Edit size={16} className="mr-1.5" /> {role === "hr" ? "Edit Information" : "Edit My Details"}
          </button>
        ) : (
          <div className="flex space-x-2">
            <button 
              onClick={handleSave}
              className="flex items-center bg-green-600 text-white px-3 py-1.5 rounded-md text-sm font-medium hover:bg-green-700 transition-colors"
            >
              <Save size={16} className="mr-1.5" /> Save Changes
            </button>
            <button 
              onClick={handleCancel}
              className="flex items-center bg-gray-200 text-gray-700 px-3 py-1.5 rounded-md text-sm font-medium hover:bg-gray-300 transition-colors"
            >
              <X size={16} className="mr-1.5" /> Cancel
            </button>
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Left Column - Basic Info */}
          <div className="md:col-span-1">
            <div className="flex flex-col items-center mb-6">
              <img 
                src={employee.avatar} 
                alt={employee.name} 
                className="w-28 h-28 rounded-full object-cover border-2 border-gray-200"
              />
              
              <div className="mt-3 text-center">
                <h2 className="text-lg font-bold text-gray-800">{employee.name}</h2>
                <div className="bg-gray-100 text-gray-700 text-sm px-2 py-0.5 rounded mt-1 font-mono">
                  {employee.employeeId}
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h3 className="font-medium text-gray-700 mb-3 flex items-center">
                <Briefcase size={16} className="mr-1.5 text-blue-600" />
                Employment Details
              </h3>
              
              <div className="space-y-3 text-sm">
                <InfoItem icon={<Users size={16} />} label="Position">
                  {isEditing && canEdit("position") ? 
                    <input 
                      type="text" 
                      name="position" 
                      value={editedEmployee.position} 
                      onChange={handleChange}
                      className="w-full border rounded-md px-2 py-1 text-sm"
                    /> : employee.position}
                </InfoItem>
                
                <InfoItem icon={<Building size={16} />} label="Department">
                  {isEditing && canEdit("department") ? 
                    <input 
                      type="text" 
                      name="department" 
                      value={editedEmployee.department} 
                      onChange={handleChange}
                      className="w-full border rounded-md px-2 py-1 text-sm"
                    /> : employee.department}
                </InfoItem>
                
                <InfoItem icon={<Users size={16} />} label="Reports To">
                  {isEditing && canEdit("manager") ? 
                    <input 
                      type="text" 
                      name="manager" 
                      value={editedEmployee.manager} 
                      onChange={handleChange}
                      className="w-full border rounded-md px-2 py-1 text-sm"
                    /> : employee.manager}
                </InfoItem>
                
                <InfoItem icon={<Clock size={16} />} label="Status">
                  {isEditing && canEdit("employmentStatus") ? 
                    <select 
                      name="employmentStatus" 
                      value={editedEmployee.employmentStatus} 
                      onChange={handleChange}
                      className="w-full border rounded-md px-2 py-1 text-sm"
                    >
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Contract">Contract</option>
                      <option value="Temporary">Temporary</option>
                    </select> : 
                    <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                      {employee.employmentStatus}
                    </span>}
                </InfoItem>
              </div>
            </div>
            
            {/* Leave Balance - Visible to both */}
            <div className="mt-4 bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h3 className="font-medium text-gray-700 mb-3 flex items-center">
                <Calendar size={16} className="mr-1.5 text-blue-600" />
                Leave Balance
              </h3>
              
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-blue-50 p-2 rounded text-center">
                  <div className="text-xl font-bold text-blue-700">
                    {employee.leaveBalance?.annual || 0}
                  </div>
                  <div className="text-xs text-blue-600">Annual</div>
                </div>
                <div className="bg-green-50 p-2 rounded text-center">
                  <div className="text-xl font-bold text-green-700">
                    {employee.leaveBalance?.sick || 0}
                  </div>
                  <div className="text-xs text-green-600">Sick</div>
                </div>
                <div className="bg-purple-50 p-2 rounded text-center">
                  <div className="text-xl font-bold text-purple-700">
                    {employee.leaveBalance?.personal || 0}
                  </div>
                  <div className="text-xs text-purple-600">Personal</div>
                </div>
              </div>
              
              {/* Request Time Off button - Employee view only */}
              {role === "employee" && (
                <button className="w-full mt-3 bg-blue-600 text-white px-3 py-1.5 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors">
                  Request Time Off
                </button>
              )}
            </div>
          </div>
          
          {/* Right Column - Detailed Info */}
          <div className="md:col-span-3">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Contact Section - Both roles */}
              <section className="bg-white rounded-lg border border-gray-200 p-4">
                <h3 className="text-md font-semibold text-gray-700 border-b pb-2 mb-3 flex items-center">
                  <Mail size={16} className="mr-1.5 text-blue-600" />
                  Contact Information
                </h3>
                
                <div className="space-y-3">
                  <InfoItem icon={<Mail size={16} />} label="Email">
                    {isEditing && canEdit("email") ? 
                      <input 
                        type="email" 
                        name="email" 
                        value={editedEmployee.email} 
                        onChange={handleChange}
                        className="w-full border rounded-md px-2 py-1 text-sm"
                      /> : employee.email}
                  </InfoItem>
                  
                  <InfoItem icon={<Phone size={16} />} label="Phone">
                    {isEditing && canEdit("phone") ? 
                      <input 
                        type="tel" 
                        name="phone" 
                        value={editedEmployee.phone} 
                        onChange={handleChange}
                        className="w-full border rounded-md px-2 py-1 text-sm"
                      /> : employee.phone}
                  </InfoItem>
                  
                  <InfoItem icon={<MapPin size={16} />} label="Office Location">
                    {isEditing && canEdit("officeLocation") ? 
                      <input 
                        type="text" 
                        name="officeLocation" 
                        value={editedEmployee.officeLocation} 
                        onChange={handleChange}
                        className="w-full border rounded-md px-2 py-1 text-sm"
                      /> : employee.officeLocation}
                  </InfoItem>
                </div>
                
                <h4 className="text-sm font-medium text-gray-700 mt-4 mb-2">Emergency Contact</h4>
                <div className="bg-gray-50 p-3 rounded border border-gray-100 text-sm">
                  {isEditing && canEdit("emergencyContact") ? (
                    <div className="space-y-2">
                      <div>
                        <label className="block text-xs text-gray-500">Name</label>
                        <input 
                          type="text" 
                          name="emergencyContact.name" 
                          value={editedEmployee.emergencyContact?.name || ''} 
                          onChange={handleChange}
                          className="w-full border rounded-md px-2 py-1 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500">Relationship</label>
                        <input 
                          type="text" 
                          name="emergencyContact.relationship" 
                          value={editedEmployee.emergencyContact?.relationship || ''} 
                          onChange={handleChange}
                          className="w-full border rounded-md px-2 py-1 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500">Phone</label>
                        <input 
                          type="tel" 
                          name="emergencyContact.phone" 
                          value={editedEmployee.emergencyContact?.phone || ''} 
                          onChange={handleChange}
                          className="w-full border rounded-md px-2 py-1 text-sm"
                        />
                      </div>
                    </div>
                  ) : (
                    <>
                      <p className="font-medium">{employee.emergencyContact?.name || 'Not provided'}</p>
                      <p className="text-gray-600 text-sm">{employee.emergencyContact?.relationship || 'Not provided'}</p>
                      <p className="text-gray-600 text-sm">{employee.emergencyContact?.phone || 'Not provided'}</p>
                    </>
                  )}
                </div>
              </section>
              
              {/* Employment Dates Section - Both roles */}
              <section className="bg-white rounded-lg border border-gray-200 p-4">
                <h3 className="text-md font-semibold text-gray-700 border-b pb-2 mb-3 flex items-center">
                  <Calendar size={16} className="mr-1.5 text-blue-600" />
                  Employment Dates
                </h3>
                
                <div className="space-y-3">
                  <InfoItem icon={<Calendar size={16} />} label="Start Date">
                    {isEditing && canEdit("startDate") ? 
                      <input 
                        type="date" 
                        name="startDate" 
                        value={editedEmployee.startDate} 
                        onChange={handleChange}
                        className="w-full border rounded-md px-2 py-1 text-sm"
                      /> : formatDate(employee.startDate)}
                  </InfoItem>
                  
                  {/* Probation date only visible to HR */}
                  {(role === "hr" || role === "employee") && (
                    <InfoItem icon={<Calendar size={16} />} label="Probation End Date">
                      {isEditing && canEdit("probationEndDate") ? 
                        <input 
                          type="date" 
                          name="probationEndDate" 
                          value={editedEmployee.probationEndDate} 
                          onChange={handleChange}
                          className="w-full border rounded-md px-2 py-1 text-sm"
                        /> : formatDate(employee.probationEndDate)}
                    </InfoItem>
                  )}
                  
                  <InfoItem icon={<Clock size={16} />} label="Work Schedule">
                    {isEditing && canEdit("workSchedule") ? 
                      <input 
                        type="text" 
                        name="workSchedule" 
                        value={editedEmployee.workSchedule} 
                        onChange={handleChange}
                        className="w-full border rounded-md px-2 py-1 text-sm"
                      /> : employee.workSchedule}
                  </InfoItem>
                </div>
              </section>
              
              {/* Compensation & Benefits - HR can see and edit everything, Employee sees limited info */}
              <section className="bg-white rounded-lg border border-gray-200 p-4">
                <h3 className="text-md font-semibold text-gray-700 border-b pb-2 mb-3 flex items-center">
                  <CreditCard size={16} className="mr-1.5 text-blue-600" />
                  Compensation & Benefits
                  
                  {/* Toggle visibility for sensitive info (employee view only) */}
                  {role === "employee" && (
                    <button 
                      onClick={() => setShowSensitiveInfo(!showSensitiveInfo)} 
                      className="ml-auto text-gray-500 hover:text-gray-700"
                      aria-label={showSensitiveInfo ? "Hide sensitive information" : "Show sensitive information"}
                    >
                      {showSensitiveInfo ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  )}
                </h3>
                
                {/* Salary info - conditional display */}
                {(role === "hr" || showSensitiveInfo) ? (
                  <div className="space-y-1 mb-4">
                    <div className="flex justify-between items-baseline">
                      <span className="text-sm text-gray-500">Current Salary:</span>
                      <span className="text-lg font-bold text-gray-800">
                        {isEditing && canEdit("salary") ? (
                          <div className="flex items-center">
                            <select
                              name="salary.currency"
                              value={editedEmployee.salary?.currency || 'USD'}
                              onChange={handleChange}
                              className="border rounded-md px-2 py-1 text-sm mr-1"
                            >
                              <option value="USD">USD</option>
                              <option value="EUR">EUR</option>
                              <option value="GBP">GBP</option>
                            </select>
                            <input
                              type="number"
                              name="salary.amount"
                              value={editedEmployee.salary?.amount || 0}
                              onChange={handleChange}
                              className="border rounded-md px-2 py-1 text-sm w-24"
                            />
                          </div>
                        ) : (
                          new Intl.NumberFormat('en-US', { 
                            style: 'currency', 
                            currency: employee.salary?.currency || 'USD',
                            maximumFractionDigits: 0
                          }).format(employee.salary?.amount || 0)
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Effective Date:</span>
                      <span className="text-gray-700">
                        {isEditing && canEdit("salary") ? (
                          <input
                            type="date"
                            name="salary.effectiveDate"
                            value={editedEmployee.salary?.effectiveDate || ''}
                            onChange={handleChange}
                            className="border rounded-md px-2 py-1 text-sm"
                          />
                        ) : formatDate(employee.salary?.effectiveDate || '')}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center py-4 text-gray-500 bg-gray-50 rounded mb-4">
                    <Lock size={16} className="mr-2" />
                    <span className="text-sm">Salary information is private</span>
                  </div>
                )}
                
                <h4 className="text-sm font-medium text-gray-700 mt-4 mb-2 flex items-center">
                  <Heart size={14} className="mr-1.5 text-blue-600" /> Benefits Enrollment
                </h4>
                {isEditing && canEdit("benefits") ? (
                  <textarea
                    name="benefits"
                    value={(editedEmployee.benefits || []).join('\n')}
                    onChange={(e) => handleArrayChange('benefits', e.target.value)}
                    className="w-full border rounded-md px-3 py-2 text-sm h-24"
                    placeholder="Enter benefits, one per line"
                  />
                ) : (
                  <ul className="text-sm space-y-1 ml-5 list-disc text-gray-700">
                    {(employee.benefits || []).map((benefit, index) => (
                      <li key={index}>{benefit}</li>
                    ))}
                  </ul>
                )}
              </section>
              
              {/* Documents & Compliance - HR only or limited view for employee */}
              {role === "hr" ? (
                <section className="bg-white rounded-lg border border-gray-200 p-4">
                  <h3 className="text-md font-semibold text-gray-700 border-b pb-2 mb-3 flex items-center">
                    <FileText size={16} className="mr-1.5 text-blue-600" />
                    Documents & Compliance
                  </h3>
                  
                  <div className="space-y-2">
                    {(employee.documents || []).map((doc, index) => (
                      <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded border border-gray-100">
                        <div className="flex items-center">
                          <FileText size={14} className="mr-2 text-gray-500" />
                          <div>
                            <p className="text-sm font-medium">{doc.name}</p>
                            {doc.expiryDate && (
                              <p className="text-xs text-gray-500">
                                Expires: {formatDate(doc.expiryDate)}
                              </p>
                            )}
                          </div>
                        </div>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getDocumentStatusColor(doc.status)}`}>
                          {doc.status}
                        </span>
                      </div>
                    ))}
                  </div>
                  
                  {isEditing && (
                    <div className="mt-3 text-center">
                      <button className="text-sm text-blue-600 hover:text-blue-800">
                        + Add Document
                      </button>
                    </div>
                  )}
                  
                  <div className="mt-4 text-sm text-gray-500 flex items-center bg-blue-50 p-3 rounded">
                    <AlertCircle size={16} className="mr-2 text-blue-600" />
                    <p>HR should regularly verify document validity and update compliance status.</p>
                  </div>
                </section>
              ) : (
                <section className="bg-white rounded-lg border border-gray-200 p-4">
                  <h3 className="text-md font-semibold text-gray-700 border-b pb-2 mb-3 flex items-center">
                    <FileText size={16} className="mr-1.5 text-blue-600" />
                    My Documents
                  </h3>
                  
                  <div className="space-y-2">
                    {(employee.documents || []).map((doc, index) => (
                      <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded border border-gray-100">
                        <div className="flex items-center">
                          <FileText size={14} className="mr-2 text-gray-500" />
                          <div>
                            <p className="text-sm font-medium">{doc.name}</p>
                            {doc.expiryDate && (
                              <p className="text-xs text-gray-500">
                                Expires: {formatDate(doc.expiryDate)}
                              </p>
                            )}
                          </div>
                        </div>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getDocumentStatusColor(doc.status)}`}>
                          {doc.status}
                        </span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4 text-sm text-gray-500 flex items-center bg-blue-50 p-3 rounded">
                    <AlertCircle size={16} className="mr-2 text-blue-600" />
                    <p>Contact HR if you need to update any of your documents.</p>
                  </div>
                </section>
              )}
              
              {/* Performance Review section - HR only */}
              {role === "hr" && employee.performanceReviews && (
                <section className="bg-white rounded-lg border border-gray-200 p-4 lg:col-span-2">
                  <h3 className="text-md font-semibold text-gray-700 border-b pb-2 mb-3 flex items-center">
                    <Activity size={16} className="mr-1.5 text-blue-600" />
                    Performance Reviews
                  </h3>
                  
                  <div className="space-y-3">
                    {(employee.performanceReviews || []).map((review, index) => (
                      <div key={index} className="p-3 bg-gray-50 rounded border border-gray-200">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium">{formatDate(review.date)}</span>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <span key={i} className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600">{review.comments}</p>
                      </div>
                    ))}
                  </div>
                  
                  {isEditing && (
                    <div className="mt-3 text-center">
                      <button className="text-sm text-blue-600 hover:text-blue-800">
                        + Add Performance Review
                      </button>
                    </div>
                  )}
                </section>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper component for displaying info items
function InfoItem({ icon, label, children }: InfoItemProps) {
  return (
    <div className="flex items-start">
      <div className="text-gray-400 mr-2 mt-1">{icon}</div>
      <div className="flex-1">
        <p className="text-xs text-gray-500">{label}</p>
        <div className="text-gray-700">{children}</div>
      </div>
    </div>
  );
}
