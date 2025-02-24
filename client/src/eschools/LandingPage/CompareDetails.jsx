import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FaWhatsapp, FaEnvelope, FaPhone } from 'react-icons/fa';



const CompareDetails = () => {
    const [searchParams, setSearchParams] = useState({
        location: '',
        schoolFees: '',
        onBoarding: '',
        name: ''
      });
      const [results, setResults] = useState([]);
      const [userLocation, setUserLocation] = useState('');
      const [showMap, setShowMap] = useState(false);
      const [selectedSchool, setSelectedSchool] = useState(null);
    
      const handleChange = (e) => {
        setSearchParams({ ...searchParams, [e.target.name]: e.target.value });
      };

      const handleSearch = async () => {
        try {
          const response = await axios.get(`${import.meta.env.VITE_API_3}/schoolscompare`, {
            params: searchParams
          });
          setResults(response.data);
          if (response.status === 200) {
            toast.success("Successfully fetched");
          } else {
            toast.error("An error occurred");
          }
        } catch (error) {
          console.error('Error fetching schools:', error);
          toast.error("An error occurred externally");
        }
      };

      const handleShowMap = (school) => {
        setSelectedSchool(school);
        setShowMap(true);
      };
    
      const handleLocationChange = (e) => {
        setUserLocation(e.target.value);
      };
    
      const closeMap = () => {
        setShowMap(false);
        setUserLocation('');
        setSelectedSchool(null);
      };

      const renderMap = () => {
        if (!selectedSchool || !userLocation) return null;
    
        const schoolAddress = encodeURIComponent(selectedSchool.name); 
        const userAddress = encodeURIComponent(userLocation);
        const mapUrl = `https://www.google.com/maps/dir/?api=1&origin=${userAddress}&destination=${schoolAddress}`;
        return (
            <div className="absolute top-0 left-0 w-full h-full bg-white p-4 shadow-lg z-10">
              <button onClick={closeMap} className="text-red-500 mb-4">Close</button>
              <h4 className="text-xl font-semibold mb-2">Distance to {selectedSchool.school}</h4>
              <input
                type="text"
                placeholder="Enter your location"
                value={userLocation}
                onChange={handleLocationChange}
                className="mb-4 p-3 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <a
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-3 text-center bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
              >
                View Route on Google Maps
              </a>
            </div>
          );
        };
  return (
  
        <motion.div 
          className="container mx-auto p-6 max-w-xl bg-white shadow-2xl rounded-xl relative"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-green-800 text-center mb-6">Compare School Details</h2>
    
          <div className="space-y-4">
            <input
              type="text"
              name="location"
              value={searchParams.location}
              onChange={handleChange}
              placeholder="Enter Location"
              className="w-full p-3 text-lg border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-700"
            />
            <input
              type="number"
              name="schoolFees"
              value={searchParams.schoolFees}
              onChange={handleChange}
              placeholder="Max School Fees"
              className="w-full p-3 text-lg border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-700"
            />
            <select
              name="onBoarding"
              value={searchParams.onBoarding}
              onChange={handleChange}
              className="w-full p-3 text-lg border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-700"
            >
              <option value="">Boarding Option...</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
            <input
              type="text"
              name="name"
              value={searchParams.name}
              onChange={handleChange}
              placeholder="Enter Address"
              className="w-full p-3 text-lg border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-700"
            />
            <motion.button 
              onClick={handleSearch}
              className="w-full p-3 text-lg font-semibold text-white bg-green-700 rounded-lg hover:bg-green-800 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Search
            </motion.button>
          </div>
    
          <div className="mt-6">
            {results.length > 0 ? (
              results.map((school) => (
                <motion.div 
                  key={school._id} 
                  className="mb-6 p-6 bg-white border border-gray-300 rounded-lg shadow-lg"
                  whileHover={{ scale: 1.02 }}
                >
                  <h4 className="text-2xl font-semibold text-green-800">{school.schoolName}</h4>
                  <p className="text-gray-600">📧 {school.email}</p>
                  <p className="text-gray-600">📞 {school.phone}</p>
                  <p className="text-gray-600">📍 {school.location}</p>
                  <p className="text-gray-600">💰 Fees: {school.schoolFees}</p>
                  <p className="text-gray-600">🏠 Boarding: {school.onBoarding ? 'Yes' : 'No'}</p>
    
                  <div className="mt-4 flex space-x-4">
                    <a href={`https://wa.me/${school.phone}`} target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-700">
                      <FaWhatsapp size={24} />
                    </a>
                    <a href={`tel:${school.phone}`} className="text-blue-600 hover:text-blue-700">
                      <FaPhone size={24} />
                    </a>
                    <a href={`mailto:${school.email}`} className="text-red-600 hover:text-red-700">
                      <FaEnvelope size={24} />
                    </a>
                    <motion.button 
                      onClick={() => handleShowMap(school.name)}
                      className="ml-auto p-2 bg-green-700 text-white rounded-lg hover:bg-green-800"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Google Map
                    </motion.button>
                  </div>
                </motion.div>
              ))
            ) : (
              <p className="text-gray-500 text-center">No results found</p>
            )}
          </div>
    
          {showMap && renderMap()}
        </motion.div>
      );

}

export default CompareDetails
