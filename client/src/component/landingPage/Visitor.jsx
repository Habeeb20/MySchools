import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaUsers, FaUserCheck, FaSyncAlt, FaChartLine, FaUserPlus } from "react-icons/fa"; 

const Visitor = () => {
  const [stats, setStats] = useState(null);
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Fetch statistics when authenticated
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API}/api/stats`
        );
        setStats(response.data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    if (authenticated) {
      fetchStats();
    }
  }, [authenticated]);

  const handlePasswordSubmit = () => {
    if (password === "habeeb") {
      setAuthenticated(true);
      setErrorMessage("");
    } else {
      setErrorMessage("Incorrect password. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-100">
      {!authenticated ? (
        <div className="bg-white p-8 shadow-lg rounded-md">
          <h1 className="text-xl font-bold mb-4">Enter Password</h1>
          <input
            type="password"
            placeholder="Enter password to see the web statistics"
            className="border rounded w-full p-2 mb-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errorMessage && (
            <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
          )}
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={handlePasswordSubmit}
          >
            Submit
          </button>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto p-4">
          <h1 className="text-3xl font-bold text-center mb-8">
            Website Statistics
          </h1>
          {stats ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              <div className="bg-white p-6 shadow-md rounded-lg text-center">
                <FaUsers className="text-green-500 text-4xl mb-4" />
                <h2 className="text-lg font-semibold text-gray-700">
                  Total Visitors
                </h2>
                <p className="text-3xl font-bold text-green-500">
                  {stats.totalVisits}
                </p>
              </div>
              <div className="bg-white p-6 shadow-md rounded-lg text-center">
                <FaUserPlus className="text-indigo-500 text-4xl mb-4" />
                <h2 className="text-lg font-semibold text-gray-700">
                  New Visitors
                </h2>
                <p className="text-3xl font-bold text-indigo-500">
                  {stats.newVisitors}
                </p>
              </div>
              <div className="bg-white p-6 shadow-md rounded-lg text-center">
                <FaSyncAlt className="text-yellow-500 text-4xl mb-4" />
                <h2 className="text-lg font-semibold text-gray-700">
                  Returning Visitors
                </h2>
                <p className="text-3xl font-bold text-yellow-500">
                  {stats.returningVisitors}
                </p>
              </div>
              <div className="bg-white p-6 shadow-md rounded-lg text-center">
                <FaChartLine className="text-blue-500 text-4xl mb-4" />
                <h2 className="text-lg font-semibold text-gray-700">
                  Active Visitors
                </h2>
                <p className="text-3xl font-bold text-blue-500">
                  {stats.activeVisitors}
                </p>
              </div>
              <div className="bg-white p-6 shadow-md rounded-lg text-center">
                <FaUserCheck className="text-purple-500 text-4xl mb-4" />
                <h2 className="text-lg font-semibold text-gray-700">
                  Daily Visitors
                </h2>
                <p className="text-3xl font-bold text-purple-500">
                  {stats.dailyVisitors}
                </p>
              </div>
            </div>
          ) : (
            <p className="text-center text-gray-500">Loading...</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Visitor;
