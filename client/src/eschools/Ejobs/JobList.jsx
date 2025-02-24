import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import JobDetailsModal from "./JobDetailsModal"; 
import { Link } from "react-router-dom";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const [schoolJobsRes, allJobsRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_3}/jobs`),
          axios.get(`${import.meta.env.VITE_API_J}/getAll`)
        ]);

        // Combine jobs from both sources
        setJobs([...schoolJobsRes.data, ...allJobsRes.data]);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-center mb-6">Available Jobs</h2>

      {loading ? (
        <p className="text-center">Loading jobs...</p>
      ) : (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {jobs.map((job) => (
            <motion.div
              key={job.slug}
              className="bg-white shadow-lg rounded-lg p-4 border border-gray-200"
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-lg font-semibold text-gray-800">{job.position1 || job.position}</h3>
                
              <p className="text-sm text-gray-600">Company Name: {job.companyName}</p>
              <p className="text-sm text-gray-600">Job Title: {job.jobTitle}</p>
              <p className="text-sm text-gray-600">Location: {job.location}</p>
              <p className="text-sm text-gray-600">Salary: {job.salary1 || job.salary}</p>

              {/* View More Button - Opens Modal */}
              <button
                onClick={() => setSelectedJob(job)}
                className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                View More
              </button>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Job Details Modal */}
      {selectedJob && (
        <JobDetailsModal job={selectedJob} onClose={() => setSelectedJob(null)} />
      )}
    </div>
  );
};

export default JobList;
