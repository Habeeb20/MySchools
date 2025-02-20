// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const Home = () => {
//   const [schools, setSchools] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchName, setSearchName] = useState('');
//   const [searchLocation, setSearchLocation] = useState('');
//   const [filteredSchools, setFilteredSchools] = useState([]);

//   useEffect(() => {
//     const fetchSchools = async () => {
//       try {
//         const response = await axios.get('http://localhost:9000/schools');
//         setSchools(response.data);
//         setFilteredSchools(response.data);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching schools:', error);
//         setLoading(false);
//       }
//     };

//     fetchSchools();
//   }, []);

//   const handleSearch = () => {
//     const filtered = schools.filter((school) => {
//       const nameOrCategoryMatch =
//         (school.schoolName &&
//           school.schoolName.toLowerCase().includes(searchName.toLowerCase())) ||
//         (school.category &&
//           school.category.toLowerCase().includes(searchName.toLowerCase()));
//       const locationMatch =
//         school.location &&
//         school.location.toLowerCase().includes(searchLocation.toLowerCase());
//       return nameOrCategoryMatch && locationMatch;
//     });

//     setFilteredSchools(filtered);
//   };

//   return (
// <div className="p-0 m-0 font-sans">

// <div className="text-center mt-10 mb-6">
//   <h3 className="text-3xl font-semibold"></h3>
// </div>

// {/* Search Filters */}
// <div className="flex flex-nowrap justify-between items-center gap-2 mb-6">
//   <input
//     type="text"
//     placeholder="Search by school name"
//     value={searchName}
//     onChange={(e) => setSearchName(e.target.value)}
//     className="w-2/5 p-2 rounded-md border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
//   />
//   <input
//     type="text"
//     placeholder="Search by location"
//     value={searchLocation}
//     onChange={(e) => setSearchLocation(e.target.value)}
//     className="w-2/5 p-2 rounded-md border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
//   />
//   <button
//     onClick={handleSearch}
//     className="w-1/5 p-2 bg-green-600 text-white rounded-md hover:bg-green-500 transition"
//   >
//     Search
//   </button>
// </div>

// {/* Display loading state */}
// {loading ? (
//   <p className="text-center text-xl text-gray-500">Loading...</p>
// ) : (
//   <>
//     {/* Display filtered list of schools */}
//     <div className="flex flex-wrap justify-center">
//       {filteredSchools.length === 0 ? (
//         <p className="text-center text-xl text-gray-500 w-full">No schools found based on your search.</p>
//       ) : (
//         filteredSchools.map((school) => (
//           <div
//             key={school._id}
//             className="bg-white p-4 m-4 rounded-lg shadow-lg w-full md:w-1/3 lg:w-1/4"
//           >
//             <div className="bg-green-700 text-white p-4 rounded-t-lg flex justify-between items-center">
//               <h3 className="text-xl font-bold">{school.schoolName}</h3>
//               <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">
//                 {school.percent}%
//               </div>
//             </div>
//             <div className="relative mt-4">
//               <img
//                 src={school.coverPicture}
//                 alt={school.schoolName}
//                 className="w-full h-48 object-cover rounded-lg"
//               />
//               <img
//                 src={school.schoolPicture}
//                 alt={school.schoolName}
//                 className="absolute top-2 right-2 w-16 h-16 border-4 border-white rounded-full"
//               />
//             </div>
//             <div className="mt-4 bg-gray-50 p-4 rounded-lg">
//               <h4 className="text-lg font-semibold text-gray-700">School Details</h4>
//               <p className="text-sm text-gray-700">
//                 <strong>Name:</strong> {school.schoolName}
//               </p>
//               <p className="text-sm text-gray-700">
//                 <strong>Email:</strong> {school.email}
//               </p>
//               <p className="text-sm text-gray-700">
//                 <strong>Location:</strong> {school.location}
//               </p>
//               <p className="text-sm text-red-500">
//                 <strong>LGA:</strong> {school.LGA}
//               </p>
//               <p className="text-sm text-gray-700">
//                 <strong>Category:</strong> {school.category}
//               </p>
//             </div>
//           </div>
//         ))
//       )}
//     </div>
//   </>
// )}
// </div>




  
//   );
// };

