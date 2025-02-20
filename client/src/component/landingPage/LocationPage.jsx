import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
const LocationPage = () => {
  const { state } = useParams();
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API}/schools`) 
      .then((response) => { 
       console.log("response", response.data)
        if (response.data && Array.isArray(response.data)) {
          const filteredSchools = response.data.filter((school) => {
           
            return( school.state === state)
          });
          
          console.log('object', filteredSchools)
          setSchools(filteredSchools);
        } else {
            console.log("not structured well")
          setError('No schools data available or incorrect format.');
        }
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to load schools. Please try again later.');
        setLoading(false);
      });
  }, [state]);
  
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

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h2 className="text-2xl font-bold text-green-600 mb-4 mt-4 capitalize">
         Schools in {state}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {schools?.map((school) => (
          <div key={school.id} className="bg-white shadow-lg p-4 rounded-lg">
          <img
  src={school.coverPicture || school.picture || school.schoolPictire || "https://via.placeholder.com/150"}
  alt={school.schoolName}
  className="w-32 h-32 md:w-48 md:h-48 rounded-full object-cover shadow-lg mx-auto"
/>

            <h3 className="text-xl font-bold text-gray-800">Name:{school.schoolName}</h3>
            <p className="text-gray-600">Email:{school.email}</p>
            <p className="text-gray-600">phone no:{school.phone}</p>
            <p className="text-gray-600">Address:{school.location}</p>
            <p className="text-gray-600">category{school.category}</p>
            <Link to={`/schooldetail/${school._id}`}>
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg mb-4 mx-4">
                  View More
                </button>
              </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LocationPage;
