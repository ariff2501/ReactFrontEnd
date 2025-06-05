// // pages/Profile.jsx
// import styled from "styled-components";
// import { useEffect, useState } from "react";

// const Container = styled.div`
//   max-width: 1000px;
//   margin: 40px auto;
//   padding: 20px;
//   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//   border-radius: 10px;
//   background: #fff;
// `;

// const ProfileImageWrapper = styled.div`
//   width: 120px;
//   height: 120px;
//   overflow: hidden;
//   border-radius: 50%;
//   border: 4px solid #007bff; /* Bootstrap primary color */
//   margin: 0 auto 20px auto;
// `;

// const ProfileImage = styled.img`
//   width: 100%;
//   height: 100%;
//   object-fit: cover;
// `;

// const Name = styled.h2`
//   margin-top: 10px;
//   margin-bottom: 5px;
//   text-align: center;
// `;

// const Title = styled.p`
//   text-align: center;
//   color: #6c757d; /* Bootstrap muted gray */
//   margin-bottom: 20px;
// `;

// const Section = styled.div`
//   margin-bottom: 20px;
// `;

// const SectionTitle = styled.h5`
//   margin-bottom: 10px;
//   font-weight: 600;
// `;

// const InfoList = styled.ul`
//   list-style: none;
//   padding: 0;
//   margin: 0;
// `;

// const InfoItem = styled.li`
//   margin-bottom: 8px;
// `;

// const ButtonGroup = styled.div`
//   display: flex;
//   justify-content: center;
//   gap: 10px;
//   margin-top: 20px;
// `;

// const PrimaryButton = styled.button`
//   padding: 10px 20px;
//   border: none;
//   border-radius: 4px;
//   background: #007bff;
//   color: #fff;
//   cursor: pointer;
//   font-weight: 600;
//   transition: background 0.2s;

//   &:hover {
//     background: #0069d9;
//   }
// `;
// interface Employee {
//   name: string;
//   email: string;
//   position: string;
// }

// function Profile() {
//   const [error, setError] = useState("");
//   const [profile, setProfile] = useState<Employee>();

//   useEffect(() => {
//     const fetchProfile = async () => {
//       const userId = localStorage.getItem("userId");  
//       // console.log("Fetching profile for user ID:", userId);
//       if (!userId) {
//         setError("User ID not found. Please log in again.");
//         return;
//       }
        
