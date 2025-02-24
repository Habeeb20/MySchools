import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaEye } from "react-icons/fa";
import {
  FaSearch,
  FaPhoneAlt,
  FaWhatsapp,
  FaEnvelope,
  FaMapMarkerAlt,
  FaShareAlt,
} from "react-icons/fa";


const TrainingDetails = () => {
    const { slug } = useParams();
    const [school, setSchool] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [userLocation, setUserLocation] = useState("");
    const [shareCount, setShareCount] = useState(0);
    const [clickCount, setClickCount] = useState(0);
    const [userName, setUserName] = useState("");
    const [showModal, setShowModal] = useState(false);

          // Fetch exam details
  useEffect(() => {
    if (!slug) {
      setError("training center ID not found");
      return;
    }

    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_API_TR}/atraining/${slug}`)
      .then((response) => {
        setSchool(response.data.store);
        setComments(response.data.store?.comments || []);
        setError(null);
     
      })
      .catch((error) => {
        console.log(error);
        setError("Failed to load profile, please try again later");
      })
      .finally(() => setLoading(false));
  }, [slug]);

  const handleMapClick = (address) => {
    // Prompt for user's location
    const location = prompt("Enter your location to see the distance:");
    setUserLocation(location);
    if (location) {
      window.open(`https://www.google.com/maps/search/?api=1&query=${address}`);
    }
  };
  useEffect(() => {
    // Fetch the click count for the school
    const fetchClickCount = async () => {
      const response = await axios.get(`${import.meta.env.VITE_API_TR}/get-clicks/`);
    
      console.log(response.data)
      setClickCount(response.data.clicks);
    };

    fetchClickCount();
  }, [])

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_TR}/${slug}/shares`)
      .then((response) => {
        console.log("Share count fetched successfully:", response.data);
        setShareCount(response.data.shareCount || 0);
      })
      .catch((error) => {
        console.error("Failed to fetch share count:", error);
      });
  }, [slug]);

  const handleShareClick = async () => {
    try {
      setShareCount((prev) => prev + 1);

      const response = await axios.post(
        `${import.meta.env.VITE_API_TR}/${slug}/shares`
      );
      console.log("Share recorded successfully:", response.data);

      if (response.data && response.data.shareCount) {
        setShareCount(response.data.shareCount);
      }
    } catch (error) {
      console.error("Failed to record share:", error);

      setShareCount((prev) => prev - 1);
      alert("Failed to record share. Please try again.");
    } finally{
        setLoading(false)
    }
  };

    // Handle new comment submission
    const handleAddComment = () => {
        if (newComment.trim() === "" || userName.trim() === "") return;
    
        const comment = { name: userName, text: newComment };
        const updatedComments = [...comments, comment];
        setComments(updatedComments);
        setNewComment("");
        setUserName("");
        setShowModal(false);
    
        localStorage.setItem(
          `school_${slug}_comments`,
          JSON.stringify(updatedComments)
        );
    
        axios
          .post(`${import.meta.env.VITE_API_TR}/${slug}/comments`, comment)
          .then(() => {})
          .catch((error) => console.error("Failed to post comment:", error));
      };

  if (error) {
    return (
      <div className="flex flex-col mt-20  items-center justify-center  bg-gray-100">
        <p className="text-red-500 font-semibold text-lg">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-red-500 text-white px-6 py-3 rounded-md mt-4 hover:bg-red-600 transition"
        >
          Reload
        </button>
      </div>
    );
  }

  if (loading || !school) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-4 border-green-600"></div>
        <p className="text-lg font-semibold text-gray-700 mt-4">Loading...</p>
      </div>
    );
  }




  return (
    <div className="p-4 md:p-8 bg-gray-100 ">
    <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
      {/* School Cover Image */}
      <img
        src={school.picture2 || picture1 || picture3 || picture4 || picture5 || picture6 || picture7 ||"https://via.placeholder.com/600x200"}
        alt={school.storeName}
        className="w-full h-64 rounded-md object-cover shadow-lg"
      />

      {/* School Details */}
      <div className="flex flex-col space-y-6">
        <h1 className="font-bold text-3xl text-green-600 text-center">
          {school.trainingName} 
        </h1>
        <div className="flex flex-col md:flex-row md:space-x-6 space-y-4 md:space-y-0">
          <img
            src={school.picture4 || school.picture1 || school.picture2 || school.picture3 || "https://via.placeholder.com/150"}
            alt={school.examBody}
            className="w-32 h-32 md:w-48 md:h-48 rounded-md object-cover shadow-lg"
          />
          <div className="space-y-2">
            <p className="text-gray-700">
              <span className="font-bold">Email:</span> {school.email}
            </p>
            <p className="text-gray-700">
              <span className="font-bold">Phone:</span> {school.phone}
            </p>
            <p className="text-gray-700">
              <span className="font-bold">State:</span> {school.state}
            </p>
            <p className="text-gray-700">
              <span className="font-bold">LGA:</span> {school.LGA}
            </p>
            <p className="text-gray-700">
              <span className="font-bold">Address:</span> {school.location}
            </p>
          </div>
        </div>

        <div className="space-y-2">
   
     
       
        {/* Grid Picture */}
        <div className="p-2  mb-negative">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-2 bg-white shadow-md rounded-lg">
              <img
                src={school.picture1 ||   "https://via.placeholder.com/150"}
                alt="Picture 1"
                className="w-full h-auto rounded-md object-cover"
              />
            </div>
            <div className="p-2 bg-white shadow-md rounded-lg">
              <img
                src={school.picture2 ||   "https://via.placeholder.com/150"}
                alt="Picture 2"
                className="w-full h-auto rounded-md object-cover"
              />
            </div>
            <div className="p-2 bg-white shadow-md rounded-lg">
              <img
                src={school.picture3 ||   "https://via.placeholder.com/150"}
                alt="Picture 3"
                className="w-full h-auto rounded-md object-cover"
              />
            </div>
            <div className="p-2 bg-white shadow-md rounded-lg">
              <img
                src={school.picture4 ||   "https://via.placeholder.com/150"}
                alt="Picture 3"
                className="w-full h-auto rounded-md object-cover"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-around mt-0">
          <button
            onClick={() => handleMapClick(school.location)}
            className="text-green-600"
          >
            <FaMapMarkerAlt size={20} />
          </button>
          <a
            href={`https://wa.me/${school.phone}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-500"
          >
            <FaWhatsapp size={20} />
          </a>
          <a href={`tel:${school.phone}`} className="text-blue-500">
            <FaPhoneAlt size={20} />
          </a>
          <a href={`mailto:${school.email}`} className="text-red-500">
            <FaEnvelope size={20} />
          </a>
          <a
            href={`https://share-url.com?url=${encodeURIComponent(
              window.location.href
            )}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <button
              onClick={handleShareClick}
              className="text-gray-600 flex items-center space-x-2"
            >
              <FaShareAlt size={20} />
              <span>{shareCount}</span>
            </button>
          </a>
          <button className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
            <FaEye size={20} />
            <span>{clickCount}</span>
          </button>
        </div>

  
       {/* Comments Section */}
       <div className="bg-gray-50 p-6 mt-8 rounded-lg shadow-md">
          <h3 className="font-bold text-xl text-gray-800">
            Comments ({comments.length})
          </h3>
          <div className="mt-4 space-y-4">
            {comments.map((comment, index) => (
              <div key={index} className="p-4 bg-white rounded-lg shadow-md">
                <p className="font-semibold">{comment.name}</p>
                <p>{comment.text}</p>
              </div>
            ))}
          </div>

          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="mt-4 p-3 w-full border border-gray-300 rounded-md"
            placeholder="Add a comment..."
          />
            <button
            onClick={() => setShowModal(true)}
            className="mt-2 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition"
          >
            Add Comment
          </button>
         
        </div>
      </div>
        {/* Modal */}
        {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h3 className="text-lg font-semibold mb-4">Enter Your Name</h3>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md mb-4"
              placeholder="Your Name"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleAddComment}
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
  </div>
  </div>
  )
}

export default TrainingDetails
