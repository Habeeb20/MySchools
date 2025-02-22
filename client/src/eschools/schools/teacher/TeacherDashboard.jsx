import { useState } from "react";
import react from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { FaRegChartBar, FaCog, FaChartPie } from "react-icons/fa";
import { Link } from "react-router-dom";
import { PieChart,  Cell, BarChart,  XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import axios from "axios";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

const sidebarItems = [
  { name: "Dashboard", icon: <FaRegChartBar /> },
  { name: "Teachers", icon: <FaCog /> },
  { name: "Students", icon: <FaCog /> },
  { name: "other-Staffs", icon: <FaCog /> },
  { name: "Classes", icon: <FaCog /> }, 
  { name: "Subjects", icon: <FaCog /> },
  { name: "Results", icon: <FaCog /> },
  {name: "MyScores", icon: <FaCog /> },
  {name: "My Assignments", icon: <FaCog />},
  { name: "comments", icon: <FaCog /> },
  { name: "Assignments", icon: <FaCog /> },
  { name: "Annoucement", icon: <FaCog /> },
  
  { name: "Reports", icon: <FaChartPie /> },

];

const TeacherDashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("Dashboard");
  const [myData, setMyData] = useState([]);
  const [error, setError] = useState("");
  const [userId, setUserId] = useState(false);
  const [school, setSchool] = useState([]);
  const [user, setUser] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [allUsers, setAllUsers] = useState([])
  const [notice, setNotice] = useState([])
  const [loading, setLoading] = useState(false);
  const [postMyReport, setPostMyReport] = useState({
    criminal:"",
    issue:"",
    dateOfIncident:""
  })
  const [getMyReport, setGetMyReport] = useState([])
  const [student, setStudent] = useState([]);
  const [teacher, setTeacher] = useState([]);
  const [otherStaff, setOtherStaff] = useState([]);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
  const [getallScoresforTeacher, setGetAllScoreForTeacher] = useState([])
  const [getOnlyMyScore, setGetOnlyMyScore] = useState([])



  const [allSubjects, setAllSubjects] = useState([]);

  const [errorMessage, setErrorMessage] = useState("");

  const [getMyStaff, setGetMyStaff] = useState([]);
  const [showSchoolPopup, setShowSchoolPopUp] = useState(false);
  const [showClassModal, setShowClassModal] = useState(false);
  const [getMyClass, setGetMyClass] = useState([]);
  const [studentsByClass, setStudentsByClass] = useState({});


  const [showModalPopupForSubject, setShowModalPopupForSubject] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [assModal, setAssModal] = useState(false)
  const [myAssignments, setMyAssignment] = useState([])
  const[culprits, setCulprits] = useState([])
  const [allAssignments, setAllAssignments] = useState([])
  const [postAssignment, setPostAssignement] = useState({
    classes:"",
    instructions:"",
    content: "",
  })
  const [message, setMessage] = useState("");
  const [reportModal, setReportModal] = useState(false)
  const [formData, setFormData] = useState({
    studentId: "",
    subjectId: "",
    academicSession: "",
    term: "",
    assignmentScore: "",
    firstTestScore: "",
    secondTestScore: "",
    examScore: "",
    comment: "",
  });

  const [chartData, setChartData] = useState({
    pieData: { labels: [], datasets: [] },
    barData: { labels: [], datasets: [] },
  });

  const openModal = (student) => {
    setSelectedStudent(student);
    setFormData((prev) => ({ ...prev, studentId: student._id }));
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setMessage("");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const openAssModal =() => {
    setAssModal(true)
  }

  const closeAssModal =() => {
    setAssModal(false)
  }

  const handleAssInput= (e) => {
    const {name, value} = e.target;
    setPostAssignement({...postAssignment, [name]: value})
  }

  const openStudentModal = (student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  const closeStudentModal = () => {
    setIsModalOpen(false);
    setSelectedStudent(null);
  };



  //handle submit of result for each students

  const handleSubmitResult = async(e) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")

    try {
      const token = localStorage.getItem("token")
      const response = await axios.post(`${import.meta.env.VITE_API_3}/assign-score`, formData, {
        headers:{Authorization: `Bearer ${token}`}
      })
      
      if(response.status === "200"){
        setMessage("Result added successfully!");
      }
      toast.success("successfully")
     
    } catch (error) {
      console.log(error)
      setError("an error occurred")
    } finally{
      setLoading(false)
    }
  }

  




  useEffect(() => {
    const fetchSchoolData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${import.meta.env.VITE_API_3}/teachergetuser`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log("my responses!!!",response.data.admin)
    
        
        const users = Array.isArray(response.data.admin) ? response.data.admin : [response.data.admin];
        // Count users per role
        const studentCount = users.filter(
          (user) => user.role === "student"
        ).length;
       console.log(studentCount)
        const teacherCount = users.filter(
          (user) => user.role === "teacher"
        ).length;
        console.log(teacherCount)
        const staffCount = users.filter(
          (user) => user.role === "otherStaff"
        ).length;
        console.log(staffCount)

        console.log(
          "Student:",
          studentCount,
          "Teacher:",
          teacherCount,
          "otherStaff:",
          staffCount
        );

        // Update Pie Chart
        const newPieData = {
          labels: ["Students", "Teachers", "Other Staff"],
          datasets: [
            {
              data: [studentCount, teacherCount, staffCount],
              backgroundColor: ["#28a745", "#dc3545", "#ffc107"],
            },
          ],
        };

        // Update Bar Chart
        const newBarData = {
          labels: ["Students", "Teachers", "Other Staff"],
          datasets: [
            {
              label: "Users Count",
              data: [studentCount, teacherCount, staffCount],
              backgroundColor: ["#28a745", "#dc3545", "#ffc107"],
            },
          ],
        };

        setChartData({ pieData: newPieData, barData: newBarData });
      } catch (error) {
        console.error("Error fetching school data:", error);
      }
    };

    fetchSchoolData();
  }, []);

  const handlePopclose = () => {
    setShowSchoolPopUp(false);
  };

  const handleShowPopClose = () => {
    setShowPopup(false);
  };

  // get my students
  useEffect(() => {
    const getMyStudents = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${import.meta.env.VITE_API_3}/getmyteacherstudents`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setStudent(response.data);
        console.log("my students!!", response.data);
      } catch (error) {
        console.log(error);
        setError(error.response?.data?.message);
      }
    };

    getMyStudents();
  }, []);

  // get my teachers
  useEffect(() => {
    const getMyTeachers = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${import.meta.env.VITE_API_3}/getmyteacherteachers`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTeacher(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
        setError(error.response?.data?.message);
      }
    };

    getMyTeachers();
  }, []);

  // get my staff

  useEffect(() => {
    const getMyOtherStaff = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${import.meta.env.VITE_API_3}/getmyteacherotherstaff`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setOtherStaff(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
        setError(error.response?.data?.message);
      }
    };

    getMyOtherStaff();
  }, []);

  // get my school data
  useEffect(() => {
    const fetchMyData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${import.meta.env.VITE_API_3}/getschooldataforteacher`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setSchool(response.data);
        setUser(response.data);
        setUserId(response.data.school?._id);
      
        console.log(response.data);
        toast.success("successful");
      } catch (error) {
        console.log(error);
        setError(error.response?.data?.message);
        toast.error("an error occurred");
      }
    };
    fetchMyData();
  }, []);

 


  // fetch my data for dashboard

  useEffect(() => {
    const fetchmydashboard = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("please login");
          navigate("/login");
        }
        const response = await axios.get(
          `${import.meta.env.VITE_API_3}/teacherdashboard`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setMyData(response.data);
        console.log(response.data);
        toast.success("successfully logged in");
      } catch (error) {
        console.log(error);
        toast.error("failed to fetch data");
        setError(error.response?.data?.message);
      }
    };
    fetchmydashboard();
  }, []);

  


  //get my staff

  useEffect(() => {
    const getMyStaff = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${import.meta.env.VITE_API_3}/teachergetuser`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setGetMyStaff(response.data);
        console.log("my staff!!!", response.data);
      } catch (error) {
        console.log(error);
        setError(error.response?.data?.message);
      }
    };
    getMyStaff();
  }, []);


  //GET MY CLASS

  useEffect(() => {
    const getMyClasses = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${import.meta.env.VITE_API_3}/getAllMyClasses`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setGetMyClass(response.data);
        console.log("my classes!!", response.data);
      } catch (error) {
        console.log(error);
        setError(error?.response?.data?.message);
      }
    };

    getMyClasses();
  }, []);




    //get my subject
    
    //all subject
    useEffect(() => {
        const getMySubjects = async () => {
          try {
            const token = localStorage.getItem("token");
            const response = await axios.get(
              `${import.meta.env.VITE_API_3}/get-my-school-subjects`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
    
            setAllSubjects(response.data.subjects);
            console.log(response.data);
          } catch (error) {
            console.log(error);
            setError(error?.response?.data?.message || "an error occurred");
          }
        };
        getMySubjects();
      }, []);
    

  //GET STUDENTS BY CLASS

  useEffect(() => {
    const fetchMyStudentsByClass = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${import.meta.env.VITE_API_3}/teachergetstudentsByClass`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        console.log("students by class !!!!!", response.data);

        setStudentsByClass(response.data); // Store the response object directly
      } catch (error) {
        console.log(error.response?.data?.message || "Error fetching students");
      }
    };

    fetchMyStudentsByClass();
  }, []);


  //get all the scores by all teachers
   useEffect(() => {
    const fetchAllScores = async() => {
      try {
        const token = localStorage.getItem("token")
        const response = await axios.get(`${import.meta.env.VITE_API_3}/getallassignedscores`,{ headers:{
          Authorization: `Bearer ${token}`
        }})
        setGetAllScoreForTeacher(response.data)
     
      } catch (error) {
        console.log(error)
        setError(error.response?.data?.message)
      }
    }
    fetchAllScores()
   }, [])

