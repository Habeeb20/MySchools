import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import CompareDetails from './CompareDetails';
import { motion } from 'framer-motion';
const Comparison = () => {
  const [school1, setSchool1] = useState('');
  const [school2, setSchool2] = useState('');
  const [school3, setSchool3] = useState('');
  const [schoolData1, setSchoolData1] = useState(null);
  const [schoolData2, setSchoolData2] = useState(null);
  const [schoolData3, setSchoolData3] = useState(null);
  const [error, setError] = useState('');

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setError('');

    if (!school1 || !school2 || !school3) {
      setError('Please enter all three schools to compare.');
      return;
    }

    try {
      const response1 = await axios.get(`${import.meta.env.VITE_API_3}/comparison`, {
        params: { school: school1 },
      });
      setSchoolData1(response1.data);

      const response2 = await axios.get(`${import.meta.env.VITE_API_3}/comparison`, {
        params: { school: school2 },
      });
      setSchoolData2(response2.data);

      const response3 = await axios.get(`${import.meta.env.VITE_API_3}/comparison`, {
        params: { school: school3 },
      });
      setSchoolData3(response3.data);
    } catch (err) {
      setError('One or more schools not found. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl md:text-5xl font-bold text-center mb-6 text-green-900 drop-shadow-lg"
      >
        Compare Schools
      </motion.h1>
      
      <motion.form
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        onSubmit={handleSearch}
        className="max-w-4xl mx-auto flex flex-col gap-6 p-6 bg-green-900 rounded-lg shadow-2xl"
      >
        <div className="flex flex-col md:flex-row gap-4">
          {[setSchool1, setSchool2, setSchool3].map((setter, index) => (
            <motion.input
              key={index}
              type="text"
              onChange={(e) => setter(e.target.value)}
              placeholder={`Enter School ${index + 1}`}
              className="flex-1 p-3 text-lg border border-green-700 bg-white text-green-900 rounded-md shadow-sm outline-none focus:ring-2 focus:ring-white"
              whileFocus={{ scale: 1.05 }}
            />
          ))}
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="py-3 text-lg font-semibold text-white bg-green-700 rounded-md hover:bg-green-800 shadow-md transition-all"
        >
          Compare
        </motion.button>
      </motion.form>
      
      {error && <p className="text-center mt-4 text-red-500 font-medium">{error}</p>}

      {(schoolData1 || schoolData2 || schoolData3) && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8"
        >
          {[schoolData1, schoolData2, schoolData3].map((schoolData, index) => (
            schoolData && (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <img
                  src={schoolData.picture1 || schoolData.coverPicture || schoolData.schoolPicture}
                  alt="School"
                  className="w-full h-52 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-green-900 mb-3">{schoolData.school}</h3>
                  <table className="w-full text-left text-green-800">
                    <tbody>
                      <tr>
                        <td className="py-2 font-semibold">Admission Date:</td>
                        <td>{formatDate(schoolData.admissionStartDate)}</td>
                      </tr>
                      <tr>
                        <td className="py-2 font-semibold">End Date:</td>
                        <td>{formatDate(schoolData.admissionEndDate)}</td>
                      </tr>
                      <tr>
                        <td className="py-2 font-semibold">Requirements:</td>
                        <td>{schoolData.admissionRequirements}</td>
                      </tr>
                    </tbody>
                  </table>
                  <Link to="/admission">
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="mt-4 w-full py-2 bg-green-700 text-white font-medium text-lg rounded-md hover:bg-green-800"
                    >
                      View Details
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            )
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default Comparison;
