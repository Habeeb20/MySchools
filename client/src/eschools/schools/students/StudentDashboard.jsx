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
  { name: "Notice", icon: <FaCog /> },
  {name: "MyScores", icon: <FaCog /> },
  {name: "My Assignments", icon: <FaCog />},
  { name: "comments", icon: <FaCog /> },
  { name: "Assignments", icon: <FaCog /> },
  { name: "Attendance", icon: <FaCog /> },
  { name: "Reports", icon: <FaChartPie /> },
  { name: "Settings", icon: <FaCog /> },
];

const StudentDashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("Dashboard");
  const [myData, setMyData] = useState([]);
  const [error, setError] = useState("");


  const [loading, setLoading] = useState(false);

  const [student, setStudent] = useState([]);
  const [teacher, setTeacher] = useState([]);
  const [otherStaff, setOtherStaff] = useState([]);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
  const [getallScoresforTeacher, setGetAllScoreForTeacher] = useState([])
  const [getOnlyMyScore, setGetOnlyMyScore] = useState([])



  const [allSubjects, setAllSubjects] = useState([]);


  const [getMyClass, setGetMyClass] = useState([]);
  const [notice, setNotice] = useState([])
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [reportModal, setReportModal] = useState(false)
  const [myAssignments, setMyAssignment] = useState([])
  const [allAssignments, setAllAssignments] = useState([])
  const [culprits, setCulprits] = useState([]);
  const [postAssignment, setPostAssignement] = useState({
    classes:"",
    instructions:"",
    content: "",
  })
  const [allUsers, setAllUsers] = useState([])
  const [message, setMessage] = useState("");
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

const [postMyReport, setPostMyReport] = useState({
  criminal: "",
  issue: "",

  dateOfIncident: ""
})

const [getMyReport, setGetMyReport] = useState([])


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




  // get my teachers
  useEffect(() => {
    const getMyTeachers = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${import.meta.env.VITE_API_3}/studentgetallteachers`,
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
          `${import.meta.env.VITE_API_3}/studentdashboard`,
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

  


 




//get only my scores for the teachers

   useEffect(() => {
    const fetchMyScores = async() => {
      try {
        const token = localStorage.getItem("token")
        const response = await axios.get(`${import.meta.env.VITE_API_3}/my-scores`, {
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
        const response = await axios.get(`${import.meta.env.VITE_API_3}/studentgetallassignments`, {
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


   //post my reports
const postMySchoolReport = async(e) => {
  e.preventDefault()
  setError("")
  try {
    const token = localStorage.getItem("token")
    const response = await axios.post(`${import.meta.env.VITE_API_3}/postmyreportbystudent`, postMyReport, {
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
      const response = await axios.get(`${import.meta.env.VITE_API_3}/getmyreports`, {headers:{
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



///get all notice

useEffect(() => {
  const getAllNotice = async() => {
    try {
      const token = localStorage.getItem("token")
      const response = await axios.get(`${import.meta.env.VITE_API_3}/getstudentnotice`, {
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
      
         <h2>Dashboard</h2>
         
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
                    <th className="p-4 text-sm text-gray-600">offender's name</th>
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
              {/* {assModal && (
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
      )} */}
            </div>

          </>;
  
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
          case "Notice":
            return (
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
            )
      case "comments":
        return (
          <>
             <div className="text-black">comments about you by your teachers teachers</div>
             {error &&<p className="text-red-600 text-center">{error}</p>}
            <div className="mt-4 bg-white text-black shadow-md rounded-md">
              <table className="table-auto w-full text-left border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="p-4 text-sm text-gray-600">Teacher Name</th>

                    <th className="p-4 text-sm text-gray-600">Session</th>
                    <th className="p-4 text-sm text-gray-600">Term</th>
                    <th className="p-4 text-sm text-gray-600">Subject</th>


                    <th className="p-4 text-sm text-gray-600">comments</th>
                    <th className="p-4 text-sm text-gray-600">Date</th>
                 
                  </tr>
                </thead>
                <tbody>
                  {getOnlyMyScore && getOnlyMyScore.length > 0 ? (
                    getOnlyMyScore.map((emp, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="p-4 text-sm">{emp.teacherId?.name}</td>

                        <td className="p-4 text-sm">{emp.academicSession}</td>
                        <td className="p-4 text-sm">{emp.term}</td>
                        <td className="p-4 text-sm">{emp.subjectId?.name}</td>

                        <td className="p-4 text-sm"> {emp.comment}</td>
                        <th className="p-4 text-sm text-gray-600">{new Date(emp.createdAt).toLocaleDateString()}</th>
                       

                    
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

                    <th className="p-4 text-sm text-gray-600">Teacher's Name</th>
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


                        <td className="p-4 text-sm">{emp.teacherId?.name}</td>
                        <td className="p-4 text-sm">{emp.subjectId?.name}</td>
                        <td className="p-4 text-sm">{emp.academicSession}</td>
                        <td className="p-4 text-sm">{emp.term}</td>
                        <td className="p-4 text-sm">{emp.assignmentScore} | {emp.firstTestScore} | {emp.secondTestScore} |  {emp.examScore} </td>
                        <td className="p-4 text-sm">{emp.totalScore}</td>
                        <td className="p-4 text-sm">{emp.grade}</td>
                        <td className="p-4 text-sm">{emp.sclass}</td>
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
        className={`fixed inset-y-0 left-0 bg-white shadow-lg w-64 h-100vh min-h-screen p-5 transition-transform transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:static`}
      >
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-bold text-blue-600">{myData?.role}'s Dashboard</h2>
      
        </div>
        <nav>
        <h2 className="text-xl  text-blue-600 ">{myData?.name}
        <button className="lg:hidden text-red-600 pl-5" onClick={toggleSidebar}>
          X
        </button></h2>
      
      
          {sidebarItems.map((item, index) => (
            <button
              key={index}
              className={`flex items-center gap-3 block w-full text-left py-2 px-4 rounded-lg ${
                activeSection === item.name
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-gray-200"
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
      <div className="flex-1 p-6 lg:">
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

export default StudentDashboard;