//get only my scores for the teachers

   useEffect(() => {
    const fetchMyScores = async() => {
      try {
        const token = localStorage.getItem("token")
        const response = await axios.get(`${import.meta.env.VITE_API_3}/getmyassignedscores`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        setGetOnlyMyScore(Array.isArray(response.data) ? response.data : [response.data] )
        console.log("my scores!!!!", response.data)
      } catch (error) {
        console.log(error)
        setError(error?.response?.data?.message || " an error occurred from the server")
      }
    }

    fetchMyScores()
   }, [])


   //get all the assignements
   useEffect(() => {
    const getAllAssignment = async() => {
      try {
        const token = localStorage.getItem("token")
        const response = await axios.get(`${import.meta.env.VITE_API_3}/getotherassignment`, {
          headers: {Authorization: `Bearer ${token}`}
        })
        setAllAssignments(Array.isArray(response.data) ? response.data : [response.data])
        console.log(response.data)
        toast.success("successfully")
      } catch (error) {
        console.log(error)
        setError(error.response?.data.message || "an error occurred")
      }
    }
    getAllAssignment()
   }, [])

   //get only my assignment

   useEffect(() => {
    const getOnlyMyAssignement = async() => {
      try {
        const token = localStorage.getItem("token")
      const response = await axios.get(`${import.meta.env.VITE_API_3}/getallassignments` , {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }

      )
      setMyAssignment(Array.isArray(response.data) ? response.data : [response.data])
      console.log(response.data)
      } catch (error) {
        console.log(error)
        setError(error?.response?.data?.message || " an error occcurred from the server")
      }
    }

    getOnlyMyAssignement()
   }, [])

   //post assignment
   const handleSubmitForAssignment = async(e) => {
    e.preventDefault()
    setError("")

    try {
      const token = localStorage.getItem("token")
      const response = await axios.post(`${import.meta.env.VITE_API_3}/postassignmentforclass`, postAssignment, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }

      })
      setMessage("successfully submitted")
    } catch (error) {
      console.log(error)
      setError(error.response?.data?.message)
    }
   }


   //fetch student details
   const openStudentModalInfo = async(studentId) => {
    setLoading(true)
    setError("")

    try {
      const token = localStorage.getItem("token")
      const response = await axios.get(`${import.meta.env.VITE_API_3}/student/${studentId}`, {
        headers: {Authorization: `Bearer ${token}`}
      })
      setSelectedStudent(response.data);
      console.log("student!!!!",response.data)
      setIsModalOpen(true);
    } catch (error) {
      setError("Failed to fetch student details");
      console.error(error);
    } 
    setLoading(false);
   }

   const openReportModal =() => {
    setReportModal(true)
  }

  const closeReportModal =() => {
    setReportModal(false)
  }

  const handleReportInput = (e) => {
    const {name, value} = e.target;
    setPostMyReport({...postMyReport, [name]: value})
  }


     //post my reports
