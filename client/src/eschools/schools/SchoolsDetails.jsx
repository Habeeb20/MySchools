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

const SchoolsDetails = () => {
    const { slug } = useParams();
  const [school, setSchool] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [userLocation, setUserLocation] = useState("");
  const [shareCount, setShareCount] = useState(0);
  const [clickCount, setClickCount] = useState(0);
  // Fetch school details
  useEffect(() => {
    if (!slug) {
      setError("School ID not found");
      return;
    }

    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_API_3}/aschool/${slug}`)
      .then((response) => {
        setSchool(response.data.school);
        setComments(response.data.school.comments || []);
        setError(null);
      })
      .catch((error) => {
        console.log(error);
        setError("Failed to load profile, please try again later");
      })
      .finally(() => setLoading(false));
  }, [id]);

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
      const response = await fetch(`${import.meta.env.VITE_API_3}/get-clicks/${slug}`);
      const data = await response.json();
      console.log(data)
      setClickCount(data.clicks);
    };

    fetchClickCount();
  }, [id]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_3}/${slug}/shares`)
      .then((response) => {
        console.log("Share count fetched successfully:", response.data);
        setShareCount(response.data.shareCount || 0);
      })
      .catch((error) => {
        console.error("Failed to fetch share count:", error);
      });
  }, [id]);

  const handleShareClick = async () => {
    try {
      setShareCount((prev) => prev + 1);

      const response = await axios.post(
        `${import.meta.env.VITE_API_3}/${slug}/shares`
      );
      console.log("Share recorded successfully:", response.data);

      if (response.data && response.data.shareCount) {
        setShareCount(response.data.shareCount);
      }
    } catch (error) {
      console.error("Failed to record share:", error);

      setShareCount((prev) => prev - 1);
      alert("Failed to record share. Please try again.");
    }
  };

  // Handle new comment submission
  const handleAddComment = () => {
    if (newComment.trim() === "") return;

    const comment = { name: "Anonymous User", text: newComment };
    const updatedComments = [...comments, comment];
    setComments(updatedComments);
    setNewComment("");

    localStorage.setItem(
      `school_${id}_comments`,
      JSON.stringify(updatedComments)
    );

    axios
      .post(`${import.meta.env.VITE_API_3}/${slug}/comments`, comment)
      .then(() => {})
      .catch((error) => console.error("Failed to post comment:", error));
  };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
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
    <div className="p-4 md:p-8 bg-gray-100 " >
      <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
        {/* School Cover Image */}
        <img
          src={school.coverPicture || "https://via.placeholder.com/600x200"}
          alt={school.schoolName}
          className="w-full h-64 rounded-md object-cover shadow-lg"
        />

        {/* School Details */}
        <div className="flex flex-col space-y-6">
          <h1 className="font-bold text-3xl text-green-600 text-center">
            {school.schoolName}
          </h1>
          <div className="flex flex-col md:flex-row md:space-x-6 space-y-4 md:space-y-0">
            <img
              src={school.picture4 || "https://via.placeholder.com/150"}
              alt={school.schoolName}
              className="w-32 h-32 md:w-48 md:h-48 rounded-md object-cover shadow-lg"
            />
            <div className="space-y-2">
              <p className="text-gray-700">
                <span className="font-bold text-black">Email:</span> {school.email}
              </p>
              <p className="text-gray-700">
                <span className="font-bold text-black">Phone:</span> {school.phone}
              </p>
              <p className="text-gray-700">
                <span className="font-bold text-black">State:</span> {school.state}
              </p>
              <p className="text-gray-700">
                <span className="font-bold text-black">LGA:</span> {school.LGA}
              </p>
              <p className="text-gray-700">
                <span className="font-bold text-black">Address:</span> {school.location}
              </p>
              <p className="text-gray-700">
                <span className="font-bold text-black">minimum school fees:</span> {school.schoolFees}
              </p>

              <p className="text-gray-700">
                <span className="font-bold text-black">school fees :</span> {school.schoolfees1} for {school.class1}
              </p>

              
              <p className="text-gray-700">
                <span className="font-bold text-black">school fees :</span> {school.schoolfees2} for {school.class2}
              </p>

              
              <p className="text-gray-700">
                <span className="font-bold text-black">school fees :</span> {school.schoolfees3} for {school.class3}
              </p>

              
              <p className="text-gray-700">
                <span className="font-bold text-black">school fees :</span> {school.schoolfees4} for {school.class4}
              </p>

              
              <p className="text-gray-700">
                <span className="font-bold text-black">school fees :</span> {school.schoolfees5} for {school.class5}
              </p>

              
              <p className="text-gray-700">
                <span className="font-bold text-black">school fees :</span> {school.schoolfees6} for {school.class6}
              </p>

              
              <p className="text-gray-700">
                <span className="font-bold text-black">school fees :</span> {school.schoolfees7} for {school.class7}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-gray-700">
              <span className="font-bold text-black">Principal/VC Speech:</span>{" "}
              {school.vcspeech}
            </p>
            <img
              src={school.vcpicture || school.picture3|| "https://via.placeholder.com/600x200"}
              alt={school.schoolName}
              className="w-full h-64 rounded-md object-cover shadow-lg"
            />
            <p className="text-gray-700">
              <span className="font-bold text-black">Aims and Objectives:</span>{" "}
              {school.AO}
            </p>
            <p className="text-gray-700">
              <span className="font-bold text-black">History:</span> {school.history}
            </p>
          </div>

          {school.jobVacancy === "yes" || school.jobVacancy === "yeah" ? (
  <>
    <h3 className="text-black">Vacancies:</h3>
    <div className="space-y-2">
      <p className="text-gray-700">
        <span className="font-bold">Position 1:</span> {school.position1}     <span className="font-bold text-black">     salary:</span> {school.salary1} <span className="font-bold text-black">qualification:</span> {school.qualification1}
      </p>
      <p className="text-gray-700">
        <span className="font-bold">Position 2:</span> {school.position2}     <span className="font-bold text-black">     salary:</span>{school.salary2}  <span className="font-bold text-black">qualification:</span> {school.qualification2}
      </p>
      <p className="text-gray-700">
        <span className="font-bold">Position 3:</span> {school.position3}    <span className="font-bold text-black">     salary: </span>{school.salary3}  <span className="font-bold text-black">qualification:</span>{school.qualification3}
      </p>
      <p className="text-gray-700">
        <span className="font-bold">Position 4:</span> {school.position4}    <span className="font-bold text-black">     salary:</span>{school.salary4}  <span className="font-bold text-black">qualification:</span>{school.qualification4}
      </p>
      <p className="text-gray-700">
        <span className="font-bold">Position 5:</span> {school.position5}    <span className="font-bold text-black">     salary:</span>{school.salary5}  <span className="font-bold text-black">qualification: </span>{school.qualification5}
      </p>
    </div>
  </>
) : (
  <p>No vacancy in the school</p>
)}

     

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
                  src={school.schoolPicture ||   "https://via.placeholder.com/150"}
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
              onClick={handleAddComment}
              className="mt-2 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition"
            >
              Add Comment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchoolsDetails;
