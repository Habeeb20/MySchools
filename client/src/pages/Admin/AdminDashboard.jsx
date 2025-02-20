import React, { useState } from "react";
import { Routes, Route, NavLink, Link } from "react-router-dom";
import {
  AiOutlineHome,
  AiOutlineUser,
  AiOutlineTeam,
  AiOutlineCheckCircle,
  AiOutlineExclamationCircle,
} from "react-icons/ai";
import Dashboard from "./Dashboard";
import AllBooks from "./AllBooks";
import AllExam from "./AllExam";
import AllStore from "./AllStore";
import AllTeacher from "./AllTeacher";
import AllTraining from "./AllTraining";
import AllTutorial from "./AllTutorial";
import { usePaymentStatus } from "../../Context/PaymentContext";
const AdminDashboard = () => {
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const { isPaymentActive, setIsPaymentActive } = usePaymentStatus();

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  const togglePaymentStatus = async () => {
    const newStatus = !isPaymentActive;
    const response = await fetch("/api/settings/payment-status", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isPaymentActive: newStatus }),
    });

    if (response.ok) {
      setIsPaymentActive(newStatus);
      alert(`Payment page ${newStatus ? "activated" : "deactivated"}`);
    } else {
      alert("Error updating payment status");
    }
  };


  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="hidden md:flex  fixed top-0 left-0 w-full md:w-64 bg-green-900 text-white flex flex-col h-screen mt-0 mb-0">
        <div className="flex items-center space-x-2 text-white mb-6 p-4">
          <img src="/apple-logo.png" alt="Logo" className="h-8 w-8" />
          <span className="text-xl font-bold"> | Admin</span>
        </div>
        <nav className="flex flex-col space-y-4">
        <button onClick={togglePaymentStatus}>
        {isPaymentActive ? "Deactivate Payment" : "Activate Payment"}
      </button>
          <NavLink
            to="/admin"
            className="flex items-center space-x-2 text-gray-300 hover:text-white px-4 py-2 rounded-lg bg-green-700 font-bold"
          >
            <AiOutlineHome className="h-6 w-6" />
            <span>Dashboard</span>
          </NavLink>
          <NavLink
            to="/admin/schools"
            className="flex items-center space-x-2 text-gray-300 hover:text-white px-4 py-2 rounded-lg "
          >
            <AiOutlineUser className="h-6 w-6" />
            <span>All schools</span>
          </NavLink>
          <NavLink
            to="/admin/teachers"
            className="flex items-center space-x-2 text-gray-300 hover:text-white px-4 py-2 rounded-lg "
          >
            <AiOutlineTeam className="h-6 w-6" />
            <span>All teachers</span>
          </NavLink>
          <NavLink
            to="/admin/tutorial"
            className="flex items-center space-x-2 text-gray-300 hover:text-white px-4 py-2 rounded-lg"
          >
            <AiOutlineCheckCircle className="h-6 w-6" />
            <span>All tutorials</span>
          </NavLink>
          <NavLink
            to="/admin/training"
            className="flex items-center space-x-2 text-gray-300 hover:text-white px-4 py-2 rounded-lg"
          >
            <AiOutlineExclamationCircle className="h-6 w-6" />
            <span>All Training</span>
          </NavLink>

          <NavLink
            to="/admin/exam"
            className="flex items-center space-x-2 text-gray-300 hover:text-white px-4 py-2 rounded-lg"
          >
            <AiOutlineExclamationCircle className="h-6 w-6" />
            <span>All exam</span>
          </NavLink>

          <NavLink
            to="/admin/store"
            className="flex items-center space-x-2 text-gray-300 hover:text-white px-4 py-2 rounded-lg"
          >
            <AiOutlineExclamationCircle className="h-6 w-6" />
            <span>All stores</span>
          </NavLink>

          <NavLink
            to="/admin/books"
            className="flex items-center space-x-2 text-gray-300 hover:text-white px-4 py-2 rounded-lg"
          >
            <AiOutlineExclamationCircle className="h-6 w-6" />
            <span>All bookstores</span>
          </NavLink>
          <NavLink
            to="/reportedaccounts"
            className="flex items-center space-x-2 text-gray-300 hover:text-white px-4 py-2 rounded-lg"
          >
            <AiOutlineExclamationCircle className="h-6 w-6" />
            <span>Reported Accounts</span>
          </NavLink>

          <NavLink
            to="/adminrequest"
            className="flex items-center space-x-2 text-gray-300 hover:text-white px-4 py-2 rounded-lg"
          >
            <AiOutlineExclamationCircle className="h-6 w-6" />
            <span>All requests</span>
          </NavLink>
        </nav>
      </aside>
      {/* Main Content */}
      <div className="flex-1 bg-gray-100 p-8 overflow-y-auto">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          {/* <Route path="/admin/books" element={<AllUsers />} /> */}
          <Route path="/allbooks" element={<AllBooks />} />
          {/* <Route path="/verify-users" element={<VerifyUsers />} />
          <Route path="/verify-leaders" element={<VerifyLeaders />} />
          <Route path="/reported" element={<ReportedAccounts />} /> */}
        </Routes>
      </div>
      {/* Mobile Sidebar Toggle Button */}
      <div className="md:hidden fixed bottom-4 left-4 bg-green-900 text-white p-2 rounded-full shadow-lg">
        <button onClick={toggleSidebar} className="text-xl">
          ☰
        </button>
      </div>

      {/* Sidebar (conditionally rendered) */}
      {isSidebarVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg z-50 p-4">
            <h2 className="text-2xl font-bold mb-4">Sidebar Menu</h2>
            <ul>
              <li className="mb-2">
                <a href="/admin" className="block p-2">
                  Dashboard
                </a>
              </li>
              <li className="mb-2">
                <a href="/admin/schools" className="block p-2">
                  All schools
                </a>
              </li>
              <li className="mb-2">
                <a href="/admin/teachers" className="block p-2">
                  All teachers
                </a>
              </li>
              <li className="mb-2">
                <a href="/admin/tutorial" className="block p-2">
                  All tutorial
                </a>
              </li>
              <li className="mb-2">
                <a href="/admin/training" className="block p-2">
                  All training
                </a>
              </li>
              <li className="mb-2">
                <a href="/admin/exam" className="block p-2">
                  All exam
                </a>
              </li>
              <li className="mb-2">
                <a href="/admin/store" className="block p-2">
                  All stores
                </a>
              </li>
              <li className="mb-2">
                <a href="/admin/books" className="block p-2">
                  All bookshops
                </a>
              </li>
              <li className="mb-2">
                <a href="/reportedaccounts" className="block p-2">
                  Reported Accounts
                </a>
              </li>
              <li className="mb-2">
                <a href="/adminrequest" className="block p-2">
                  All requests
                </a>
              </li>
            </ul>
            <button onClick={toggleSidebar} className="mt-4 text-red-500">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