const postMySchoolReport = async(e) => {
  e.preventDefault()
  setError("")
  try {
    const token = localStorage.getItem("token")
    const response = await axios.post(`${import.meta.env.VITE_API_3}/postreportbyteacher`, postMyReport, {
      headers: {Authorization: `Bearer ${token}`}
    })
    setMessage("successfully sent")
  } catch (error) {
    console.log(error)
    setError(error?.response?.data?.message)
  }
}

//get my reports
useEffect(() => {
  const getMyReport  = async() => {
    try {
      const token = localStorage.getItem("token")
      const response = await axios.get(`${import.meta.env.VITE_API_3}/getreportbyteacher`, {headers:{
        Authorization: `Bearer ${token}`
    }})
    setGetMyReport(response.data)
    console.log(response.data)
    } catch (error) {
      console.log(error)
      setError(error?.response?.data?.message)
    }
  }
  getMyReport()
}, [])


//get all users

useEffect(() => {
  const getAllUsers= async() => {
    try {
      const token = localStorage.getItem("token")
      const response = await axios.get(`${import.meta.env.VITE_API_3}/getallschoolusers`, {
        headers: {Authorization: `Bearer ${token}`}
      })
      setAllUsers(response.data)
      const sortedCulprits = response.data.sort((a, b) => 
        a.name.localeCompare(b.name)
      )
      setCulprits(sortedCulprits);
    } catch (error) {
      console.log(error)
      setError(error?.response?.data?.message)
    }
  }
  getAllUsers()
}, [])