// export default Home;






import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Search = () => {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchName, setSearchName] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [filteredSchools, setFilteredSchools] = useState([]);
  const [searchPerformed, setSearchPerformed] = useState(false); // Track if a search has been performed

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API}/schools`);
        setSchools(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching schools:', error);
        setLoading(false);
      }
    };

    fetchSchools();
  }, []);

  const handleSearch = () => {
    const filtered = schools.filter((school) => {
      const nameOrCategoryMatch =
        (school.schoolName &&
          school.schoolName.toLowerCase().includes(searchName.toLowerCase())) ||
        (school.category &&
          school.category.toLowerCase().includes(searchName.toLowerCase()));
      const locationMatch =
        school.location &&
        school.location.toLowerCase().includes(searchLocation.toLowerCase());
      return nameOrCategoryMatch && locationMatch;
    });

    setFilteredSchools(filtered);
    setSearchPerformed(true); // Mark that a search has been performed
  };

  return (
    <div className="p-0 m-0 font-sans">
      <div className="text-center mt-10 mb-6">
        <h6 className="text-2xl font-semibold">Search for your school of choice by name, category and location</h6>
      </div>

      {/* Search Filters */}
      <div className="flex flex-wrap sm:flex-nowrap flex-col sm:flex-row justify-between items-center gap-2 mb-6">
  <input
    type="text"
    placeholder="Search by school name"
    value={searchName}
    onChange={(e) => setSearchName(e.target.value)}
    className="w-full sm:w-2/5 p-2 rounded-md border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
  />
  <input
    type="text"
    placeholder="Search by location"
    value={searchLocation}
    onChange={(e) => setSearchLocation(e.target.value)}
    className="w-full sm:w-2/5 p-2 rounded-md border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
  />
  <button
    onClick={handleSearch}
    className="w-full sm:w-1/10 p-2 bg-green-600 text-white rounded-md hover:bg-green-500 transition"
  >
    Search
  </button>
</div>


      {/* Display loading state */}
      {loading ? (
        <p className="text-center text-xl text-gray-500">Loading...</p>
      ) : (
        searchPerformed && ( // Only show content if a search has been performed
          <>
            {/* Display filtered list of schools */}
            <div className="flex flex-wrap justify-center">
              {filteredSchools.length === 0 ? (
                <p className="text-center text-xl text-gray-500 w-full">
                  No schools found based on your search.
                </p>
              ) : (
                filteredSchools.map((school) => (
                  <div
                    key={school._id}
                    className="bg-white p-4 m-4 rounded-lg shadow-lg w-full md:w-1/3 lg:w-1/4"
                  >
                    <div className="bg-green-700 text-white p-4 rounded-t-lg flex justify-between items-center">
                      <h3 className="text-xl font-bold">{school.schoolName}</h3>
                      <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                        {school.percent}
                      </div>
                    </div>
                    <div className="relative mt-4">
                      <img
                        src={school.coverPicture}
                        alt={school.schoolName}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <img
                        src={school.schoolPicture}
                        alt={school.schoolName}
                        className="absolute top-2 right-2 w-16 h-16 border-4 border-white rounded-full"
                      />
                    </div>
                    <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                      <h4 className="text-lg font-semibold text-gray-700">
                        School Details
                      </h4>
                      <p className="text-sm text-gray-700">
                        <strong>Name:</strong> {school.schoolName}
                      </p>
                      <p className="text-sm text-gray-700">
                        <strong>Email:</strong> {school.email}
                      </p>
                      <p className="text-sm text-gray-700">
                        <strong>Location:</strong> {school.location}
                      </p>
                      <p className="text-sm text-red-500">
                        <strong>LGA:</strong> {school.LGA}
                      </p>
                      <p className="text-sm text-gray-700">
                        <strong>Category:</strong> {school.category}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </>
        )
      )}
      
    </div>
  );
};

export default Search;
