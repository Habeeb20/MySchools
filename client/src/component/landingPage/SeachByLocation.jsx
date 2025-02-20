import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaCity, FaMapMarkerAlt, FaBuilding, FaLandmark } from "react-icons/fa";

const SearchByLocation = () => {
  const navigate = useNavigate();
  const [visibleCount, setVisibleCount] = useState(4);
  const [stateCounts, setStateCounts] = useState({
    "Abia": 0,
    "Adamawa": 0,
    "Akwa Ibom": 0,
    "Anambra": 0,
    "Bauchi": 0,
    "Bayelsa": 0,
    "Benue": 0,
    "Borno": 0,
    "Cross River": 0,
    "Delta": 0,
    "Ebonyi": 0,
    "Edo": 0,
    "Ekiti": 0,
    "Enugu": 0,
    "Gombe": 0,
    "Imo": 0,
    "Jigawa": 0,
    "Kaduna": 0,
    "Kano": 0,
    "Katsina": 0,
    "Kebbi": 0,
    "Kogi": 0,
    "Kwara": 0,
    "Lagos": 0,
    "Nasarawa": 0,
    "Niger": 0,
    "Ogun": 0,
    "Ondo": 0,
    "Osun": 0,
    "Oyo": 0,
    "Plateau": 0,
    "Rivers": 0,
    "Sokoto": 0,
    "Taraba": 0,
    "Yobe": 0,
    "Zamfara": 0,
    "Abuja": 0
  });

  const states = [
    { name: "Lagos", icon: <FaCity />, state: "Lagos" },
    { name: "Abuja", icon: <FaMapMarkerAlt />, state: "Abuja" },
    { name: "Oyo", icon: <FaBuilding />, state: "Oyo" },
    { name: "Kwara", icon: <FaLandmark />, state: "Kwara" },
    { name: "Nasarawa", icon: <FaCity />, state: "Nasarawa" },
    { name: "Niger", icon: <FaMapMarkerAlt />, state: "Niger" },
    { name: "Delta", icon: <FaBuilding />, state: "Delta" },
    { name: "Kano", icon: <FaLandmark />, state: "Kano" },
    { name: "Ondo", icon: <FaCity />, state: "Ondo" },
    { name: "Osun", icon: <FaMapMarkerAlt />, state: "Osun" },
    { name: "Ekiti", icon: <FaBuilding />, state: "Ekiti" },
    { name: "Abia", icon: <FaLandmark />, state: "Abia" },
    { name: "Enugu", icon: <FaCity />, state: "Enugu" },
    { name: "Imo", icon: <FaMapMarkerAlt />, state: "Imo" },
    { name: "Jigawa", icon: <FaBuilding />, state: "Jigawa" },
    { name: "Adamawa", icon: <FaLandmark />, state: "Adamawa" },
    { name: "Akwa Ibom", icon: <FaCity />, state: "Akwa Ibom" },
    { name: "Anambra", icon: <FaMapMarkerAlt />, state: "Anambra" },
    { name: "Bauchi", icon: <FaBuilding />, state: "Bauchi" },
    { name: "Bayelsa", icon: <FaLandmark />, state: "Bayelsa" },
    { name: "Benue", icon: <FaCity />, state: "Benue" },
    { name: "Borno", icon: <FaMapMarkerAlt />, state: "Borno" },
    { name: "Cross River", icon: <FaBuilding />, state: "Cross River" },
    { name: "Ebonyi", icon: <FaLandmark />, state: "Ebonyi" },
    { name: "Edo", icon: <FaCity />, state: "Edo" },
    { name: "Gombe", icon: <FaMapMarkerAlt />, state: "Gombe" },
    { name: "Kebbi", icon: <FaBuilding />, state: "Kebbi" },
    { name: "Kogi", icon: <FaLandmark />, state: "Kogi" },
    { name: "Kwara", icon: <FaCity />, state: "Kwara" },
    { name: "Lagos", icon: <FaMapMarkerAlt />, state: "Lagos" },
    { name: "Niger", icon: <FaBuilding />, state: "Niger" },
    { name: "Ogun", icon: <FaLandmark />, state: "Ogun" },
    { name: "Ogun", icon: <FaCity />, state: "Ogun" },
    { name: "Plateau", icon: <FaMapMarkerAlt />, state: "Plateau" },
    { name: "Rivers", icon: <FaBuilding />, state: "Rivers" },
    { name: "Sokoto", icon: <FaLandmark />, state: "Sokoto" },
    { name: "Taraba", icon: <FaCity />, state: "Taraba" },
    { name: "Yobe", icon: <FaMapMarkerAlt />, state: "Yobe" },
    { name: "Zamfara", icon: <FaBuilding />, state: "Zamfara" },
  ];

  const handleCategoryClick = (state) => {
    console.log(`Navigating to state: ${state}`);
    navigate(`/state/${state}`);
  };

  const handleSeeMore = () => {
    setVisibleCount((prevCount) => prevCount + 4);
  };

  const handleShowLess = () => {
    setVisibleCount(4);
  };

  useEffect(() => {
    const fetchLocationCounts = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API}/schools/location/counts`
        );
    
        setStateCounts(response.data);
        console.log("this is location!!!",response.data)
      } catch (error) {
        console.error("Error fetching category counts:", error);
      }
    };

    fetchLocationCounts();
  }, []);

  return (
    <div className=" flex flex-col items-center bg-gray-50 p-6 pb-0 mt-2">
      <h2 className="text-2xl font-bold text-red-600">Browse by Location</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {states.slice(0, visibleCount).map((state, index) => (
          <div
            key={index}
            onClick={() => handleCategoryClick(state.state)}
            className="flex flex-col items-center bg-white shadow-lg p-4 rounded-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
          >
            <div className="text-4xl text-gray-700 mb-2">{state.icon}</div>
            <p className="text-center text-gray-800 font-semibold">{state.name}</p>
            <p className="text-center text-gray-500">
              {stateCounts[state.state]}
            </p>
          </div>
        ))}
      </div>
      <div className="button-container text-center mt-5">
        {visibleCount < states.length && (
          <button
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all duration-300"
            onClick={handleSeeMore}
          >
            See More
          </button>
        )}
        {visibleCount >= states.length && states.length > 4 && (
          <button
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all duration-300"
            onClick={handleShowLess}
          >
            Show Less
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchByLocation;