//         try {
//           const response = await fetch(`http://localhost:3000/api/employees?user_id=${userId}`, {
//             method: "GET",
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${localStorage.getItem("authToken")}`,
//             },
//           });
//           if (!response.ok) {
//             const error = await response.json();
//             setError(
//               error.message ||
//                 "Failed to fetch profile. Please try again later."
//             );
//           }
//           const data = await response.json();
//           setProfile(data);
//         } catch (error) {
//             // console.error("Failed to profile:", error);
//           setError(error instanceof Error ? error.message : "Failed to fetch profile. Please try again later.");
//         }
      
//     };

//     fetchProfile();
//   }, []);

//   if (error) {
//     return <div className={`alert alert-danger `}>{error}</div>;
//   }
//   if (!profile) {
//     return <div className={`alert `}>Loading...</div>;
//   }
  
//   return (
//     <Container>
//       <ProfileImageWrapper>
//         {/* <ProfileImage src="https://via.placeholder.com/120" alt="Profile" /> */}
//       </ProfileImageWrapper>

//       <Name></Name>
//       <Title>Frontend Developer</Title>

//       {/* About Me */}
//       <Section>
//         {/* <SectionTitle>About Me</SectionTitle>
//         <p>
//           Passionate developer with expertise in React, JavaScript, and UI
//           design. Loves creating beautiful and functional user interfaces.
//         </p> */}
//       </Section>

//       {/* Contact Info */}
//       <Section>
//         <SectionTitle>Employee's Information</SectionTitle>
//         <InfoList>
//           <InfoItem>
//             <strong>Name: </strong>{profile.name}
//           </InfoItem>
//           <InfoItem>
//             <strong>Position: </strong>{profile.position}
//           </InfoItem>
//           <InfoItem>
//             <strong>Location:</strong> New York, USA
//           </InfoItem>
//         </InfoList>
//       </Section>

//       {/* Action Buttons */}
//       {/* <ButtonGroup>
//         <PrimaryButton>Edit Profile</PrimaryButton>
//       </ButtonGroup> */}
//     </Container>
//   );
// }

// export default Profile;

import { useState,ReactNode } from 'react';
import { Calendar, Mail, Phone, Building, Users, Briefcase, Clock, Edit, Save, X } from 'lucide-react';
// Define types for our data
interface Employee {
  id: string;
  name: string;
  avatar: string;
  position: string;
  department: string;
  email: string;
  phone: string;
  startDate: string;
  manager: string;
  bio: string;
  skills: string[];
  projects: string[];
}

interface EmployeeProfileProps {
  employee?: Employee;
}

// Define type for the InfoItem component
interface InfoItemProps {
  icon: ReactNode;
  label: string;
  children: ReactNode;
}


export default function EmployeeProfile({ employee = {
  id: '1',
  name: 'Alex Johnson',
  avatar: '/api/placeholder/150/150',
  position: 'Senior Software Engineer',
  department: 'Engineering',
  email: 'alex.johnson@company.com',
  phone: '+1 (555) 123-4567',
  startDate: '2020-03-15',
  manager: 'Sarah Williams',
  bio: 'Experienced software engineer with expertise in React, Node.js, and cloud infrastructure. Passionate about creating elegant solutions to complex problems.',
  skills: ['React', 'JavaScript', 'TypeScript', 'Node.js', 'AWS'],
  projects: ['Customer Portal Redesign', 'API Modernization', 'Mobile App Development']
} }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedEmployee, setEditedEmployee] = useState(employee);
  
  const handleChange = (e : React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedEmployee(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSkillChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const skills = e.target.value.split(',').map(skill => skill.trim());
    setEditedEmployee(prev => ({
      ...prev,
      skills
    }));
  };
  
  const handleProjectChange = (e :  React.ChangeEvent<HTMLTextAreaElement>) => {
    const projects = e.target.value.split(',').map(project => project.trim());
    setEditedEmployee(prev => ({
      ...prev,
      projects
    }));
  };
  
  const handleSave = () => {
    // Here you would typically send the updated data to your server
    // For now, we'll just update the local state
    employee = editedEmployee;
    setIsEditing(false);
  };
  
  const handleCancel = () => {
    setEditedEmployee(employee);
    setIsEditing(false);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold text-white">Employee Profile</h1>
        {!isEditing ? (
          <button 
            onClick={() => setIsEditing(true)}
            className="flex items-center bg-white text-blue-600 px-3 py-1 rounded-md text-sm font-medium hover:bg-blue-50 transition-colors"
          >
            <Edit size={16} className="mr-1" /> Edit Profile
          </button>
        ) : (
          <div className="flex space-x-2">
            <button 
              onClick={handleSave}
              className="flex items-center bg-green-500 text-white px-3 py-1 rounded-md text-sm font-medium hover:bg-green-600 transition-colors"
            >
              <Save size={16} className="mr-1" /> Save
            </button>
            <button 
              onClick={handleCancel}
              className="flex items-center bg-white text-red-600 px-3 py-1 rounded-md text-sm font-medium hover:bg-red-50 transition-colors"
            >
              <X size={16} className="mr-1" /> Cancel
            </button>
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column - Photo and Basic Info */}
          <div className="md:col-span-1">
            <div className="flex flex-col items-center">
              <img 
                src={employee.avatar} 
                alt={employee.name} 
                className="w-32 h-32 rounded-full object-cover border-4 border-blue-100"
              />
              
              <h2 className="mt-4 text-xl font-bold text-gray-800">{isEditing ? 
                <input 
                  type="text" 
                  name="name" 
                  value={editedEmployee.name} 
                  onChange={handleChange}
                  className="w-full text-center border rounded-md px-2 py-1"
                /> : employee.name}
              </h2>
              
              <p className="text-blue-600 font-medium">{isEditing ? 
                <input 
                  type="text" 
                  name="position" 
                  value={editedEmployee.position} 
                  onChange={handleChange}
                  className="w-full text-center border rounded-md px-2 py-1 mt-1"
                /> : employee.position}
              </p>
              
              <div className="mt-6 w-full space-y-3">
                <InfoItem icon={<Building size={18} />} label="Department">
                  {isEditing ? 
                    <input 
                      type="text" 
                      name="department" 
                      value={editedEmployee.department} 
                      onChange={handleChange}
                      className="w-full border rounded-md px-2 py-1"
                    /> : employee.department}
                </InfoItem>
                
                <InfoItem icon={<Users size={18} />} label="Manager">
                  {isEditing ? 
                    <input 
                      type="text" 
                      name="manager" 
                      value={editedEmployee.manager} 
                      onChange={handleChange}
                      className="w-full border rounded-md px-2 py-1"
                    /> : employee.manager}
                </InfoItem>
                
                <InfoItem icon={<Calendar size={18} />} label="Start Date">
                  {isEditing ? 
                    <input 
                      type="date" 
                      name="startDate" 
                      value={editedEmployee.startDate} 
                      onChange={handleChange}
                      className="w-full border rounded-md px-2 py-1"
                    /> : new Date(employee.startDate).toLocaleDateString()}
                </InfoItem>
              </div>
            </div>
          </div>
          
          {/* Right Column - Detailed Info */}
          <div className="md:col-span-2">
            <div className="space-y-6">
              <section>
                <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Contact Information</h3>
                <div className="mt-3 space-y-3">
                  <InfoItem icon={<Mail size={18} />} label="Email">
                    {isEditing ? 
                      <input 
                        type="email" 
                        name="email" 
                        value={editedEmployee.email} 
                        onChange={handleChange}
                        className="w-full border rounded-md px-2 py-1"
                      /> : employee.email}
                  </InfoItem>
                  
                  <InfoItem icon={<Phone size={18} />} label="Phone">
                    {isEditing ? 
                      <input 
                        type="tel" 
                        name="phone" 
                        value={editedEmployee.phone} 
                        onChange={handleChange}
                        className="w-full border rounded-md px-2 py-1"
                      /> : employee.phone}
                  </InfoItem>
                </div>
              </section>
              
              <section>
                <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">About</h3>
                <div className="mt-3">
                  {isEditing ? 
                    <textarea 
                      name="bio" 
                      value={editedEmployee.bio} 
                      onChange={handleChange}
                      className="w-full border rounded-md px-3 py-2 h-24"
                    /> : <p className="text-gray-600">{employee.bio}</p>}
                </div>
              </section>
              
              <section>
                <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Skills</h3>
                <div className="mt-3">
                  {isEditing ? 
                    <div>
                      <textarea 
                        name="skills" 
                        value={editedEmployee.skills.join(', ')} 
                        onChange={handleSkillChange}
                        className="w-full border rounded-md px-3 py-2"
                        placeholder="Separate skills with commas"
                      />
                      <p className="text-xs text-gray-500 mt-1">Separate skills with commas</p>
                    </div> :
                    <div className="flex flex-wrap gap-2">
                      {employee.skills.map((skill, index) => (
                        <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  }
                </div>
              </section>
              
              <section>
                <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Projects</h3>
                <div className="mt-3">
                  {isEditing ? 
                    <div>
                      <textarea 
                        name="projects" 
                        value={editedEmployee.projects.join(', ')} 
                        onChange={handleProjectChange}
                        className="w-full border rounded-md px-3 py-2"
                        placeholder="Separate projects with commas"
                      />
                      <p className="text-xs text-gray-500 mt-1">Separate projects with commas</p>
                    </div> :
                    <ul className="list-disc pl-5 text-gray-600">
                      {employee.projects.map((project, index) => (
                        <li key={index}>{project}</li>
                      ))}
                    </ul>
                  }
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper component for displaying info items
function InfoItem({ icon, label, children } : InfoItemProps) {
  return (
    <div className="flex items-start">
      <div className="text-blue-500 mr-2 mt-1">
        {icon}
      </div>
      <div>
        <p className="text-xs text-gray-500">{label}</p>
        <div className="text-gray-700">{children}</div>
      </div>
    </div>
  );
}