useEffect(() => {
  const getAllNotice = async() => {
    try {
      const token = localStorage.getItem("token")
      const response = await axios.get(`${import.meta.env.VITE_API_3}/getteachernotice`, {
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      setNotice(response.data)
      console.log(response.data)
    } catch (error) {
      console.log(error)
      setError(error.response?.data?.mesage)
    }
  }
  getAllNotice()
}, [])





  if (loading) return <p>Loading...</p>;
  const renderContent = () => {
    switch (activeSection) {
      case "Dashboard":
        return (
          <>
      
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className=" shadow-lg rounded-lg p-4">
                <h2 className="text-lg font-semibold text-center mb-4">
                  Members
                </h2>
                <Pie data={chartData.pieData} />
              </div>

              <div className=" shadow-lg  text-white rounded-lg p-4">
                <h2 className="text-lg text-white font-semibold text-center mb-4">
                  Memebers
                </h2>
                <Bar data={chartData.barData} />
              </div>

              {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                  <div className="bg-white rounded-lg shadow-lg p-6 w-96 max-h-[90vh] overflow-y-auto">
                    <h2 className="text-xl font-bold mb-4">
                      {successMessage && (
                        <p className="text-green-500">{successMessage}</p>
                      )}
                      {error && <p className="text-red-500">{error}</p>}
                      Add a member
                    </h2>
                    <form onSubmit={handleSubmitMystaff}>
                      <div className="mb-4">
                        <label className="block mb-1">full Name</label>
                        <input
                          type="text"
                          name="name"
                          value={mystaff.name}
                          onChange={handleModalInput}
                          className="w-full border rounded px-3 py-2"
                          required
                        />
                      </div>

                      <div className="mb-4">
                        <label className="block mb-1">Email</label>
                        <input
                          type="email"
                          name="email"
                          value={mystaff.email}
                          onChange={handleModalInput}
                          className="w-full border rounded px-3 py-2"
                          required
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block mb-1">Class</label>
                        <select
                          name="sclass"
                          value={mystaff.sclass}
                          onChange={handleModalInput}
                          className="w-full border rounded px-3 py-2"
                          required
                        >
                          <option value="" disabled>
                            Select a class
                          </option>
                          {getMyClass.map((cls) => (
                            <option key={cls._id} value={cls.name}>
                              {cls.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="mb-4">
                        <label className="block mb-1">Password</label>
                        <input
                          type="password"
                          name="password"
                          value={mystaff.password}
                          onChange={handleModalInput}
                          className="w-full border rounded px-3 py-2"
                          required
                        />
                      </div>

                      <div className="mb-4">
                        <label className="block mb-1">Role</label>
                        <select
                          name="role"
                          value={mystaff.role}
                          onChange={handleModalInput}
                          className="w-full border rounded px-3 py-2"
                        >
                          <option value="" disabled>
                            Select a role
                          </option>
                          <option value="teacher">Teacher</option>
                          <option value="student">Student</option>
                          <option value="otherStaff">otherStaff</option>
                        </select>
                      </div>

                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={handleModalPopUpClose}
                          className="bg-gray-500 text-white py-2 px-4 rounded"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="bg-blue-500 text-white py-2 px-4 rounded"
                        >
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
         
         
          </>
        );
      case "Reports":
        return (
          <>
              <div className="flex-col space-x-7 mb-2">
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded"
                onClick={() => openReportModal()}
              >
                post report
              </button>
              </div>
             <div className="text-black">Reports made</div>
            <div className="mt-4 bg-white text-black shadow-md rounded-md">
              <table className="table-auto w-full text-left border-collapse">
                <thead>
                  <tr className="border-b">
              
                    <th className="p-4 text-sm text-gray-600">culprit's name</th>
                    <th className="p-4 text-sm text-gray-600">victim's name</th>
                    
                    <th className="p-4 text-sm text-gray-600">culprit's role</th>
                    <th className="p-4 text-sm text-gray-600">issue</th>
                    <th className="p-4 text-sm text-gray-600">Date of incicdent</th>
                    <th className="p-4 text-sm text-gray-600">Date reported</th>

                
                 
                  </tr>
                </thead>
                <tbody>
                  {getMyReport && getMyReport?.length > 0 ? (
                    getMyReport.map((emp, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                       

                    
                        <td className="p-4 text-sm">{emp.criminalId?.name}</td>
                        <td className="p-4 text-sm">{emp.offenderId?.name}</td>
                        <td className="p-4 text-sm">{emp.criminalId?.role}</td>
                        <td className="p-4 text-sm">{emp.issue}</td>
                        <td className="p-4 text-sm">{new Date(emp.dateOfIncident).toLocaleDateString()}</td>
                        <td className="p-4 text-sm">{new Date(emp.createdAt).toLocaleDateString()}</td>

                     

                    
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="p-4 text-center text-sm">
                        You have not made any report yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              {reportModal && (
        <div className="fixed inset-0 overflow-y-scroll  bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 mt-10 rounded-md shadow-md w-96">

            {message && <p className="text-green-500 mb-2">{message}</p>}
            {error && <p className="text-red-500 mb-2">{error}</p>}
            


            <form onSubmit={postMySchoolReport}>

        

       
              <label className="block mt-2 mb-2">Name of culprit</label>
              <select 
        name="criminal" 
        className="w-full p-2 border rounded-md" 
        onChange={handleReportInput}
      >
        <option value="">Select Culprit</option>
        {culprits.map((culprit) => (
          <option key={culprit._id} value={culprit._id}>
            {culprit.name} ({culprit.role}) {/* Display Name with Role */}
          </option>
        ))}
      </select>
            

              <label className="block mt-2 mb-2">what happened?</label>
              <input type="text" name="issue" className="w-full p-2 border rounded-md" onChange={handleReportInput} />

              <label className="block mt-2 mb-2">Date of incident</label>
              <input type="date" name="dateOfIncident" className="w-full p-2 border rounded-md" onChange={handleReportInput} />

              
              <button type="submit" className="w-full bg-green-500 text-white py-2 mt-4 rounded-md hover:bg-green-700">
                {loading ? "Submitting..." : "Submit"}
              </button>
              <button onClick={closeReportModal} className="w-full bg-red-500 text-white py-2 mt-2 rounded-md hover:bg-red-700">
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
            </div>
          </>
        );
      case "Analytics":
        return (
          <div className="bg-white p-6 rounded-lg shadow">
            Analytics Section Content
          </div>
        );
      case "Settings":
        return (
        <>

        </>
        );
      case "Teachers":
        return (
          <>
            <div className="text-black">Teachers</div>
            <div className="mt-4 bg-white text-black shadow-md rounded-md">
              <table className="table-auto w-full text-left border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="p-4 text-sm text-gray-600">Teacher ID</th>
                    <th className="p-4 text-sm text-gray-600">Teacher Name</th>
                    <th className="p-4 text-sm text-gray-600">Email</th>
                    <th className="p-4 text-sm text-gray-600">
                      Class assigned to
                    </th>
                    <th className="p-4 text-sm text-gray-600">Role</th>
                    <th className="p-4 text-sm text-gray-600">
                      Registered date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {teacher && teacher.length > 0 ? (
                    teacher.map((emp, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="p-4 text-sm">{emp.uniqueNumber}</td>

                        <td className="p-4 text-sm">{emp.name}</td>
                        <td className="p-4 text-sm">{emp.email}</td>
                        <td className="p-4 text-sm">{emp.sclass}</td>
                        <td className="p-4 text-sm">{emp.role}</td>
                        <td className="p-4 text-sm">
                          {new Date(emp.createdAt).toLocaleString()}
                        </td>

                    
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="p-4 text-center text-sm">
                        You don't have registered teachers yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        );
      case "Students":
        return (
          <>
            <div className="text-black">students</div>
            <div className="mt-4 bg-white text-black shadow-md rounded-md">
              <table className="table-auto w-full text-left border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="p-4 text-sm text-gray-600">student ID</th>
                    <th className="p-4 text-sm text-gray-600">student Name</th>
                    <th className="p-4 text-sm text-gray-600">Email</th>
                    <th className="p-4 text-sm text-gray-600">Class</th>
                    <th className="p-4 text-sm text-gray-600">Role</th>
                    <th className="p-4 text-sm text-gray-600">
                      Registered date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {student && student.length > 0 ? (
                    student.map((emp, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="p-4 text-sm">{emp.uniqueNumber}</td>

                        <td className="p-4 text-sm">{emp.name}</td>
                        <td className="p-4 text-sm">{emp.email}</td>
                        <td className="p-4 text-sm">{emp.sclass}</td>
                        <td className="p-4 text-sm">{emp.role}</td>
                        <td className="p-4 text-sm">
                          {new Date(emp.createdAt).toLocaleString()}
                        </td>

                   
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="p-4 text-center text-sm">
                        You don't have registered students yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        );

      case "other-Staffs":
        return (
          <>
          <div className="text-black">staffs</div>
          <div className="mt-4 bg-white text-black shadow-md rounded-md">
            <table className="table-auto w-full text-left border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="p-4 text-sm text-gray-600">staff ID</th>
                  <th className="p-4 text-sm text-gray-600">staff Name</th>
                  <th className="p-4 text-sm text-gray-600">Email</th>
                  <th className="p-4 text-sm text-gray-600">
                    Class assigned to
                  </th>
                  <th className="p-4 text-sm text-gray-600">Role</th>
                  <th className="p-4 text-sm text-gray-600">
                    Registered date
                  </th>
                </tr>
              </thead>
              <tbody>
                {otherStaff && otherStaff.length > 0 ? (
                  otherStaff.map((emp, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="p-4 text-sm">{emp.uniqueNumber}</td>

                      <td className="p-4 text-sm">{emp.name}</td>
                      <td className="p-4 text-sm">{emp.email}</td>
                      <td className="p-4 text-sm">{emp.sclass}</td>
                      <td className="p-4 text-sm">{emp.role}</td>
                      <td className="p-4 text-sm">
                        {new Date(emp.createdAt).toLocaleString()}
                      </td>

                   
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="p-4 text-center text-sm">
                      You don't have any other registered staff memebers yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
        );
      case "Classes":
        return (
          <>

            <div className="mt-4 bg-white text-black shadow-md rounded-md">
              <table className="table-auto w-full text-left border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="p-4 text-sm text-gray-600">class</th>
                    {/* <th className="p-4 text-sm text-gray-600">student Name</th>
              <th className="p-4 text-sm text-gray-600">Email</th>
              <th className="p-4 text-sm text-gray-600">Class</th>
              <th className="p-4 text-sm text-gray-600">Role</th>
              <th className="p-4 text-sm text-gray-600">Registered date</th> */}
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(studentsByClass).map(
                    ([className, students]) => (
                      <>
                        {/* Class Name Row */}
                        <tr className="bg-gray-200">
                          <td colSpan="4" className="p-4 font-bold text-lg">
                            {className} - {students.length} student(s)
                          </td>
                        </tr>

                        {/* List Students Under This Class */}
                        {students.map((student, idx) => (
                          <tr key={idx} className="border-b hover:bg-gray-50">
                            <td className="p-4 text-sm">{student.name}</td>
                            <td className="p-4 text-sm">{student.email}</td>
                            <td className="p-4 text-sm">{student.role}</td>
                            <td className="p-4 text-sm">
                              {new Date(student.createdAt).toLocaleString()}
                            </td>
                            <td className="p-4 flex-col space-x-1 text-sm">
                            <button
                      className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700"
                      onClick={() => openStudentModalInfo(student._id)}
                    >
                      View details
                    </button>
             
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                      onClick={() => openModal(student)}
                    >
                      Add Result
                    </button>
                  </td>
                          </tr>
                        ))}
                      </>
                    )
                  )}

     
                </tbody>
              </table>
              {modalOpen && (
        <div className="fixed inset-0 overflow-y-scroll  bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-md shadow-md w-96">

            {message && <p className="text-green-500 mb-2">{message}</p>}
            <h2 className="text-lg font-bold  mt-80 ">Eschools</h2>
            <form onSubmit={handleSubmitResult}>

        
              <label className="block mb-2 mt-20"><span className="text-2x font-semibold text-blue-700">Add a result for {selectedStudent.name}</span> <br /> Academic Session </label>
              <select name="academicSession" className="w-full p-2 border rounded-md" onChange={handleChange}>
                <option value="">Select Session</option>
                <option value="2023/2024">2023/2024</option>
                <option value="2024/2025">2024/2025</option>
                <option value="2025/2026">2025/2026</option>
                <option value="2026/2027">2026/2027</option>
                <option value="2027/2028">2027/2028</option>
                <option value="2028/2029">2028/2029</option>
                <option value="2029/2030">2029/2030</option>
                <option value="2030/2031">2030/2031</option>
                <option value="2031/2032">2031/2032</option>
                <option value="2032/2033">2032/2033</option>
                <option value="2033/2034">2033/2034</option>
                <option value="2035/2036">2035/2036</option>
                <option value="2036/2037">2036/2037</option>
                <option value="2037/2038">2037/2038</option>
                <option value="2038/2039">2038/2039</option>
                <option value="2039/2040">2039/2040</option>
                <option value="2040/2041">2040/2041</option>

              </select>
              <input type="hidden" name="studentId" value={selectedStudent._id} />


              <label className="block mt-2 mb-2">Term</label>
              <select name="term" className="w-full p-2 border rounded-md" onChange={handleChange}>
                <option value="">Select Term</option>
                <option value="First Term">First Term</option>
                <option value="Second Term">Second Term</option>
                <option value="Third Term">Third Term</option>
              </select>

              <label className="block mt-2 mb-2">Subjects</label>
              <select name="subject" className="w-full p-2 border rounded-md" onChange={handleChange}>
                <option value="">Select a subject</option>
                {allSubjects.map((cls) => (
                            <option key={cls._id} value={cls._id}>
                              {cls.name}
                            </option>
                          ))}
              </select>

              <label className="block mt-2 mb-2">Assignment Score</label>
              <input type="number" name="assignmentScore" className="w-full p-2 border rounded-md" onChange={handleChange} />

              <label className="block mt-2 mb-2">First Test Score</label>
              <input type="number" name="firstTestScore" className="w-full p-2 border rounded-md" onChange={handleChange} />

              <label className="block mt-2 mb-2">Second Test Score</label>
              <input type="number" name="secondTestScore" className="w-full p-2 border rounded-md" onChange={handleChange} />

              <label className="block mt-2 mb-2">Exam Score</label>
              <input type="number" name="examScore" className="w-full p-2 border rounded-md" onChange={handleChange} />

              <label className="block mt-2 mb-2">Comment</label>
              <textarea name="comment" className="w-full p-2 border rounded-md" onChange={handleChange}></textarea>

              <button type="submit" className="w-full bg-green-500 text-white py-2 mt-4 rounded-md hover:bg-green-700">
                {loading ? "Submitting..." : "Submit"}
              </button>
              <button onClick={closeModal} className="w-full bg-red-500 text-white py-2 mt-2 rounded-md hover:bg-red-700">
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

      {isModalOpen && selectedStudent && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg md:max-w-2xl transform transition-all duration-300">
      {loading ? (
        <p className="text-center text-lg font-semibold">Loading student details...</p>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : (
        <>
          {/* Student Info */}
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">
            {selectedStudent.student?.name}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-700">
            <p><strong>Email:</strong> {selectedStudent.student.email}</p>
            <p><strong>Class:</strong> {selectedStudent.student.sclass}</p>
            <p><strong>Role:</strong> {selectedStudent.student.role}</p>
            <p><strong>Unique Number:</strong> {selectedStudent.student.uniqueNumber}</p>
<p><strong>School:</strong> {selectedStudent.student.schoolId ? selectedStudent.student.schoolId.schoolName : "N/A"}</p>
<p><strong>Location:</strong> {selectedStudent.student.schoolId ? selectedStudent.student.schoolId.location : "N/A"}</p>

            <p className="col-span-2">
  <strong>Subjects:</strong> 
  {Array.isArray(selectedStudent.student.subjectId) ? 
    selectedStudent.student.subjectId.map(sub => sub.name).join(", ") : "N/A"}
</p>

          </div>

          {/* Scores Section */}
          <h3 className="mt-4 text-lg font-semibold text-gray-900">Scores</h3>
          {selectedStudent.scores.length > 0 ? (
            <div className="overflow-x-auto mt-2">
              <table className="w-full border-collapse border border-gray-300 text-sm">
                <thead>
                  <tr className="bg-blue-600 text-white text-left">
                    <th className="border px-2 py-1">Subject</th>
                    <th className="border px-2 py-1">Teacher Name</th>
                    <th className="border px-2 py-1">Session</th>
                    <th className="border px-2 py-1">Term</th>
                    <th className="border px-2 py-1">Assignment</th>
                    <th className="border px-2 py-1">1st Test</th>
                    <th className="border px-2 py-1">2nd Test</th>
                    <th className="border px-2 py-1">Exam</th>
                    <th className="border px-2 py-1">Total</th>
                    <th className="border px-2 py-1">Grade</th>
                    <th className="border px-2 py-1">Comment</th>
                  </tr>
                </thead>
                <tbody className="text-gray-800">
                  {selectedStudent.scores.map((score) => (
                    <tr key={score._id} className="hover:bg-gray-100">
                      <td className="border px-2 py-1">{score.subjectId.name}</td>
                      <td className="border px-2 py-1">{score.teacherId.name}</td>
                      <td className="border px-2 py-1">{score.academicSession}</td>
                      <td className="border px-2 py-1">{score.term}</td>
                      <td className="border px-2 py-1">{score.assignmentScore}</td>
                      <td className="border px-2 py-1">{score.firstTestScore}</td>
                      <td className="border px-2 py-1">{score.secondTestScore}</td>
                      <td className="border px-2 py-1">{score.examScore}</td>
                      <td className="border px-2 py-1 font-bold">{score.totalScore}</td>
                      <td className="border px-2 py-1">{score.grade}</td>
                      <td className="border px-2 py-1">{score.comment || "No comment"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-600 mt-2">No scores available</p>
          )}
        </>
      )}

      {/* Close Button */}
      <button
        className="mt-4 w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-700 transition duration-300"
        onClick={closeStudentModal}
      >
        Close
      </button>
    </div>
  </div>
)}

            </div>
          </>
        );
      case "Subjects":
        return <>
           <>
           <div className="text-black">subjects</div>
            <div className="mt-4 bg-white text-black shadow-md rounded-md">
              <table className="table-auto w-full text-left border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="p-4 text-sm text-gray-600">subject Names</th>
                    <th className="p-4 text-sm text-gray-600">classes offering</th>
                    <th className="p-4 text-sm text-gray-600">School Name</th>
                
                 
                  </tr>
                </thead>
                <tbody>
                  {allSubjects && allSubjects?.length > 0 ? (
                    allSubjects.map((emp, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                       

                        <td className="p-4 text-sm">{emp.name}</td>
                        <td className="p-4 text-sm">{emp.classes?.map(cls => cls.name).join(", ")}</td>

                        <td className="p-4 text-sm">{emp.schoolId?.schoolName}</td>
                     

                    
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="p-4 text-center text-sm">
                        You don't have registered subject yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
       
          </>
        </>;
      case "Attendance":
        return <></>;
        case "My Assignments":
          return <>
           <div className="flex-col space-x-7 mb-2">
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded"
                onClick={() => openAssModal()}
              >
                post assignments
              </button>
              </div>
             <div className="text-black">Assignments</div>
            <div className="mt-4 bg-white text-black shadow-md rounded-md">
              <table className="table-auto w-full text-left border-collapse">
                <thead>
                  <tr className="border-b">
              
                    <th className="p-4 text-sm text-gray-600">class</th>
                    <th className="p-4 text-sm text-gray-600">content</th>
                    <th className="p-4 text-sm text-gray-600">Instructions</th>
                    <th className="p-4 text-sm text-gray-600">Date</th>

                
                 
                  </tr>
                </thead>
                <tbody>
                  {myAssignments && myAssignments?.length > 0 ? (
                    myAssignments.map((emp, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                       

                    
                        <td className="p-4 text-sm">{emp.classId?.name}</td>

                        <td className="p-4 text-sm">{emp.content}</td>
                        <td className="p-4 text-sm">{emp.instructions}</td>
                        <td className="p-4 text-sm">{new Date(emp.createdAt).toLocaleDateString()}</td>

                     

                    
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="p-4 text-center text-sm">
                        You don't have any assignment yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              {assModal && (
        <div className="fixed inset-0 overflow-y-scroll  bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-md shadow-md w-96">

            {message && <p className="text-green-500 mb-2">{message}</p>}
            {error && <p className="text-red-500 mb-2">{error}</p>}
            


            <form onSubmit={handleSubmitForAssignment}>

        

       
              <label className="block mt-2 mb-2">class</label>
              <select name="classes" className="w-full p-2 border rounded-md" onChange={handleAssInput}>
                <option value="">Select a class</option>
                {getMyClass?.map((cls) => (
                            <option key={cls._id} value={cls._id}>
                              {cls.name}
                            </option>
                          ))}
              </select>

              <label className="block mt-2 mb-2">Instructions</label>
              <input type="text" name="instructions" className="w-full p-2 border rounded-md" onChange={handleAssInput} />

              <label className="block mt-2 mb-2">Content</label>
              <input type="text" name="content" className="w-full p-2 border rounded-md" onChange={handleAssInput} />

              
              <button type="submit" className="w-full bg-green-500 text-white py-2 mt-4 rounded-md hover:bg-green-700">
                {loading ? "Submitting..." : "Submit"}
              </button>
              <button onClick={closeAssModal} className="w-full bg-red-500 text-white py-2 mt-2 rounded-md hover:bg-red-700">
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
            </div>

          </>;
      case "Results":
        return (
          <>
              <>
            <div className="text-black">Results and comments by teachers</div>
            <div className="mt-4 bg-white text-black shadow-md rounded-md">
            {error &&<p className="text-red-600 text-center">{error}</p>}
              <table className="table-auto w-full text-left border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="p-4 text-sm text-gray-600">Teacher Name</th>
                    <th className="p-4 text-sm text-gray-600">Student Name</th>
                    <th className="p-4 text-sm text-gray-600">Subject</th>
                    <th className="p-4 text-sm text-gray-600">scores <br /> [Ass, 1stCA, 2ndCA, exam]</th>
                    <th className="p-4 text-sm text-gray-600">Total Score</th>
                    <th className="p-4 text-sm text-gray-600">class</th>
                    <th className="p-4 text-sm text-gray-600">comments</th>
                 
                  </tr>
                </thead>
                <tbody>
                  {getallScoresforTeacher && getallScoresforTeacher.length > 0 ? (
                    getallScoresforTeacher.map((emp, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="p-4 text-sm">{emp.teacherId?.name}</td>

                        <td className="p-4 text-sm">{emp.studentId?.name}</td>
                        <td className="p-4 text-sm">{emp.subjectId?.name}</td>
                        <td className="p-4 text-sm">{emp.assignmentScore} | {emp.firstTestScore} | {emp.secondTestScore} |  {emp.examScore} </td>
                        <td className="p-4 text-sm">{emp.totalScore}</td>
                        <td className="p-4 text-sm">{emp.studentId?.sclass}</td>
                        <td className="p-4 text-sm"> {emp.comment}</td>
                       

                    
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="p-4 text-center text-sm">
                        No results from any teacher yet yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
          </>
        )
      case "Annoucement" :
        return (
          <>
                       <div className="mt-4 bg-white text-black shadow-md rounded-md">
              <table className="table-auto w-full text-left border-collapse">
                <thead>
                  <tr className="border-b">
              
                    <th className="p-4 text-sm text-gray-600">school name</th>

                    <th className="p-4 text-sm text-gray-600">Annoucement</th>

                    <th className="p-4 text-sm text-gray-600">Date posted</th>

                
                 
                  </tr>
                </thead>
                <tbody>
                  {notice && notice?.length > 0 ? (
                    notice.map((emp, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                       

                    
                     
                        <td className="p-4 text-sm">{emp.schoolId?.name}</td>
                        <td className="p-4 text-sm">{emp.issue}</td>

                        <td className="p-4 text-sm">{new Date(emp.createdAt).toLocaleDateString()}</td>

                     

                    
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="p-4 text-center text-sm">
                      No announcement from your school yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
  
            </div>
          </>
        )
        case "Assignments":
          return <>
               <div className="text-black">Assignments</div>
            <div className="mt-4 bg-white text-black shadow-md rounded-md">
              <table className="table-auto w-full text-left border-collapse">
                <thead>
                  <tr className="border-b">
                    
                  <th className="p-4 text-sm text-gray-600">Teacher Name</th>
                    <th className="p-4 text-sm text-gray-600">class</th>
                    <th className="p-4 text-sm text-gray-600">content</th>
                    <th className="p-4 text-sm text-gray-600">Instructions</th>
                    <th className="p-4 text-sm text-gray-600">Date</th>

                
                 
                  </tr>
                </thead>
                <tbody>
                  {allAssignments && allAssignments?.length > 0 ? (
                    allAssignments.map((emp, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                       

                      <td className="p-4 text-sm">{emp.teacherId?.name}</td>
                        <td className="p-4 text-sm">{emp.classId?.name}</td>

                        <td className="p-4 text-sm">{emp.content}</td>
                        <td className="p-4 text-sm">{emp.instructions}</td>
                        <td className="p-4 text-sm">{new Date(emp.createdAt).toLocaleDateString()}</td>

                     

                    
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="p-4 text-center text-sm">
                       No assignment yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
   
            </div>
          </>;
      case "comments":
        return (
          <>
             <div className="text-black">comments by teachers</div>
             {error &&<p className="text-red-600 text-center">{error}</p>}
            <div className="mt-4 bg-white text-black shadow-md rounded-md">
              <table className="table-auto w-full text-left border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="p-4 text-sm text-gray-600">Teacher Name</th>
                    <th className="p-4 text-sm text-gray-600">Student Name</th>
                    <th className="p-4 text-sm text-gray-600">Class</th>
                    <th className="p-4 text-sm text-gray-600">Subject</th>


                    <th className="p-4 text-sm text-gray-600">comments</th>
                 
                  </tr>
                </thead>
                <tbody>
                  {getallScoresforTeacher && getallScoresforTeacher.length > 0 ? (
                    getallScoresforTeacher.map((emp, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="p-4 text-sm">{emp.teacherId?.name}</td>

                        <td className="p-4 text-sm">{emp.studentId?.name}</td>
                        <td className="p-4 text-sm">{emp.studentId?.sclass}</td>
                        <td className="p-4 text-sm">{emp.subjectId?.name}</td>

                        <td className="p-4 text-sm"> {emp.comment}</td>
                       

                    
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="p-4 text-center text-sm">
                        No comments yet yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )
      case "MyScores":
        return (
          <>
                 <>
            <div className="text-black">My scores for students</div>
            {error &&<p className="text-red-600 text-center">{error}</p>}
            <div className="mt-4 bg-white text-black shadow-md rounded-md">
              <table className="table-auto w-full text-left border-collapse">
                <thead>
                  <tr className="border-b">

                    <th className="p-4 text-sm text-gray-600">Student Name</th>
                    <th className="p-4 text-sm text-gray-600">Subject</th>
                    <th className="p-4 text-sm text-gray-600">Session</th>
                    <th className="p-4 text-sm text-gray-600">term</th>
                    <th className="p-4 text-sm tex-center text-gray-600">scores <br /> [Ass, 1stCA, 2ndCA, exam]</th>
                    <th className="p-4 text-sm text-gray-600">total score</th>
                    <th className="p-4 text-sm text-gray-600">grade</th>
                    <th className="p-4 text-sm text-gray-600">class</th>
                    <th className="p-4 text-sm text-gray-600">comments</th>
                 
                  </tr>
                </thead>
                <tbody>
                  {getOnlyMyScore && getOnlyMyScore.length > 0 ? (
                    getOnlyMyScore.map((emp, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">


                        <td className="p-4 text-sm">{emp.studentId?.name}</td>
                        <td className="p-4 text-sm">{emp.subjectId?.name}</td>
                        <td className="p-4 text-sm">{emp.academicSession}</td>
                        <td className="p-4 text-sm">{emp.term}</td>
                        <td className="p-4 text-sm">{emp.assignmentScore} | {emp.firstTestScore} | {emp.secondTestScore} |  {emp.examScore} </td>
                        <td className="p-4 text-sm">{emp.totalScore}</td>
                        <td className="p-4 text-sm">{emp.grade}</td>
                        <td className="p-4 text-sm">{emp.studentId?.sclass}</td>
                        <td className="p-4 text-sm"> {emp.comment}</td>
                       

                    
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="p-4 text-center text-sm">
                        You don't have any score accorded to any student yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
          </>
        )
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen mt-5 bg-gray-100">
      {/* Sidebar */}
      <div
              className={`fixed top-3 left-0 h-full bg-gradient-to-b overflow-y-scroll from-green-700 pb-20 to-green-900 text-white w-64 pt-16 transform ${
    isSidebarOpen ? "translate-x-0" : "-translate-x-full ml-0"
  } transition-transform duration-300 md:translate-x-0 md:w-64`}
>
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-bold text-white">{myData?.role}'s Dashboard</h2>
      
        </div>
        <nav>
        <h2 className="text-xl  text-white ">{myData?.name}
        <button className="lg:hidden text-red-600 pl-5" onClick={toggleSidebar}>
          X
        </button></h2>
      
      
          {sidebarItems.map((item, index) => (
            <button
              key={index}
              className={`flex items-center gap-3 block w-full text-left py-2 px-4 rounded-lg ${
                activeSection === item.name
                  ? "bg-green-600 text-black"
                  : "text-white hover:bg-gray-200"
              }`}
              onClick={() => {
                setActiveSection(item.name);
                setSidebarOpen(false);
              }}
            >
              {item.icon} {item.name}
            </button>
          ))}
        </nav>
      
      </div>

      {/* Main Content */}
      <div   className={`flex-1 p-6 transition-all duration-300 ${
    isSidebarOpen ? "ml-64" : "ml-0"
  } md:ml-64`}
>
 
        <button className="lg:hidden mb-4" onClick={toggleSidebar}>
          <FiMenu size={24} />
        </button>
        <h1 className="text-2xl font-bold text-green-600 mb-4">
          {activeSection}
        </h1>

        {renderContent()}
      </div>
    </div>
  );
};

export default TeacherDashboard;
