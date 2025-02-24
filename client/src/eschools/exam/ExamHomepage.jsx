import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import CountExams from './CountExams'
const ExamHomepage = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [cardDetails, setCardDetails] = useState([]);
    const [activeCategory, setActiveCategory] = useState("All");
  
    useEffect(() => {
      const fetchSchools = async () => {
        try {
          const response = await fetch(`${import.meta.env.VITE_API_E}/getallexams`);
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
      const matchesSearchTerm = card.examBody
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearchTerm;
    });
  
    const ratingStars = (rating) => {
      return "★".repeat(rating) + "☆".repeat(5 - rating);
    };
  
  return (
    <div>
       <header
        className="bg-cover bg-center text-center text-white text-3xl font-semibold py-3"
        style={{ backgroundImage: "url(/path-to-header-background-image)" }}
      >
        Examination Bodies
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
            onClick={() => setActiveCategory(category)}
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
      <CountExams />
   
       <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mt-8 px-4">
        {filteredCards.map((card, index) => (
          <div
            key={index}
            className="border rounded-lg shadow-md overflow-hidden bg-white"
          >
            <img
              src={
                card.picture1 ||
                card.picture2 ||
           
                card.picture3 ||
                card.picture4 
      
              }
              alt={card.schoolName}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{card.examBody}</h3>
              <p className="text-gray-600 mb-4">{card.email}</p>
              <p className="text-gray-600 mb-4">Deadline:{new Date(card.Deadline).toLocaleDateString()}</p>
              <p className="text-gray-600 mb-4">formPrice:{card.formPrice}</p>
              <Link to={`/exam/${card.slug}`}>
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                  onClick={async () => {
                    try {
                      await axios.post(
                        `${import.meta.env.VITE_API_E}/${card.slug}/click`
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

      
    </div>
  )
}

export default ExamHomepage
