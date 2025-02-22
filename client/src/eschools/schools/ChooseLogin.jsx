import React from "react";
import { motion } from "framer-motion";
import { FaUserGraduate, FaChalkboardTeacher } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ChooseLogin = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r  p-6">
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 md:mb-8">
        Choose Login Type
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 w-full max-w-2xl">
        {/* Student Login Box */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white p-6 rounded-xl shadow-lg text-center border-2 border-purple-300 cursor-pointer hover:shadow-xl"
          onClick={() => navigate("/studentlogin")}
        >
          <div className="flex justify-center items-center bg-purple-200 text-purple-600 p-4 rounded-full mb-4">
            <FaUserGraduate size={50} />
          </div>
          <h3 className="text-lg md:text-xl font-bold text-purple-700">
            Student Login
          </h3>
          <p className="text-gray-700 mt-2 text-sm md:text-base">
            Log in as a student into the account created by your school admin.
          </p>
        </motion.div>

        {/* Teacher Login Box */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white p-6 rounded-xl shadow-lg text-center border-2 border-blue-300 cursor-pointer hover:shadow-xl"
          onClick={() => navigate("/teacherlogin")}
        >
          <div className="flex justify-center items-center bg-blue-200 text-blue-600 p-4 rounded-full mb-4">
            <FaChalkboardTeacher size={50} />
          </div>
          <h3 className="text-lg md:text-xl font-bold text-blue-700">
            Teacher Login
          </h3>
          <p className="text-gray-700 mt-2 text-sm md:text-base">
            Log in as a teacher into the account created by your school admin.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default ChooseLogin;
