import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Admission = () => {
  const [schools, setSchools] = useState([]);
  const [filteredSchools, setFilteredSchools] = useState([]);
  const [userEmail, setUserEmail] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editCommentText, setEditCommentText] = useState("");
  const [editCommentImage, setEditCommentImage] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [replyToCommentId, setReplyToCommentId] = useState(null);
  const [newReplyImage, setNewReplyImage] = useState(null);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [currentSchoolLocation, setCurrentSchoolLocation] = useState("");
  const [userLocation, setUserLocation] = useState("");

  const fetchSchools = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_3}/getallschools`);
      const data = await response.json();
      setSchools(data);
      setFilteredSchools(data);
    } catch (error) {
      console.error("Error fetching schools:", error);
    }
  };



  useEffect(() => {
    fetchSchools();

  }, []);

  const openMapModal = (location) => {
    setCurrentSchoolLocation(location);
    setIsMapModalOpen(true);
  };

  const closeMapModal = () => {
    setIsMapModalOpen(false);
    setUserLocation("");
  };

  const handleMapNavigation = () => {
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${userLocation}&destination=${currentSchoolLocation}`;
    window.open(googleMapsUrl, "_blank");
    closeMapModal();
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments([
        ...comments,
        {
          id: Date.now(),
          text: newComment,
          image: selectedImage,
          replies: [],
        },
      ]);
      setNewComment("");
      setSelectedImage(null);
    }
  };

  const handleDateRangeChange = () => {
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);

    const filtered = schools.filter((school) => {
      const admissionStartDate = new Date(school.admissionStartDate);
      const admissionEndDate = new Date(school.admissionEndDate);

      return (
        admissionStartDate <= endDateObj && admissionEndDate >= startDateObj
      );
    });

    setFilteredSchools(filtered.length > 0 ? filtered : []);
  };

  return (
    <div className="bg-gradient-to-b from-blue-50 to-blue-100 min-h-screen p-6">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8 }} 
        className="max-w-6xl mx-auto text-center"
      >
        <h1 className="text-4xl font-extrabold text-green-700">Registered Schools</h1>
        <p className="text-lg text-gray-700 mt-2">
          Discover schools currently doing admission. Use the date range below to filter admissions open within your preferred dates.
        </p>
      </motion.div>

      {/* Date Range Filter */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 0.5 }}
        className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto mt-6"
      >
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="w-full sm:w-auto p-3 border rounded-lg shadow-md focus:ring-2 focus:ring-green-500"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="w-full sm:w-auto p-3 border rounded-lg shadow-md focus:ring-2 focus:ring-green-500"
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleDateRangeChange}
          className="px-5 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700"
        >
          Search
        </motion.button>
      </motion.div>

      {/* Schools List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mt-8">
        {filteredSchools.length > 0 ? (
          filteredSchools.map((school) => (
            <motion.div
              key={school._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-start hover:shadow-xl transition"
            >
              <motion.img 
                src={
                  school.coverPicture || school.schoolPicture || school.picture || school.picture1 || school.picture2 || "https://via.placeholder.com/600x200"
                }
                className="w-full h-40 object-cover rounded-lg mb-4"
                whileHover={{ scale: 1.05 }}
              />
              <h2 className="text-xl font-bold text-gray-900">{school.schoolName}</h2>
              <p className="text-gray-700">Email: {school.email}</p>
              <p className="text-gray-700">Phone: {school.phone}</p>
              <p className="text-gray-700">State: {school.state}</p>
              <p className="text-gray-700">LGA: {school.LGA}</p>
              <p className="text-gray-700">Address: {school.location}</p>
              <div className="flex mt-4 space-x-4">
                <Link
                
                  to={`/schools/${school.slug}`}
                  className="text-green-600 hover:underline"
                >
                  View More
                </Link>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={openMapModal}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700"
                >
                  Map
                </motion.button>
              </div>
            </motion.div>
          ))
        ) : (
          <p className="text-center text-gray-500 text-lg col-span-3">
            No schools are currently doing admission within the selected date range.
          </p>
        )}
      </div>

      {/* Map Modal */}
      {isMapModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-gray-900 bg-opacity-70 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-lg p-8 shadow-xl w-full max-w-md"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Enter Your Location</h3>
            <input
              type="text"
              value={userLocation}
              onChange={(e) => setUserLocation(e.target.value)}
              placeholder="Your current location"
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-green-400"
            />
            <div className="flex justify-end gap-4 mt-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={closeMapModal}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Cancel
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={handleMapNavigation}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                Go to Map
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Admission;
