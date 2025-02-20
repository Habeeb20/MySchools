import React, { useEffect, useState } from 'react';
import { AiOutlineHome, AiOutlineUser, AiOutlineTeam, AiOutlineCheckCircle, AiOutlineExclamationCircle } from 'react-icons/ai';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';

const AllExam = () => {
    const [exam, setExam] = useState([])
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_APIA}/exam`)
                setExam(response.data)
                setLoading(false)
            } catch (error) {
                console.error("Error fetching schools:", error);
                setLoading(false);
            }
        }
        fetchUsers()
    }, [])

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        });
      };

      const [isSidebarVisible, setSidebarVisible] = useState(false);

      const toggleSidebar = () => {
        setSidebarVisible(!isSidebarVisible);
      };

  return (
    <div className="flex h-screen">
    <aside className="hidden md:flex  fixed top-0 left-0 w-full md:w-44 bg-green-900 text-white flex flex-col h-screen mt-0 mb-0">
<div className="flex items-center space-x-2 text-white mb-6 p-4">
<img src="/apple-logo.png" alt="Logo" className="h-8 w-8" />
<span className="text-xl font-bold"> | Admin</span>
</div>
<nav className="flex flex-col space-y-2">
<NavLink to="/admin" className="flex items-center space-x-2 text-gray-300 hover:text-white px-4 py-2 rounded-lg">
 <AiOutlineHome className="h-6 w-6" />
 <span>Dashboard</span>
</NavLink>
<NavLink to="/admin/schools" className="flex items-center space-x-2 text-gray-300 hover:text-white px-4 py-2 rounded-lg ">
 <AiOutlineUser className="h-6 w-6" />
 <span>All schools</span>
</NavLink>
<NavLink to="/admin/teachers" className="flex items-center space-x-2 text-gray-300 hover:text-white px-4 py-2 rounded-lg ">
 <AiOutlineTeam className="h-6 w-6" />
 <span>All teachers</span>
</NavLink>
<NavLink to="/admin/tutorial" className="flex items-center space-x-2 text-gray-300 hover:text-white px-4 py-2 rounded-lg  ">
 <AiOutlineCheckCircle className="h-6 w-6" />
 <span>All tutorials</span>
</NavLink>
<NavLink to="/admin/training" className="flex items-center space-x-2 text-gray-300 hover:text-white px-4 py-2 rounded-lg">
 <AiOutlineExclamationCircle className="h-6 w-6" />
 <span>All Training</span>
</NavLink>

<NavLink to="/admin/exam" className="flex items-center space-x-2 text-gray-300 hover:text-white px-4 py-2 rounded-lg  bg-green-700 font-bold ">
 <AiOutlineExclamationCircle className="h-6 w-6" />
 <span>All exam</span>
</NavLink>

<NavLink to="/admin/store" className="flex items-center space-x-2 text-gray-300 hover:text-white px-4 py-2 rounded-lg">
 <AiOutlineExclamationCircle className="h-6 w-6" />
 <span>All stores</span>
</NavLink>

<NavLink to="/admin/books" className="flex items-center space-x-2 text-gray-300 hover:text-white px-4 py-2 rounded-lg  ">
 <AiOutlineExclamationCircle className="h-6 w-6" />
 <span>All bookstores</span>
</NavLink>
<NavLink to="/reportedaccounts" className="flex items-center space-x-2 text-gray-300 hover:text-white px-4 py-2 rounded-lg">
 <AiOutlineExclamationCircle className="h-6 w-6" />
 <span>Reported Accounts</span>
</NavLink>

<NavLink to="/adminrequest" className="flex items-center space-x-2 text-gray-300 hover:text-white px-4 py-2 rounded-lg">
 <AiOutlineExclamationCircle className="h-6 w-6" />
 <span>All requests</span>
</NavLink>
</nav>
</aside>


<div className="flex-1 bg-gray-100 p-8 overflow-y-auto">
<h1 className="text-2xl font-bold mb-6">All exam</h1>
{loading ? (
 <p>Loading tutorial...</p>
): (
 <div className="overflow-x-auto">
 <table className="min-w-full ml-20 bg-white rounded-lg shadow-lg">
 <thead className="bg-green-800  text-white">
 <tr>
       <th className="py-2 px-4 text-left">ID</th>

       <th className="py-2 px-4 text-left">Exam Name</th>
       <th className="py-2 px-4 text-left">Email</th>
       <th className="py-2 px-4 text-left">Date</th>
       <th className="py-2 px-4 text-left">Status</th>
       <th className="py-2 px-4 text-left">phone</th>
       <th className="py-2 px-4 text-left">location</th>
       <th className="py-2 px-4 text-left">State</th>
       <th className="py-2 px-4 text-left">LGA</th>
       <th className="py-2 px-4 text-left">Actions</th>
     </tr>

     </thead>
   <tbody>
     {exam.map((user, index) => (
       <tr key={user._id} className="border-b">
         <td className="py-2 px-4">{index + 1}</td>

         <td className="py-2 px-4">{user.examBody}</td>
         <td className="py-2 px-4">{user.email}</td>
         <td className="py-2 px-4">{formatDate(user.createdAt)}</td>
         <td className="py-2 px-4">{user.status}</td>
         <td className="py-2 px-4">{user.phone}</td>
         <td className="py-2 px-4">{user.location}</td>
         <td className="py-2 px-4">{user.state}</td>
         <td className="py-2 px-4">{user.LGA}</td>
         <td className="py-2 px-4 flex space-x-2">
           {!user.isVerified ? (
             <button
               onClick={() => handleVerify(user._id)}
               className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
             >
               Verify
             </button>
           ) : (
             <span className="bg-gray-500 text-white px-4 py-1 rounded">Verified</span>
           )}
           <button className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600">Block</button>
         </td>
       </tr>
     ))}
   </tbody>
 </table>
 </div>
)}
</div>

<div>
{/* Mobile Sidebar Toggle Button */}
<div className="md:hidden fixed bottom-4 left-4 bg-green-900 text-white p-2 rounded-full shadow-lg">
<button onClick={toggleSidebar} className="text-xl">☰</button>
</div>

{/* Sidebar (conditionally rendered) */}
{isSidebarVisible && (
<div className="fixed inset-0 bg-black bg-opacity-50 z-50">
 <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg z-50 p-4">
   <h2 className="text-2xl font-bold mb-4">Sidebar Menu</h2>
   <ul>
     <li className="mb-2"><a href="/admin" className="block p-2">Dashboard</a></li>
     <li className="mb-2"><a href="/admin/schools" className="block p-2">All schools</a></li>
     <li className="mb-2"><a href="/admin/teachers" className="block p-2">All teachers</a></li>
     <li className="mb-2"><a href="/admin/tutorial" className="block p-2">All tutorial</a></li>
     <li className="mb-2"><a href="/admin/training" className="block p-2">All training</a></li>
     <li className="mb-2"><a href="/admin/exam" className="block p-2">All exam</a></li>
     <li className="mb-2"><a href="/admin/store" className="block p-2">All stores</a></li>
     <li className="mb-2"><a href="/admin/books" className="block p-2">All bookshops</a></li>
     <li className="mb-2"><a href="/reportedaccounts" className="block p-2">Reported Accounts</a></li>
     <li className="mb-2"><a href="/adminrequest" className="block p-2">All requests</a></li>
   </ul>
   <button onClick={toggleSidebar} className="mt-4 text-red-500">Close</button>
 </div>
</div>
)}
</div>
</div>
)
}

export default AllExam
