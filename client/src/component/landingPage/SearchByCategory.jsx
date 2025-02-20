import React, { useState, useEffect } from "react";
import { FaSchool, FaUniversity, FaGraduationCap, FaBuilding, FaChalkboardTeacher } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import SearchByLocation from "./SeachByLocation";
import axios from "axios";

const SearchByCategory = () => {
  const navigate = useNavigate();

  const [categoryCounts, setCategoryCounts] = useState({
    primary: 0,
    secondary: 0,
    college: 0,
    polytechnic: 0,
    university: 0,
    teachers: 0, 
    exams:0,
    bookshops:0,
    tutorial:0,
  });

  const categories = [
    { name: "Nur & Pri School", icon: <FaSchool />, category: "primary" },
    { name: "Secondary School", icon: <FaChalkboardTeacher />, category: "secondary" },
    { name: "College", icon: <FaGraduationCap />, category: "college" },
    { name: "Polytechnic", icon: <FaBuilding />, category: "polytechnic" },
    { name: "University", icon: <FaUniversity />, category: "university" },
    { name: "Teachers", icon: <FaUniversity />, category: "teachers" },
    { name: "Exams", icon: <FaGraduationCap />, category: "exams" },
    // { name: "Bookshops", icon: <FaBuilding />, category: "bookshops" },
    // { name: "Tutorials", icon: <FaSchool />, category: "tutorials" },
  ];

  const handleCategoryClick = (category) => {
    console.log(`Navigating to category: ${category}`);
    navigate(`/category/${category}`);
  };

  useEffect(() => {
    const fetchCategoryCounts = async () => {
      try {
        // Fetch school category counts
        const schoolResponse = await axios.get(`${import.meta.env.VITE_API}/schools/category/counts`);
        // Fetch teacher count
        const teacherResponse = await axios.get(`${import.meta.env.VITE_API}/teacher/count`);
        const examResponse = await axios.get(`${import.meta.env.VITE_APIE}/count`);
        const bookshopResponse = await axios.get(`${import.meta.env.VITE_APIB}/count`);
        const tutorialResponse = await axios.get(`${import.meta.env.VITE_APITU}/count`);

        setCategoryCounts({
          ...schoolResponse.data,
          teachers: teacherResponse.data.count, 
          exams: examResponse.data.count, 
          bookshops: bookshopResponse.data.count,
          tutorials: tutorialResponse.data.count,  
        });

        console.log({ ...schoolResponse.data, teachers: teacherResponse.data.count,    exams: examResponse.data.count,    bookshops: bookshopResponse.data.count,      tutorials: tutorialResponse.data.count,   });
      } catch (error) {
        console.error("Error fetching category counts:", error);
      }
    };

    fetchCategoryCounts();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 p-6 pb-0">
      <h2 className="text-2xl font-bold text-red-600">Browse by Category</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {categories.map((category, index) => (
          <div
            key={index}
            onClick={() => handleCategoryClick(category.category)}
            className="flex flex-col items-center bg-white shadow-lg p-4 rounded-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
          >
            <div className="text-4xl text-gray-700 mb-2">{category.icon}</div>
            <p className="text-center text-gray-800 font-semibold">{category.name}</p>
            <p className="text-center text-gray-500">{categoryCounts[category.category] || 0}</p>
          </div>
        ))}
      </div>
      <SearchByLocation />
    </div>
  );
};

export default SearchByCategory;
