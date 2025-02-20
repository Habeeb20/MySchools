


// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// const CategoryPage = () => {
//   const { category } = useParams();
//   const [schools, setSchools] = useState([]);
  
//   const [filteredSchools, setFilteredSchools] = useState([]);
//   const [teachers, setTeachers] = useState([]);
//   const [filteredTeacher, setFilteredTeacher] = useState([])
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [activeOwnership, setActiveOwnership] = useState("All");
//   useEffect(() => {
//     axios
//       .get(`${import.meta.env.VITE_API}/schools`)
//       .then((response) => {
//         if (response.data && Array.isArray(response.data)) {
//           const filteredSchools = response.data.filter((school) => school.category === category);
//           setSchools(filteredSchools);
//           setFilteredSchools(filteredSchools);
//         } else {
//           setError('No schools data available or incorrect format.');
//         }
//         setLoading(false);
//       })
//       .catch((err) => {
//         setError('Failed to load schools. Please try again later.');
//         setLoading(false);
//       });
//   }, [category]);

// useEffect(() => {
//   axios.get(`${import.meta.env.VITE_APIT}`).then((response) => {
//     if(response.data && Array.isArray(response.data)){
//       const filteredTeacher= response.data.filter((teacher) => teacher.category === category)
//       setTeachers(filteredTeacher);
//       setFilteredTeacher(filteredTeacher);
//     } else{
//       setError("no teacher data available ")
//     }
//     setLoading(false)
//   })
//   .catch((err) => {
//     setError('failed to load teachers. please')
//   })
// })


//   useEffect(() => {
//     const searchResults = schools.filter((school) =>
//       school.schoolName.toLowerCase().includes(searchTerm.toLowerCase())
    
//     );
//     setFilteredSchools(searchResults);
//   }, [searchTerm, schools]);

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <p className="text-lg font-semibold">Loading...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <p className="text-red-500">{error}</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <h2 className="text-2xl font-bold text-green-600 mb-4 mt-4 capitalize">
//         {category} Schools Category
//       </h2>
//       <div className="mb-6">
//         <input
//           type="text"
//           placeholder="Search by school name..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="w-full p-2 border border-gray-300 rounded-lg shadow-sm"
//         />
//       </div>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {filteredSchools.map((school) => (
//           <div key={school.id} className="bg-white shadow-lg p-4 rounded-lg">
//             <img
//               src={school.coverPicture || school.picture || school.schoolPicture || "https://via.placeholder.com/150"}
//               alt={school.schoolName}
//               className="w-32 h-32 md:w-48 md:h-48 rounded-full object-cover shadow-lg mx-auto"
//             />
//             <h3 className="text-xl font-bold text-gray-800">Name: {school.schoolName}</h3>
//             <p className="text-gray-600">Email: {school.email}</p>
//             <p className="text-gray-600">Phone No: {school.phone}</p>
//             <p className="text-gray-600">Address: {school.location}</p>
//             <p className="text-gray-600">Category: {school.category}</p>
//             <Link to={`/schooldetail/${school._id}`}>
//               <button className="bg-green-600 text-white px-4 py-2 rounded-lg mb-4 mx-4">
//                 View More
//               </button>
//             </Link>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CategoryPage;














import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

