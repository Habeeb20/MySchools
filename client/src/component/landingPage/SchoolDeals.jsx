import { useEffect, useState } from "react";
import React from 'react';
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const SchoolDeals = () => {
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_3}/getallschools`);
        const data = await response.json();
        setSchools(data);
        toast.success("you are welcome")
      } catch (error) {
        console.error("Error fetching schools:", error);
        toast.error("Failed to load schools.");
      }
    };
    fetchSchools();
  }, []);

  return (
    <>
      <h2 className="text-2xl font-bold mb-3">Today's Top School Deals</h2>
      <p className="text-gray-600 text-base mb-5">
        A selection of the best School deals, only available today
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-5">
        {schools.length === 0 ? (
          <p className="text-center col-span-full">No schools available</p>
        ) : (
          schools.map((school, index) => (
            <div
              key={index}
              className="border border-gray-300 rounded-lg overflow-hidden shadow-md bg-white relative"
            >
              <img
                src={school.coverPicture} 
                alt={school.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
              <div class="absolute bg-orange-500 text-white text-sm px-2.5 py-1.5 rounded-md top-2.5 left-2.5">
  Discount: {school.percent} for {school.discounttext}
</div>
                <h3 className="text-blue-500 text-lg font-semibold mb-2">{school.schoolName}</h3>
                <p className="text-gray-600 text-sm">Category: {school.category}</p>
                <p className="text-gray-600 text-sm">{school.location}</p>
              </div>
              <Link to={`/schooldetail/${school.slug}`}>
  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg mb-4 mx-4">
    View More
  </button>
</Link>

            </div>
          ))
        )}
      </div>

    </>
  );
};

export default SchoolDeals;
