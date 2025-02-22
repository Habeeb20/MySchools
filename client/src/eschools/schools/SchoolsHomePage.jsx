


import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function SchoolsHomePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [cardDetails, setCardDetails] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeOwnership, setActiveOwnership] = useState("All");

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_3}/getallschools`);
        const data = await response.json();
        setCardDetails(data);
      } catch (error) {
        console.error("Error fetching schools:", error);
      }
    };

    fetchSchools();
  }, []);

  const filteredCards = cardDetails.filter((card) => {
    const matchesCategory =
      activeCategory === "All" || card.category === activeCategory;
    const matchesOwnership =
      activeOwnership === "All" || (card.ownership && card.ownership?.toLowerCase() === activeOwnership.toLowerCase());
    const matchesSearchTerm = (card && card.schoolName
      ?.toLowerCase())
      ?.includes(searchTerm.toLowerCase());
    return matchesCategory && matchesOwnership && matchesSearchTerm;
  });

  const ratingStars = (rating) => {
    return "★".repeat(rating) + "☆".repeat(5 - rating);
  };

  return (
    <>
      {/* Header */}
      <header
        className="bg-cover bg-center text-center text-white text-3xl font-semibold py-3"
        style={{ backgroundImage: "url(/path-to-header-background-image)" }}
      >
        Schools and Institutions
      </header>

      {/* Category Menu */}
      <nav className="flex flex-wrap justify-center bg-gray-100 py-1 sticky top-0 z-10">
        {[
          "All",
          "Nursery & Primary",
          "secondary",
          "college of Education",
          "university",
          "polytechnic",
        ].map((category) => (
          <button
            key={category}
            onClick={() => {
              setActiveCategory(category);
              setActiveOwnership("All"); // Reset ownership when category changes
            }}
            className={`m-1 px-3 py-1 text-xs sm:text-sm font-medium border rounded-md ${
              activeCategory === category
                ? "bg-green-500 text-white"
                : "bg-white text-gray-700 hover:bg-gray-200"
            }`}
          >
            {category}
          </button>
        ))}
      </nav>

      {/* Ownership Filter Menu */}
      {activeCategory !== "All" && (
        <nav className="flex flex-wrap justify-center bg-gray-100 py-1 sticky top-0 z-10">
          {["All", "Private", "Federal", "State"].map((ownership) => (
            <button
              key={ownership}
              onClick={() => setActiveOwnership(ownership)}
              className={`m-1 px-3 py-1 text-xs sm:text-sm font-medium border rounded-md ${
                activeOwnership === ownership
                  ? "bg-green-500 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-200"
              }`}
            >
              {ownership}
            </button>
          ))}
        </nav>
      )}
    


      {/* Search Bar */}
      <div className="flex justify-center w-full py-8 bg-white">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: "400px" }}
          className="px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring focus:border-green-500"
        />
        <button className="bg-green-500 text-white px-4 py-2 rounded-r-md hover:bg-green-600">
          Search
        </button>
      </div>

      <div className="">
        <Link to="/chooselogin">
        <h6 className="text-2xl font-semibold text-green-600 text-right ">Login</h6>
        </Link>
      
      </div>

      {/* School Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mt-6 px-4">
        {filteredCards.map((card, index) => (
          <div
            key={index}
            className="border rounded-lg shadow-md overflow-hidden bg-white"
          >
            <img
              src={
                card.picture4 ||
                card.picture1 ||
                card.vcpicture ||
                card.coverpicture ||
                card.schoolPicture ||
                card.picture2 ||
                card.picture3 ||
                card.picture
              }
              alt={card.schoolName}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">School Name: {card.schoolName}</h3>
              <p className="text-gray-600 mb-4">School email: {card.email}</p>
              <p className="text-gray-600 mb-4">Ownership: {card.ownership}</p>
              <p className="text-gray-600 mb-4">minimum school fees: {card.schoolFees}</p>
              <p className="text-gray-600 mb-4">Category: {card.category}</p>
              <p className="text-gray-600 mb-4">Review: {card.comments.length}</p>
              <p className="text-gray-600 mb-4">location: {card.location}</p>
              <Link to={`/schools/${card.slug}`}>
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                  onClick={async () => {
                    try {
                      await axios.post(
                        `${import.meta.env.VITE_API_3}/${card.slug}/click`
                      );
                      console.log("Click count incremented");
                    } catch (error) {
                      console.error("Error incrementing click count:", error);
                    }
                  }}
                >
                  Read More
                </button>
              </Link>
              <div className="mt-4 text-yellow-500">{ratingStars(3)}</div>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