const CategoryPage = () => {
  const { category } = useParams();
  const [schools, setSchools] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [exams, setExams] = useState([]); 
  const [filteredSchools, setFilteredSchools] = useState([]);
  const [filteredTeachers, setFilteredTeachers] = useState([]);
  const [filteredExams, setFilteredExams] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (category === "teachers") {
      // Fetch teachers data
      axios
        .get(`${import.meta.env.VITE_APIT}`)
        .then((response) => {
          if (response.data && Array.isArray(response.data)) {
            setTeachers(response.data);
            setFilteredTeachers(response.data);
          } else {
            setError("No teacher data available.");
          }
          setLoading(false);
        })
        .catch(() => {
          setError("Failed to load teachers. Please try again later.");
          setLoading(false);
        });
    } else if (category === "exams") {
      // Fetch exams data (new logic for exams category)
      axios
        .get(`${import.meta.env.VITE_APIE}`)
        .then((response) => {
          if (response.data && Array.isArray(response.data)) {
            setExams(response.data);
            setFilteredExams(response.data);
          } else {
            setError("No exams data available.");
          }
          setLoading(false);
        })
        .catch(() => {
          setError("Failed to load exams. Please try again later.");
          setLoading(false);
        });
    } else {
      // Fetch schools data for other categories
      axios
        .get(`${import.meta.env.VITE_API}/schools`)
        .then((response) => {
          if (response.data && Array.isArray(response.data)) {
            const filtered = response.data.filter(
              (school) => school.category === category
            );
            setSchools(filtered);
            setFilteredSchools(filtered);
          } else {
            setError("No schools data available.");
          }
          setLoading(false);
        })
        .catch(() => {
          setError("Failed to load schools. Please try again later.");
          setLoading(false);
        });
    }
  }, [category]);

  useEffect(() => {
    if (category === "teachers") {
      const searchResults = teachers.filter((teacher) =>
        teacher.fname?.toLowerCase()?.includes(searchTerm?.toLowerCase())
      );
      setFilteredTeachers(searchResults);
    } else if (category === "exams") {
      const searchResults = exams.filter((exam) =>
        exam.examBody?.toLowerCase()?.includes(searchTerm?.toLowerCase())
      );
      setFilteredExams(searchResults);
    } else {
      const searchResults = schools.filter((school) =>
        school.schoolName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredSchools(searchResults);
    }
  }, [searchTerm, schools, teachers, exams, category]);

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
        {category === "teachers"
          ? "Teachers"
          : category === "exams"
          ? "Exams"
          : `${category} Schools`}{" "}
        Category
      </h2>
      <div className="mb-6">
        <input
          type="text"
          placeholder={`Search by ${
            category === "teachers"
              ? "teacher name"
              : category === "exams"
              ? "exam name"
              : "school name"
          }...`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg shadow-sm"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {category === "teachers"
          ? filteredTeachers.map((teacher) => (
              <div key={teacher.id} className="bg-white shadow-lg p-4 rounded-lg">
                <img
                  src={
                    teacher.picture1 ||
                    teacher.picture2 ||
                    teacher.picture3 ||
                    "https://via.placeholder.com/150"
                  }
                  alt={teacher.name}
                  className="w-32 h-32 md:w-48 md:h-48 rounded-full object-cover shadow-lg mx-auto"
                />
                <h3 className="text-xl font-bold text-gray-800">
                  Name: {teacher.fname}
                </h3>
                <p className="text-gray-600">Email: {teacher.email}</p>
                <p className="text-gray-600">Phone No: {teacher.phone}</p>
                <p className="text-gray-600">School attended: {teacher.school}</p>
                <p className="text-gray-600">Qualification: {teacher.qualification}</p>
                <p className="text-gray-600">Grade: {teacher.grade}</p>
                <Link to={`/teacher/${teacher._id}`}>
                  <button className="bg-green-600 text-white px-4 py-2 rounded-lg mb-4 mx-4">
                    View More
                  </button>
                </Link>
              </div>
            ))
          : category === "exams"
          ? filteredExams.map((exam) => (
              <div key={exam.id} className="bg-white shadow-lg p-4 rounded-lg">
                <img
                  src={
                    exam.picture1 ||   exam.picture2 ||   exam.picture3 ||   exam.picture4 ||
                    "https://via.placeholder.com/150"
                  }
                  alt={exam.examName}
                  className="w-32 h-32 md:w-48 md:h-48 rounded-full object-cover shadow-lg mx-auto"
                />
                <h3 className="text-xl font-bold text-gray-800">
                  Exam: {exam.examBody}
                </h3>
                <p className="text-gray-600">Name: {exam.examBody}</p>
                <p className="text-gray-600">Email: {exam.email}</p>
                <p className="text-gray-600">phone: {exam.phone}</p>
                <p className="text-gray-600">Location: {exam.location || exam.LGA}</p>
                <Link to={`/exam/${exam._id}`}>
                  <button className="bg-green-600 text-white px-4 py-2 rounded-lg mb-4 mx-4">
                    View More
                  </button>
                </Link>
              </div>
            ))
          : filteredSchools.map((school) => (
              <div key={school.id} className="bg-white shadow-lg p-4 rounded-lg">
                <img
                  src={
                    school.coverPicture ||
                    school.picture ||
                    school.schoolPicture ||
                    "https://via.placeholder.com/150"
                  }
                  alt={school.schoolName}
                  className="w-32 h-32 md:w-48 md:h-48 rounded-full object-cover shadow-lg mx-auto"
                />
                <h3 className="text-xl font-bold text-gray-800">
                  Name: {school.schoolName}
                </h3>
                <p className="text-gray-600">Email: {school.email}</p>
                <p className="text-gray-600">Phone No: {school.phone}</p>
                <p className="text-gray-600">Address: {school.location}</p>
                <p className="text-gray-600">Category: {school.category}</p>
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

export default CategoryPage;































// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import { Link } from "react-router-dom";

// const CategoryPage = () => {
//   const { category } = useParams();
//   const [schools, setSchools] = useState([]);
  
//   const [filteredSchools, setFilteredSchools] = useState([]);
//   const [data, setData] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");

//   useEffect(() => {
//     setLoading(true);
//     setError(null);

//     const fetchUrl = () => {
//       switch (category) {
//         case "teachers":
//           return import.meta.env.VITE_APIT;
//         case "schools":
//           return `${import.meta.env.VITE_API}/schools`;
//         case "exams":
//           return import.meta.env.VITE_APIE;
//         case "bookshops":
//           return import.meta.env.VITE_APIB;
//         case "tutorials":
//           return import.meta.env.VITE_APITU;
//         default:
//           return null;
//       }
//     };

//     const url = fetchUrl();
//     if (url) {
//       axios
//         .get(url)
//         .then((response) => {
//           if (response.data && Array.isArray(response.data)) {
//             setData(response.data);
          
      
//             setFilteredData(response.data);
//           } else {
//             setError(`No ${category} data available.`);
//           }
//           setLoading(false);
//         })
//         .catch(() => {
//           setError(`Failed to load ${category}. Please try again later.`);
//           setLoading(false);
//         });
//     } else {
//       setError("Invalid category selected.");
//       setLoading(false);
//     }
//   }, [category]);

//   useEffect(() => {
//     const searchResults = data.filter((item) => {
//       switch (category) {
//         case "teachers":
//           return item.fname?.toLowerCase()?.includes(searchTerm?.toLowerCase());
//         case "schools":
//           return item.schoolName
//             ?.toLowerCase()
//             ?.includes(searchTerm?.toLowerCase());
//         case "exams":
//           return item.examBody
//             ?.toLowerCase()
//             ?.includes(searchTerm?.toLowerCase());
//         case "bookshops":
//           return item.bookshopName
//             ?.toLowerCase()
//             ?.includes(searchTerm?.toLowerCase());
//         case "tutorials":
//           return item.tutorialName
//             ?.toLowerCase()
//             ?.includes(searchTerm?.toLowerCase());
//         default:
//           return false;
//       }
//     });
//     setFilteredData(searchResults);
//   }, [searchTerm, data, category]);

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <p className="text-lg font-semibold">Loading...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <p className="text-red-500">{error}</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <h2 className="text-2xl font-bold text-green-600 mb-4 mt-4 capitalize">
//         {category === "teachers" ? "Teachers" : `${category} Details`}
//       </h2>
//       <div className="mb-6">
//         <input
//           type="text"
//           placeholder={`Search ${
//             category === "teachers"
//               ? "teacher name"
//               : `${category} name`
//           }...`}
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="w-full p-2 border border-gray-300 rounded-lg shadow-sm"
//         />
//       </div>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {filteredData.map((item) => (
//           <div key={item.id || item._id} className="bg-white shadow-lg p-4 rounded-lg">
//             <img
//               src={
//                 item.picture || item.picture1 || item.picture2 || item.picture3 || item.picture4 ||  item.profilePicture ||  item.picture ||
//                 item.coverPicture ||
//                 "https://via.placeholder.com/150"
//               }
//               alt={item.name || item.schoolName || item.examName}
//               className="w-32 h-32 md:w-48 md:h-48 rounded-full object-cover shadow-lg mx-auto"
//             />
//             <h3 className="text-xl font-bold text-gray-800">
//               Name:{" "}
//               {item.fname ||
//                 item.schoolName ||
//                 item.examBody ||
//                 item.bookshopName ||
//                 item.tutorialName}
//             </h3>
//             {item.email && <p className="text-gray-600">Email: {item.email}</p>}
//             {item.phone && (
//               <p className="text-gray-600">Phone No: {item.phone}</p>
//             )}
//             {item.location && (
//               <p className="text-gray-600">Address: {item.location}</p>
//             )}
//             {item.category && (
//               <p className="text-gray-600">Category: {item.category}</p>
//             )}
//             <Link to={`/${category}/${item._id || item.id}`}>
//               <button className="bg-green-600 text-white px-4 py-2 rounded-lg mt-4">
//                 View More
//               </button>
//             </Link>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CategoryPage;
