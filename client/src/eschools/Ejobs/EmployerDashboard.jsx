import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { AiOutlineArrowRight } from "react-icons/ai";
import axios from "axios";

import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend
);





const EmployerDashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("My-Posted_Jobs");
  const [employerId, setEmployerId] = useState("");
  const [successMessageFrom, setSuccessMessageFrom] = useState([]);
  const [myJobs, setMyJobs] = useState([]);
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(false);
  const [myMessages, setMyMessages] = useState([]);
  const [otherMessages, setOtherMessages] = useState([]);
  const [error, setError] =  useState("") 
  const [successMessage, setSuccessMessage] = useState("");
  const [userId, setUserId] = useState("");   
  const [myCandidate, setMyCandidate] = useState([])

  const menuItems = ["My_Posted_Jobs", "Candidates_Applied", "Messages", "Post_Jobs"];
  const [formData, setFormData] = useState({
    companyName: "",
    companyAbout: "",
    jobTitle: "",
    jobType: "",
    location: "",
    salary: "",
    requirements: "",
    duties: "",
    vacancies: "",
    experience: "",
  });

  const [selectedSection, setSelectedSection] = useState("overview");
  const { id } = useParams();
  const [viewCandidate, setViewCandidate] = useState([]);
  const [jobId, setJobId] = useState('')
  const [jobseekerId, setJobseekerId] = useState('')

  const [message, setMessage] = useState('')
  const [showChat, setShowChat] = useState(false);

  const [showPopup, setShowPopup] = useState(false);
  const [chartData, setChartData] = useState(null);
  const [myAppointment, setMyAppointment] = useState([]);


  const navigate= useNavigate()


const [isModalOpen, setIsModalOpen] = useState(false);

const handleViewCandidate = (candidate) => {
  setViewCandidate(candidate);
  setIsModalOpen(true);
};


