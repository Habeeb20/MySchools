import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const CategoryDisplay = () => {
  const { category, id } = useParams();
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const fetchUrl = () => {
      switch (category) {
        case "teachers":
          return `${import.meta.env.VITE_APIT}/${id}`;
        case "schools":
          return `${import.meta.env.VITE_API}/schools/${id}`;
        case "exams":
          return `${import.meta.env.VITE_APIE}/${id}`;
        case "bookshops":
          return `${import.meta.env.VITE_APIB}/${id}`;
        case "tutorials":
          return `${import.meta.env.VITE_APITU}/${id}`;
        default:
          return null;
      }
    };

    const url = fetchUrl();
    if (url) {
      axios
        .get(url)
        .then((response) => {
          setDetails(response.data);
          setLoading(false);
        })
        .catch((err) => {
          setError("Failed to load details. Please try again later.", err);
          setLoading(false);
        });
    } else {
      setError("Invalid category selected.");
      setLoading(false);
    }
  }, [category, id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-semibold">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!details) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">No details available.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h2 className="text-2xl font-bold text-green-600 mb-4 capitalize">
        {category} Details
      </h2>
      <div className="bg-white shadow-lg p-4 rounded-lg">
        <img
          src={
            details.picture || details.coverPicture || details.profilePicture ||  details.picture1 || details.picture2 ||  details.picture3 ||  details.picture4 || 
            "https://via.placeholder.com/150"
          }
          alt={details.name || details.schoolName || details.examBody}
          className="w-32 h-32 md:w-48 md:h-48 rounded-full object-cover shadow-lg mx-auto"
        />
        <h3 className="text-xl font-bold text-gray-800 mt-4">
          {details.name || details.schoolName || details.examBody || details.tutorialName || details.bookshopName || details.fname || details.lname || "No Name"}
        </h3>
        {details.email && (
          <p className="text-gray-600">Email: {details.email}</p>
        )}
        {details.phone && (
          <p className="text-gray-600">Phone No: {details.phone}</p>
        )}
        {details.location && (
          <p className="text-gray-600">Address: {details.location}</p>
        )}
        {details.state && (
          <p className="text-gray-600">state: {details.state}</p>
        )}
        {details.LGA && (
          <p className="text-gray-600">Address: {details.LGA}</p>
        )}
        {details.category && (
          <p className="text-gray-600">Category: {details.category}</p>
        )}
        <p className="text-gray-600 mt-2">{details.description || "No Description Available."}</p>
      </div>
    </div>
  );
};

export default CategoryDisplay;
