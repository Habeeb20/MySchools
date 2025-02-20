import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
const DataInState = () => {
  const { location } = useParams();
  const [data, setData] = useState({
    schools: [],
    teachers: [],
    training: [],
    exam: [],
    bookshop: [],
    store: [],
    tutorial: [],
  });

  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API}/all/details/${location}`
        );
        setData(response.data);
        setFilteredData(response.data);
      } catch (error) {
        console.error("Error fetching state details:", error);
        toast.error("Failed to load data for the selected location.");
      }
    };

    fetchData();
  }, [location]);

  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchTerm(searchValue);

    if (searchValue === "" && activeCategory === "all") {
      setFilteredData(data);
    } else {
      const filteredResults = Object.fromEntries(
        Object.entries(data).map(([key, value]) => [
          key,
          value.filter((item) =>
            JSON.stringify(item).toLowerCase().includes(searchValue)
          ),
        ])
      );
      setFilteredData(filteredResults);
    }
  };

  const handleCategory = (category) => {
    setActiveCategory(category);

    if (category === "all") {
      setFilteredData(data);
    } else {
      setFilteredData({ [category]: data[category] });
    }
  };

  const getCount = (category) => {
    return category === "all"
      ? Object.values(data).flat().length
      : data[category]?.length || 0;
  };

  return (
    <div className="p-5">
      <h2 className="text-center text-2xl font-bold mb-5 mt-4">
        Data in {location} state
      </h2>

      {/* Search and Filter Section */}
      <div className="mb-5 flex flex-col items-center">
        <div className="flex space-x-2 mb-3">
          {[
            "all",
            "schools",
            "teachers",
            "training",
            "exam",
            "bookshop",
            "store",
            "tutorial",
          ].map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-lg ${
                activeCategory === category
                  ? "bg-green-500 text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => handleCategory(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
              {getCount(category)})
            </button>
          ))}
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search..."
          className="w-full md:w-1/2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      {/* Content Display Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {Object.entries(filteredData).map(([key, values]) =>
          values?.length > 0 ? (
            values.map((item) => (
              <div
                key={item._id}
                className="p-4 bg-white border border-gray-200 rounded-lg shadow-md"
              >
                <img
                  src={
                    item.picture1 ||
                    item.picture2 ||
                    item.picture3 ||
                    item.picture4 ||
                    item.picture5 ||
                    item.picture6 ||
                    item.picture7 ||
                    "https://via.placeholder.com/150"
                  }
                  alt={item.name || "Placeholder"}
                  className="w-full h-40 object-cover mb-3 rounded-md"
                />
                <h3 className="text-lg font-semibold">
                  {key.slice(0, -1).charAt(0).toUpperCase() + key.slice(1, -1)}{" "}
                  Name:{" "}
                  {item.trainingName ||
                    item.schoolName ||
                    item.fname ||
                    item.examBody ||
                    item.bookshopName ||
                    item.tutorialName ||
                    item.storeName ||
                    "N/A"}
                </h3>
                <p className="text-sm">
                  <strong>phone:</strong> {item.phone || "N/A"}
                </p>
                <p className="text-sm">
                  <strong>Email:</strong> {item.email || "N/A"}
                </p>
                <p className="text-sm">
                  <strong>Address:</strong> {item.location || "N/A"}
                </p>
                <Link
                  to={
                    item.type === "school"
                      ? `/schools/${item._id}`
                      : item.type === "teacher"
                      ? `/teacher/${item._id}`
                      : item.type === "training"
                      ? `/training/${item._id}`
                      : item.type === "exam"
                      ? `/exam/${item._id}`
                      : item.type === "tutorial"
                      ? `/tutorial/${item._id}`
                        : item.type === "store"
                      ? `/store/${item._id}`
                        : item.type === "bookshop"
                      ? `/bookshop/${item._id}`
                      
                      : "#"
                  }
                >
                  <button  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">View more</button>
                </Link>
              </div>
            ))
          ) : (
            <p key={key} className="text-center col-span-full">
              No {key} found in this location.
            </p>
          )
        )}
      </div>
    </div>
  );
};

export default DataInState;