const closeMyModal = () => {
    setViewCandidate(null);
    setIsModalOpen(false);
  };


   //get candidates that  apply for a job

   useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("No token found");
          return;
        }

        const response = await axios.get(
          `${import.meta.env.VITE_API_J2}/getcandidatesthatapply`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setMyCandidate(response.data);
        console.log("my candidates", response.data);
      } catch (error) {
        console.log(error);
        setError(error.response?.data?.message || "An error occurred");
      }
    };

    fetchData();
  }, []);




  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target; 
    setFormData((prevFormData) => ({
      ...prevFormData, 
      [name]: value, 
    }));
  };

    //fetching data
    useEffect(() => {
        const fetchProfile = async() => {
            try {
                const token = localStorage.getItem("token");
                if (!token) throw new Error("No token found");
        
                const { data } = await axios.get(
                  `${import.meta.env.VITE_API_1}/dashboard`,
                  { headers: { Authorization: `Bearer ${token}` } }
                );

                setUserData(data)
                setUserId(data._id)
                console.log(data._id)
                toast.success("you are successfully logged in");
            } catch (error) {
                navigate("/login")
                console.log(error);
                toast.error("Failed to fetch user data");
            }finally {
                setLoading(false);
              }
        }
        fetchProfile()
    }, [])


 
     
      const handleShowpopupClose = () => {
        setShowPopup(false);
      };

      const handlePostJobSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
    
        try {
        
          const token = localStorage.getItem("token");
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
    
          const response = await axios.post(
           `${import.meta.env.VITE_API_J}/postjob`,
            {...formData, employerId},
            config
          );
          console.log("Employer ID being sent:", employerId);
  
          setLoading(false);
          toast.success(response.data.message || "Job posted successfully!");
      
          setFormData({
            companyName: "",
            companyAbout: "",
            jobTitle: "",
            jobType: "",
            location: "",
            salary: "",
            requirements: "",
            duties: "",
            vacancies: "",
            experience: "",
          });
        } catch (error) {
          setLoading(false);
          toast.error(error.response?.data?.message || "Something went wrong!");
          setError(error.response?.data?.message || "something went wrong")
        }
      };

      const openModal = (job) => {
        setSelectedJob(job);
        setShowModal(true);
      };
    
      const closeModal = () => {
        setShowModal(false);
        setSelectedJob(null);
      }

      //get jobs posted by this employer

      
    useEffect(() => {
        const fetchJobsByEmployer = async () => {
          try {
            const token = localStorage.getItem("token");
            if (!token) {
              console.error("No token found");
              toast.error("Authentication token is missing");
              return;
            }
      
            const response = await axios.get(`${import.meta.env.VITE_API_J}/getJobByemployer`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
      
            console.log("Fetched jobs:", response.data);
            setMyJobs( response.data ); 
            toast.success("Check your posted jobs");
          } catch (error) {
            console.error("Error fetching jobs:", error);
            toast.error(error?.response?.data?.message || "Failed to fetch jobs");
          }
        };
      
        fetchJobsByEmployer();
      }, []);
  
  
      //get candidates that  apply for a job
  
      useEffect(() => {
        const fetchData = async () => {
          try {
            const token = localStorage.getItem("token");
            if (!token) {
              setError("No token found");
              return;
            }
      
            const response = await axios.get(`${import.meta.env.VITE_API_J2}/getcandidatesthatapply`, {
              headers: { Authorization: `Bearer ${token}` },
            });
      
            setMyCandidate(response.data);
            console.log("my candidates", response.data);
          } catch (error) {
            console.log(error);
            setError(error.response?.data?.message || "An error occurred");
          }
        };
      
        fetchData();
      }, []);
      
  
  //get the messages i have sent
  
  useEffect(() => {
    const getmyMessage =async()=> {
    try {
      const token = localStorage.getItem("token")
      const response = await axios.get(`${import.meta.env.VITE_API_J3}/getmessageforemployer`, {
        headers:{Authorization: `Bearer ${token}`}
  
      })
      setMyMessages(response.data)
    setSuccessMessage("successfully fetched")
    } catch (error) {
      console.log(error)
      setError(error.response?.data?.message)
    }
  
      
    }
    getmyMessage()
  }, [])
  
  
  
  //get messages being sent by  jobseekers
  useEffect(() => {
    const GetOtherMessages = async() => {
      try {
        const token = localStorage.getItem("token")
        const response = await axios.get(`${import.meta.env.VITE_API_J3}/getmessagefromjobseekers`, {
          headers:{
            Authorization: `Bearer ${token}`
          }
        })
        setOtherMessages(response.data)
        console.log("jobseekers messages",response.data)
        setSuccessMessageFrom("messages from jobseekers")
      } catch (error) {
        console.log(error)
        setError(error.response?.data?.message)
      }
    }
  
    GetOtherMessages()
  }, [])

  
  
 
  const sections = {
    My_Posted_Jobs: <div className="p-6">
      <div>
          <h4>My posted jobs</h4>
          {myJobs.length > 0 ? (
         

<table className="w-full border-collapse border border-gray-300 mt-4">
  <thead className="bg-gray-100">
    <tr>
      <th className="border border-gray-300 px-4 py-2">Date</th>
      <th className="border border-gray-300 px-4 py-2">Job Title</th>
      <th className="border border-gray-300 px-4 py-2">Salary</th>
      <th className="border border-gray-300 px-4 py-2">Action</th>
    </tr>
  </thead>
  <tbody>
    {myJobs.map((job) => (
      <motion.tr
        key={job._id}
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="text-center border-b"
      >
        <td className="border border-gray-300 px-4 py-2">
          {new Date(job.createdAt).toLocaleDateString()}
        </td>
        <td className="border border-gray-300 px-4 py-2">{job.jobTitle}</td>
        <td className="border border-gray-300 px-4 py-2 text-green-600 font-bold">
          ₦{job.salary}
        </td>
        <td className="border border-gray-300 px-4 py-2">
          <button className="text-blue-600 hover:underline">View More</button>
        </td>
      </motion.tr>
    ))}
  </tbody>
</table>

          ): (
            <h2>You havnt posted any job</h2>
          )}
          </div>;
    </div>,
    Messages: <div className="p-6">   
    <>
    <div>
    <div className="space-y-4">
{Array.isArray(myMessages) && myMessages.length > 0 ? (
myMessages.map((job, index) => (
<motion.div
key={index}
initial={{ scale: 0.9 }}
animate={{ scale: 1 }}
whileHover={{ scale: 1.02 }}
transition={{ duration: 0.3 }}
className="flex items-center justify-between bg-white shadow-lg p-4 rounded-lg"
>
<div>
<h3>Position Applied for:<span className="text-green-600 font-bold"> {job?.jobId?.jobTitle}</span></h3>
<h3>Message: <span className="text-green-600 font-bold"> {job?.message}</span></h3>
<p className="text-gray-500 text-sm">Candidate Name- {job.jobseekerId?.fname} {job.jobseekerId?.lname}</p>
<p className="text-gray-500 text-sm">Candidate email & Number - {job.jobseekerId.email} {job.jobseekerId?.phone}</p>
<p className="text-gray-500 text-sm">Candidate UniqueNumber- {job.jobseekerId?.uniqueNumber}</p>
<p className="text-gray-500 text-sm">Name of the Company applied for- {job.jobId?.companyName}</p>
<p className="text-gray-500 text-sm">Job type- {job.jobId?.jobType}</p>
<p className="text-gray-500 text-sm">Salary- {job.jobId?.salary}</p>
<p className="text-gray-500 text-sm">years of Experience needed- {job.jobId?.experience} years</p>
<p className="text-gray-500 text-sm">Location- {job.jobId?.location}</p>
</div>
<div className="flex items-center">
<p className="text-gray-500 mr-4">Date- {new Date(job.date).toLocaleDateString()}</p>
<AiOutlineArrowRight className="text-green-600" />
</div>
</motion.div>
))
) : (
<h1>You have no message yet</h1>
)}
</div>


<div className="ml-20 space-y-4 space-x-2">
{successMessageFrom && <p className="text-blue-600 text-center">{successMessageFrom }</p>}
{Array.isArray(otherMessages) && otherMessages.length > 0 ? (
otherMessages.map((job, index) => (
<motion.div
key={index}
initial={{ scale: 0.9 }}
animate={{ scale: 1 }}
whileHover={{ scale: 1.02 }}
transition={{ duration: 0.3 }}
className="flex items-center justify-between bg-white shadow-lg p-4 rounded-lg"
>
<div>

<h3>Message: <span className="text-blue-600 font-bold"> {job?.message}</span></h3>

<p className="text-gray-500 text-sm ">Name of the Company applied for- <span className="font-bold">{job.jobId?.companyName}</span></p>
<p className="text-gray-500 text-sm">full Name of the employer- <span className="font-bold">{job.senderId?.fname} {job.senderId?.lname}</span></p>
<p className="text-gray-500 text-sm">Job title- {job.jobId?.jobTitle}</p>
<p className="text-gray-500 text-sm">Salary- {job.jobId?.salary}</p>
<p className="text-gray-500 text-sm">Job type- {job.jobId?.jobType}</p>
<p className="text-gray-500 text-sm">Location- {job.jobId?.location}</p>
</div>
<div className="flex items-center">
<p className="text-gray-500 mr-4">Date- {new Date(job.date).toLocaleDateString()}</p>
<AiOutlineArrowRight className="text-green-600" />
</div>
</motion.div>
))
) : (
<h1>You dont have any message yet</h1>
)}
</div>

</div>
</></div>,
    Candidates_Applied: <div className="p-6">
          <div className="bg-white shadow rounded-lg">
          <div className="flex justify-between border-b p-4">
            <h2 className="text-lg font-bold">Candidates that apply</h2>
            <select className="border border-gray-300 rounded-lg px-4 py-2">
              <option>All Time (5)</option>
              <option>Past</option>
              <option>Upcoming</option>
            </select>
          </div>
          <table className="min-w-full border border-gray-300 shadow-md rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-4 text-left border-b">Candidate Name</th>
            <th className="p-4 text-left border-b">Job</th>
            <th className="p-4 text-left border-b">course studied</th>
            <th className="p-4 text-left border-b">Action</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(myCandidate) && myCandidate.length > 0 ? (
            myCandidate.map((candidate, index) => (
              <motion.tr
                key={index}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 + index * 0.1 }}
                className="border-b hover:bg-gray-50"
              >
                <td className="p-4">{candidate.jobseekerId?.email || "N/A"} </td>
                <td className="p-4">{candidate.jobTitle}</td>
                <td className="p-4 text-blue-500">{candidate.profile?.courseStudied}</td>
                <td className="p-4">
  {candidate && (
    <button 
      onClick={() => handleViewCandidate(candidate)} 
      className="flex items-center space-x-2 text-green-600"
    >
      <AiOutlineArrowRight />
      <h4>View Details</h4>
    </button>
  )}
</td>

              </motion.tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="p-4 text-center text-gray-500">
                No candidates found
              </td>
            </tr>
          )}

         

        

    
        </tbody>
      </table>

      {isModalOpen && viewCandidate && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
      <h4 className="text-center text-lg font-semibold mb-4">
        About the Candidate
      </h4>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <h4 className="text-sm font-medium text-gray-700">Full Name</h4>
          <p className="text-sm text-blue-500">
            {viewCandidate.jobseekerId?.fname} {viewCandidate.jobseekerId?.lname}
          </p>
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-700">Grade</h4>
          <p className="text-sm text-blue-500">{viewCandidate.profile?.grade}</p>
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-700">Certificate</h4>
          <p className="text-sm text-blue-500">{viewCandidate.profile?.certificate}</p>
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-700">Course Studied</h4>
          <p className="text-sm text-blue-500">{viewCandidate.profile?.courseStudied}</p>
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-700">Work Experience</h4>
          <p className="text-sm text-blue-500">{viewCandidate.profile?.experience}</p>
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-700">Other Skills</h4>
          <p className="text-sm text-blue-500">{viewCandidate.profile?.skills}</p>
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-700">Years of Experience</h4>
          <p className="text-sm text-blue-500">{viewCandidate.profile?.yearsOfExperience}</p>
        </div>
      </div>

      <button
        onClick={closeMyModal}
        className="mt-4 w-full bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700"
      >
        Close
      </button>
    </div>
  </div>
)}


      
        </div>
    </div>,
    Post_Jobs: <div className="p-6 mt-2">
            <div>
            <form onSubmit={handlePostJobSubmit}>
            {error &&  <p className="text-red-500">{error}</p>}
        <div style={{ marginBottom: "10px" }}>
          <label>Company Name:</label>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleInputChange}
            required
           className="w-full p-2 mt-2 border border-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-200"
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>About the Company:</label>
          <textarea
            name="companyAbout"
            value={formData.companyAbout}
            onChange={handleInputChange}
            required
         className="w-full p-2 mt-2 border border-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-200"
          ></textarea>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Job Title:</label>
          <input
            type="text"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleInputChange}
            required
          className="w-full p-2 mt-2 border border-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-200"
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Job Type:</label>
          <input
            type="text"
            name="jobType"
            value={formData.jobType}
            onChange={handleInputChange}
            required
         className="w-full p-2 mt-2 border border-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-200"
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Location:</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            required
           className="w-full p-2 mt-2 border border-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-200"
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Salary:</label>
          <input
            type="text"
            name="salary"
            value={formData.salary}
            onChange={handleInputChange}
            required
           className="w-full p-2 mt-2 border border-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-200"
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Requirements:</label>
          <textarea
            name="requirements"
            value={formData.requirements}
            onChange={handleInputChange}
            required
          className="w-full p-2 mt-2 border border-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-200"
          ></textarea>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Duties:</label>
          <textarea
            name="duties"
            value={formData.duties}
            onChange={handleInputChange}
            required
         className="w-full p-2 mt-2 border border-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-200"
          ></textarea>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Number of Vacancies:</label>
          <input
            type="number"
            name="vacancies"
            value={formData.vacancies}
            onChange={handleInputChange}
            required
         className="w-full p-2 mt-2 border border-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-200"
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Experience (in years):</label>
          <input
            type="number"
            name="experience"
            value={formData.experience}
            onChange={handleInputChange}
            required
        className="w-full p-2 mt-2 border border-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-200"
          />
        </div>

        <button type="submit" disabled={loading}    className={`w-full py-2 px-4 rounded ${
            loading
              ? "bg-green-800 text-green-100"
              : "bg-green-400 text-white hover:bg-green-600"
          }`}>
          {loading ? "Posting..." : "Post Job"}
        </button>
      </form>
          </div>;
    </div>,
  };

  // Ensure section updates correctly when sidebar is toggled
  useEffect(() => {
    if (!isOpen) {
      setActiveSection(activeSection);
    }
  }, [isOpen]);

  return (
    <div className="flex  min-h-screen">
      {/* Mobile Navbar Button */}
      <button
        className="fixed top-4 left-4 z-50 p-2 mt-20 bg-green-600 text-white rounded-md md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-gradient-to-b from-green-700 to-green-900 text-white w-64 pt-16 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 md:translate-x-0 md:w-64`}
      >
        <h2 className="text-2xl font-bold p-4">Employer Dashboard</h2>
        <ul className="space-y-4 px-4">
          {menuItems.map((item, index) => (
            <li
              key={index}
              onClick={() => {
                setActiveSection(item);
                setIsOpen(false);
              }}
              className={`cursor-pointer p-3 bg-green-800 hover:bg-green-600 rounded-md transition-all ${
                activeSection === item ? "bg-green-500" : ""
              }`}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div
        className={`flex-1 transition-all ${
          isOpen ? "ml-64" : "ml-0"
        } md:ml-64`}
      >
     
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10 mb-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-green-100 shadow rounded-lg p-4 text-center"
          >
            <h2 className="text-xl font-bold">{myJobs.length}</h2>
            <p className="text-gray-600 ">Jobs Posted</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-yellow-100 shadow rounded-lg p-4 text-center"
          >
            <h2 className="text-xl font-bold">{myCandidate.length}</h2>
            <p className="text-gray-600">Candidates_Applied</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-blue-100 shadow rounded-lg p-4 text-center"
          >
            <h2 className="text-xl font-bold text-blue-500">{otherMessages.length}</h2>
            <p className="text-gray-600">Incoming Messages</p>
          </motion.div>
        </div>

        {/* Active Section Content */}
        <div className="p-6">
          {sections[activeSection] || (
            <p className="text-black">Select an option</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployerDashboard;
