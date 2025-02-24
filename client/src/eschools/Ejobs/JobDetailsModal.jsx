import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const JobDetailsModal = ({ job, onClose }) => {
  if (!job) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <motion.div
        className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
      <h2 className="text-red-500">You have to login as a job seeker before applying for a job</h2>
        <h2 className="text-xl font-bold text-gray-800">{job.position1 || job.position} {job.companyName}</h2>
        <p className="text-sm text-gray-600 mt-2">About the company: {job.companyAbout}</p>
        <p className="text-sm text-gray-600 mt-2">Job Title: {job.jobTitle}</p>
        <p className="text-sm text-gray-600 mt-2">Job Type: {job.jobType}</p>
        <p className="text-sm text-gray-600 mt-2">Job Title: {job.requirements}</p>
        <p className="text-sm text-gray-600 mt-2">Job Requirements: {job.jobTitle}</p>
        <p className="text-sm text-gray-600 mt-2">years of Experience needed: {job.experience}</p>
    
        <p className="text-sm text-gray-600 mt-2">Location: {job.location}</p>
        <p className="text-sm text-gray-600">Salary: {job.salary1 || job.salary}</p>
        <p className="text-sm text-gray-600">Qualification: {job.qualification1 || job.qualification}</p>
        <p className="text-sm text-gray-600">Number of Vacancies: {job.NumberOfVacancy}</p>

        <div className="flex-col space-x-1">
        <Link to="/login">
        <button
        
        className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Apply
      </button>

        </Link>
        
        <button
          onClick={onClose}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Close
        </button>
        </div>
       
      </motion.div>
    </div>
  );
};

export default JobDetailsModal;
