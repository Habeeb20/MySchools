import { useState } from "react";
import react from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { FaRegChartBar, FaCog, FaChartPie } from "react-icons/fa";
import { Link } from "react-router-dom";
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
import { LineChart, PieChart,  BarChart,  XAxis, YAxis, ResponsiveContainer, Line } from "recharts";
import axios from "axios";
import TrendsChart from "../schools/TrendsCharts";
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
  {name: "Announcements", icon:<FaCog />},
  { name: "Subjects", icon: <FaCog /> },
  { name: "Attendance", icon: <FaCog /> },
  { name: "Reports", icon: <FaChartPie /> },
  { name: "Analytics", icon: <FaRegChartBar /> },
  { name: "Settings", icon: <FaCog /> },
];

const Dashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("Dashboard");
  const [myData, setMyData] = useState([]);
  const [error, setError] = useState("");
  const [userId, setUserId] = useState(false);
  const [school, setSchool] = useState([]);
  const [user, setUser] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [schoolName, setSchoolName] = useState([]);
  const [loading, setLoading] = useState(false);
  const [getMyReport, setGetMyReport] = useState([])
  const [student, setStudent] = useState([]);
  const [teacher, setTeacher] = useState([]);
  const [otherStaff, setOtherStaff] = useState([]);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
  const [formType, setFormType] = useState("");
  const [name, setName] = useState("");
 
  const [allSubjects, setAllSubjects] = useState([]);
  const [month, setMonth] = useState("01");
  const [year, setYear] = useState("2024");
  const [errorMessage, setErrorMessage] = useState("");
  const [getNotice, setGetNotice] = useState([])
  const [postNotice, setPostNotice] = useState({
    issue:""
  })
  const [noticeModal, setNoticeModal] = useState(false)
  const [getMyStaff, setGetMyStaff] = useState([]);
  const [showSchoolPopup, setShowSchoolPopUp] = useState(false);
  const [showClassModal, setShowClassModal] = useState(false);
  const [getMyClass, setGetMyClass] = useState([]);
  const [studentsByClass, setStudentsByClass] = useState({});
  const [myClass, setMyClass] = useState({
    name: "",
    classes: "",
  });
  const [mystaff, setMyStaff] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    sclass: "",
  });
  const [showModalPopupForSubject, setShowModalPopupForSubject] = useState(false);
  const [postMySubject, setPostMySubject] = useState({
    name:"",
    classes:""
  })
  const [userData, setUserData] = useState({
    schoolName: "",
    phone: "",
    discount: "",
    discounttext: "",
    percent: "",
    duration: "",
    departments: "",
    faculty: "",
    admissionStartDate: "",
    admissionEndDate: "",
    admissionRequirements: "",
    category: "",
    state: "",
    LGA: "",
    location: "",
    schoolFees: "",
    schoolbus: "",
    onBoarding: "",
    picture: "",
    schoolPicture: "",
    coverPicture: "",
    picture1: "",
    picture2: "",
    picture3: "",
    picture4: "",
    TC: "",
    schoolNews: "",
    history: "",
    vcpicture: "",
    vcspeech: "",
    AO: "",

    ownership: "",

    schoolfees1: "",
    class1: "",

    schoolfees2: "",
    class2: "",

    schoolfees3: "",
    class3: "",

    schoolfees4: "",
    class4: "",

    schoolfees5: "",
    class5: "",

    schoolfees6: "",
    class6: "",

    schoolfees7: "",
    class7: "",

    jobVacancy: "",
    NumberOfVacancy: "",
    position1: "",
    salary1: "",
    qualification1: "",

    position2: "",
    salary2: "",
    qualification2: "",

    position3: "",
    salary3: "",
    qualification3: "",

    position4: "",
    salary4: "",
    qualification4: "",

    position5: "",
    salary5: "",
    qualification5: "",

    position6: "",
    salary6: "",
    qualification6: "",
  });
  const [data, setData] = useState({ totalIncome: 0, totalExpense: 0, balance: 0 });


  const [chartData, setChartData] = useState({
    pieData: { labels: [], datasets: [] },
    barData: { labels: [], datasets: [] },
  });

  useEffect(() => {
    const fetchSchoolData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${import.meta.env.VITE_API_3}/getusers`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const users = response.data; // Array of users

        // Count users per role
        const studentCount = users.filter(
          (user) => user.role === "student"
        ).length;
        const teacherCount = users.filter(
          (user) => user.role === "teacher"
        ).length;
        const staffCount = users.filter(
          (user) => user.role === "otherStaff"
        ).length;

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

  const [trendData, setTrendData] = useState([]);

  const handlePopclose = () => {
    setShowSchoolPopUp(false);
  };

  const handleShowPopClose = () => {
    setShowPopup(false);
  };

  //get my students
  useEffect(() => {
    const getMyStudents = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${import.meta.env.VITE_API_3}/getmystudents`,
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

  //get my teachers
  useEffect(() => {
    const getMyTeachers = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${import.meta.env.VITE_API_3}/getmyteachers`,
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

  //get my staff
  //get my teachers
  useEffect(() => {
    const getMyOtherStaff = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${import.meta.env.VITE_API_3}/getmyotherstaff`,
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

  //get my school data
  useEffect(() => {
    const fetchMyData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${import.meta.env.VITE_API_3}/getschooldata`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setSchool(response.data);
        setUser(response.data);
        setUserId(response.data.school._id);
        console.log(response.data.school._id);
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  //submit the school name form
  const SubmitSchoolName = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        `${import.meta.env.VITE_API_3}/postschooldata`,
        { schoolName },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSuccessMessage("School name saved successfully!");

      setTimeout(() => {
        navigate("/dashboard");
      });
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  //update my schooldata profile
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setError("");
  //   console.log(userId)
  //   setSuccessMessage("");
  //   try {
  //     const token = localStorage.getItem("token");
  //     await axios.put(`${import.meta.env.VITE_API_3}/${userId}`, userData, {
  //       headers: { Authorization: `Bearer ${token}` },
  //     });
  //     toast.success("profile successfully updated");
  //     console.log(userId)
  //     setSuccessMessage("Profile updated successfully!");
  //     setShowPopup(false);
  //   } catch (err) {
  //     toast.error("failed to update profile");
  //     console.log(err);
  //     setError("Failed to update profile.");
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();

      // Append text fields
      Object.keys(userData).forEach((key) => {
        if (key !== "schoolLogo" && key !== "pictures") {
          formData.append(key, userData[key]);
        }
      });

      // Append schoolFees and jobVacancies as JSON strings
      if (userData.schoolFees) {
        formData.append("schoolFees", JSON.stringify(userData.schoolFees));
      }
      if (userData.jobVacancies) {
        formData.append("jobVacancies", JSON.stringify(userData.jobVacancies));
      }

      // Append the uploaded file if it exists
      if (userData.schoolLogo) {
        formData.append("schoolLogo", userData.schoolLogo);
      }

      // Send the update request
      await axios.put(`${import.meta.env.VITE_API_3}/${userId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Profile successfully updated");
      setSuccessMessage("Profile updated successfully!");
      setShowPopup(false);
    } catch (err) {
      toast.error("Failed to update profile");
      console.error(err);
      setError("Failed to update profile.");
    }
  };

  const handleFileChange = async (e, field) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dc0poqt9l/image/upload",
        formData,
        {
          params: {
            upload_preset: "essential",
          },
        }
      );
      setUserData((prevData) => ({
        ...prevData,
        [field]: response.data.secure_url,
      }));
    } catch (err) {
      console.error("Error uploading file to Cloudinary", err);
    }
  };

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
          `${import.meta.env.VITE_API_1}/dashboard`,
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

  //handle modal pop up

  const handleModalOpen = (role) => {
    setFormType(role);
    setIsModalOpen(true);
    setMyStaff({
      name: "",
      email: "",
      password: "",
      role: "",
      sclass: "",
    });
  };
  //handle modal pop for classes
  const handleShowClassModal = () => {
    setShowClassModal(true);
  };

  ///close modal pop for class
  const handleCloseClassModal = () => {
    setShowClassModal(false);
  };

  //input for class modal fields

  const handleClassModalInput = (e) => {
    const { name, value } = e.target;
    setMyClass({ ...myClass, [name]: value });
  };

  const handleModalInput = (e) => {
    const { name, value } = e.target;
    setMyStaff({ ...mystaff, [name]: value });
  };
  const handleModalPopUpClose = () => {
    setIsModalOpen(false);
  };
  ///add my staff for modal pop up
  const handleSubmitMystaff = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${import.meta.env.VITE_API_3}/addstudents`,
        mystaff,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("successfully added");
      setSuccessMessage("successfully done");
    } catch (error) {
      toast.error("an error occurred");
      console.log(error);
      setError(
        error.response?.data?.error ||
          error.response?.data?.message ||
          "error occurred"
      );
    }
  };

  //get my staff

  useEffect(() => {
    const getMyStaff = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${import.meta.env.VITE_API_3}/getusers`,
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

  //post my class

  const handlePostMyClass = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${import.meta.env.VITE_API_3}/create-class`,
        { name },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("succesffuly sent");
      setSuccessMessage(response.data.message);
      setErrorMessage("");
      setName("");

      console.log("successfully");
    } catch (error) {
      console.log(error);
      setError("an error occurred");
    }
  };

  //GET MY CLASS

  useEffect(() => {
    const getMyClasses = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${import.meta.env.VITE_API_3}/my-classes`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setGetMyClass(response.data.classes);
        console.log("my classes!!", response.data.classes);
      } catch (error) {
        console.log(error);
        setError(error?.response?.data?.message);
      }
    };

    getMyClasses();
  }, []);

  //GET STUDENTS BY CLASS

  useEffect(() => {
    const fetchMyStudentsByClass = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${import.meta.env.VITE_API_3}/getstudentsByClass`,
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



  ///get my report

  useEffect(() => {
    const getMyReport  = async() => {
      try {
        const token = localStorage.getItem("token")
        const response = await axios.get(`${import.meta.env.VITE_API_3}/getreportbyadmin`, {headers:{
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
  

  const handleInputForSubject = (e) => {
    const {name, value} = e.target;
    setPostMySubject({...postMySubject, [name]: value})
  }

  //model pop up for subject
  const handlePopupForSubject =() => {
    setShowModalPopupForSubject(true)
    setPostMySubject({
      name:"",
      classes: ""
    })
  }

  const handleCloseSubjectPopup = () => {
    setShowModalPopupForSubject(false)
  }

  //post my subject
  const handlepostMySubject = async(e) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem("token")
      const response = await axios.post(`${import.meta.env.VITE_API_3}/create-subject`,postMySubject, {
        headers: {Authorization: `Bearer ${token}`}
      })
      console.log("successful")
      setSuccessMessage(response?.data?.message || "successful")
    } catch (error) {
      console.log(error)
      setError(error.response?.data?.message || "failed to create a subject")
      
    }

  }

  //get my subject
  useEffect(() => {
    const getMySubjects = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${import.meta.env.VITE_API_3}/get-my-subjects`,
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


  //modal for notice
  const handleNoticeModalOpen = () => {
    setNoticeModal(true)
  }

  const handleNoticeInput = (e) => {
    const {name, value} = e.target
    setPostNotice({...postNotice, [name]: value})
  }

  const handleNoticeModalClose = () => {
    setNoticeModal(false)
  }

  ///post notice
const postMyNotice = async(e) => {
  e.preventDefault()
  try {
    const token = localStorage.getItem("token")
    const response = await axios.post(`${import.meta.env.VITE_API_3}/postnotice`, postNotice, {
      headers: {Authorization: `Bearer ${token}`}
    })
    console.log("successfully sent ")
    setSuccessMessage("successfully sent")
  } catch (error) {
    console.log(error)
    setError(error.response?.data?.message)
  }
}
//get my notice
useEffect(() => {
  const getNotice = async() => {
    try {
      const token = localStorage.getItem("token")
      const response = await axios.get(`${import.meta.env.VITE_API_3}/getnotices`, {
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      setGetNotice(response.data)
      console.log(response.data)
    } catch (error) {
      console.log(error)
      setError(error?.response?.data?.message)
    }
  }
  getNotice()
}, [])


//get my finances

  useEffect(() => {
    const mytotalBalance = async() => {
      try {
        const token = localStorage.getItem("token")
        const response = await axios.get(`${import.meta.env.VITE_API_3}/get-totals`, {
          headers: {Authorization: `Bearer ${token}`}
        })
        setData(response.data)
        console.log(response.data)
      } catch (error) {
        console.log(error)
        setError(error?.response?.data?.message)
      }
    }
    mytotalBalance()
  }, [])


    const fetchFilteredData = () => {
      axios.get(`${import.meta.env.VITE_API_3}/get-filtered-data?month=${month}&year=${year}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      })
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
    }




  const pieData = [
    { name: "Income", value: data.totalIncome, fill: "#4CAF50" },
    { name: "Expenses", value: data.totalExpense, fill: "#F44336" },
  ];

  const barData = [
    { name: "Income", amount: data.totalIncome },
    { name: "Expenses", amount: data.totalExpense },
  ];

  if (loading) return <p>Loading...</p>;
  const renderContent = () => {
    switch (activeSection) {
      case "Dashboard":
        return (
          <>
            <div className="flex-col space-x-7 mb-2">
              <button
                className="bg-green-500 text-white py-2 px-4 rounded"
                onClick={() => handleModalOpen()}
              >
                Add teacher
              </button>
              <button
                className="bg-yellow-500 text-white py-2 px-4 rounded"
   
                onClick={() => handleModalOpen()}
              >
                Add student
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className=" shadow-lg rounded-lg p-4">
                <h2 className="text-lg font-semibold text-center mb-4">
                  Members
                </h2>
                <Pie data={chartData.pieData} />
              </div>

              <div className=" shadow-lg  text-white rounded-lg p-4">
                <h2 className="text-lg text-white font-semibold text-center mb-4">
                  Members
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="bg-white p-4 shadow-lg rounded-xl">
          <h3 className="text-lg font-semibold mb-3">Income vs Expenses</h3>
          <PieChart width={300} height={300}>
            <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} />
            <Tooltip />
          </PieChart>
        </div>

        {/* Bar Chart */}
        <div className="bg-white p-4 shadow-lg rounded-xl">
          <h3 className="text-lg font-semibold mb-3">Financial Overview</h3>
          <BarChart width={400} height={250} data={barData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="amount" fill="#2196F3" />
          </BarChart>
        </div>
      </div>

      {/* Cryptocurrency Rating Graph */}
      <div className="mt-6 p-4 bg-gray-100 shadow-lg rounded-xl">
        <h3 className="text-lg font-semibold mb-3">Balance Status</h3>
        <div className="text-2xl font-bold" style={{ color: data.balance >= 0 ? "#4CAF50" : "#F44336" }}>
          {data.balance >= 0 ? "🟢 Positive Balance" : "🔴 Negative Balance"}
        </div>
      </div>

      <div className="bg-white p-4 shadow-lg rounded-xl">
    
      <div className="flex gap-4 mb-4">
      <select value={month} onChange={(e) => setMonth(e.target.value)} className="border p-2">
        {Array.from({ length: 12 }, (_, i) => (
          <option key={i + 1} value={(i + 1).toString().padStart(2, "0")}>
            {new Date(2024, i, 1).toLocaleString("en-US", { month: "long" })}
          </option>
        ))}
      </select>

      <input
        type="number"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        className="border p-2 w-20"
        placeholder="Year"
      />

      <button onClick={fetchFilteredData} className="bg-blue-500 text-white px-4 py-2">
        Filter
      </button>
    </div>

    <TrendsChart data={data} />
    </div>
          </>
        );
      case "Reports":
        return (
          <>
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
          <div>
            <div className="flex-col-3 space-x-3">
              <button
                onClick={() => setShowSchoolPopUp(true)}
                className="mt-6 py-3 px-6 bg-green-600 text-white rounded-lg hover:bg-green-500 w-15"
              >
                Add school Name
              </button>
              <button
                onClick={() => setShowPopup(true)}
                className="mt-5 py-3 px-6 bg-green-600 text-white rounded-lg hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-indigo-300"
              >
                Edit Profile
              </button>
            </div>

            <div className="max-w-6xl mx-auto p-6">
              {/* School Details Section */}
              <section className="bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg rounded-xl p-8 mb-8">
                <h2 className="text-2xl font-extrabold mb-6">
                  🏫 School Details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { label: "Terms and Conditions", value: user.TC },
                    { label: "School News", value: user.schoolNews },
                    { label: "History", value: user.history },
                    { label: "Speech", value: user.vcspeech },
                    { label: "Aims and Objectives", value: user.AO },
                    { label: "Ownership", value: user.ownership },
                  ].map((detail, idx) => (
                    <div
                      key={idx}
                      className="bg-white text-gray-800 p-5 rounded-lg shadow-md hover:shadow-lg transition-all"
                    >
                      <p className="text-sm font-semibold text-gray-500">
                        {detail.label}
                      </p>
                      <p className="text-lg font-bold">
                        {detail.value || "N/A"}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Fees Section */}
              <section className="bg-white shadow-lg rounded-xl p-8 mb-8 border-l-8 border-blue-500">
                <h2 className="text-2xl font-extrabold text-gray-800 mb-6">
                  💰 School Fees
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                    <div
                      key={num}
                      className="bg-gray-100 p-6 rounded-lg shadow-md hover:bg-blue-100 transition-all"
                    >
                      <p className="text-sm text-gray-500">Class {num}</p>
                      <p className="text-lg font-bold">
                        {user[`class${num}`] || "N/A"}
                      </p>
                      <p className="text-sm text-gray-500 mt-2">Amount</p>
                      <p className="text-lg font-bold text-blue-600">
                        {user[`schoolfees${num}`] || "N/A"}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Job Vacancy Section */}
              <section className="bg-gradient-to-r from-green-500 to-teal-500 text-white shadow-lg rounded-xl p-8 mb-8">
                <h2 className="text-2xl font-extrabold mb-6">
                  📢 Job Vacancies
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <div
                      key={num}
                      className="bg-white text-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-all"
                    >
                      <p className="text-sm font-semibold text-gray-500">
                        Position {num}
                      </p>
                      <p className="text-lg font-bold">
                        {user[`position${num}`] || "N/A"}
                      </p>
                      <p className="text-sm text-gray-500 mt-2">Salary</p>
                      <p className="text-lg font-bold text-green-600">
                        {user[`salary${num}`] || "N/A"}
                      </p>
                      <p className="text-sm text-gray-500 mt-2">
                        Qualification
                      </p>
                      <p className="text-lg font-bold">
                        {user[`qualification${num}`] || "N/A"}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Images Section */}
              <section className="bg-white shadow-lg rounded-xl p-8">
                <h2 className="text-2xl font-extrabold text-gray-800 mb-6">
                  📸 Images
                </h2>
                <div className="flex flex-wrap justify-center gap-6">
                  {[
                    user.coverPicture,
                    user.schoolPicture,
                    user.picture,
                    user.picture1,
                    user.picture2,
                    user.picture3,
                    user.picture4,
                    user.vcpicture,
                  ]
                    .filter((pic) => pic)
                    .map((pic, idx) => (
                      <img
                        key={idx}
                        src={pic}
                        alt={`School image ${idx + 1}`}
                        className="w-40 h-40 rounded-xl shadow-md object-cover hover:scale-105 transition-transform"
                      />
                    ))}
                </div>
              </section>
            </div>

            {showSchoolPopup && (
              <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 px-4">
                <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                  <h2 className="text-xl font-semibold text-gray-800 text-center mb-4">
                    Welcome! Please Enter Your School Name
                  </h2>

                  {successMessage && (
                    <p className="bg-green-100 text-green-700">
                      {successMessage}
                    </p>
                  )}
                  {error && <p className="bg-red-100 text-red-700">{error}</p>}
                  <form onSubmit={SubmitSchoolName} className="space-y-4">
                    <input
                      type="text"
                      value={schoolName}
                      onChange={(e) => setSchoolName(e.target.value)}
                      required
                      placeholder="Enter School Name"
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />

                    <button
                      type="submit"
                      className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition duration-300 flex justify-center items-center"
                      disabled={loading}
                    >
                      {loading ? (
                        <span className="flex items-center">
                          <svg
                            className="animate-spin h-5 w-5 mr-2 text-white"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8v8H4z"
                            ></path>
                          </svg>
                          Saving...
                        </span>
                      ) : (
                        "Save & Continue"
                      )}
                    </button>
                    <button
                      className="w-full bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 transition duration-300 flex justify-center items-center"
                      onClick={handlePopclose}
                      type="submit"
                    >
                      cancel
                    </button>
                  </form>
                </div>
              </div>
            )}

            {showPopup && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xl max-h-[90vh] overflow-y-auto">
                  <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">
                    Update Your Profile
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {Object.keys(userData).map(
                      (key) =>
                        key !== "picture" &&
                        key !== "picture1" &&
                        key !== "picture2" &&
                        key !== "picture3" &&
                        key !== "picture4" &&
                        key !== "vcpicture" &&
                        key !== "schoolPicture" &&
                        key !== "coverPicture"
                    )}
                    <button
                      onClick={() => setShowPopup(false)}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition"
                    >
                      ✕
                    </button>

                    {/* New input fields */}
                    <div className="flex flex-col">
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        School Name
                      </label>
                      <input
                        type="text"
                        name="schoolName"
                        value={userData.schoolName}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        phone number
                      </label>
                      <input
                        type="text"
                        name="phone"
                        value={userData.phone}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        discount(Yes/No?)
                      </label>
                      <input
                        type="text"
                        name="discount"
                        value={userData.discount}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        what percentage is the discount if yes
                      </label>
                      <input
                        type="text"
                        name="percent"
                        value={userData.percent}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        discount will be given to what set of people
                      </label>
                      <input
                        type="text"
                        name="discounttext"
                        value={userData.discounttext}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        how many months,weeks,or days will the discount last
                      </label>
                      <input
                        type="text"
                        name="duration"
                        value={userData.duration}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        department(yes/No)
                      </label>
                      <input
                        type="text"
                        name="departments"
                        value={userData.departments}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        Faculty(yes/No)
                      </label>
                      <input
                        type="text"
                        name="faculty"
                        value={userData.faculty}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        department(yes/No)
                      </label>
                      <input
                        type="text"
                        name="departments"
                        value={userData.departments}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        when do you start admission process
                      </label>
                      <input
                        type="date"
                        name="admissionStartDate"
                        value={userData.admissionStartDate}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        when does your admission process end
                      </label>
                      <input
                        type="date"
                        name="admissionEndDate"
                        value={userData.admissionEndDate}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        what are the admission requirements?
                      </label>
                      <input
                        type="text"
                        name="admissionRequirements"
                        value={userData.admissionRequirements}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        category(primary, secondary, univeristy or polytechnic)
                      </label>
                      <input
                        type="text"
                        name="category"
                        value={userData.category}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        State
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={userData.state}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        LGA
                      </label>
                      <input
                        type="text"
                        name="LGA"
                        value={userData.LGA}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        minimum school fees
                      </label>
                      <input
                        type="text"
                        name="schoolFees"
                        value={userData.schoolFees}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        Accommodation
                      </label>
                      <input
                        type="text"
                        name="onBoarding"
                        value={userData.onBoarding}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        school Bus available(yes/No)?
                      </label>
                      <input
                        type="text"
                        name="schoolbus"
                        value={userData.schoolbus}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        Terms and Conditions
                      </label>
                      <input
                        type="text"
                        name="TC"
                        value={userData.TC}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        History
                      </label>
                      <textarea
                        type="text"
                        name="history"
                        value={userData.history}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        school News
                      </label>
                      <textarea
                        type="text"
                        name="schoolNews"
                        value={userData.schoolNews}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        ownership(private, federal or state)
                      </label>
                      <input
                        type="text"
                        name="ownership"
                        value={userData.ownership}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        school fees1(for a particular class and fill in the
                        class below) ?
                      </label>
                      <input
                        type="text"
                        name="schoolfees1"
                        value={userData.schoolfees1}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        school fees1 for what class ?
                      </label>
                      <input
                        type="text"
                        name="class1"
                        value={userData.class1}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        school fees2(for a particular class and fill in the
                        class below) ?
                      </label>
                      <input
                        type="text"
                        name="schoolfees2"
                        value={userData.schoolfees2}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        school fees2 for what class ?
                      </label>
                      <input
                        type="text"
                        name="class2"
                        value={userData.class2}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        school fees2(for a particular class and fill in the
                        class below) ?
                      </label>
                      <input
                        type="text"
                        name="schoolfees2"
                        value={userData.schoolfees2}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        school fees2 for what class ?
                      </label>
                      <input
                        type="text"
                        name="class2"
                        value={userData.class2}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        school fees3(for a particular class and fill in the
                        class below) ?
                      </label>
                      <input
                        type="text"
                        name="schoolfees3"
                        value={userData.schoolfees3}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        school fees3 for what class ?
                      </label>
                      <input
                        type="text"
                        name="class3"
                        value={userData.class3}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        school fees4(for a particular class and fill in the
                        class below) ?
                      </label>
                      <input
                        type="text"
                        name="schoolfees4"
                        value={userData.schoolfees4}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        school fees4 for what class ?
                      </label>
                      <input
                        type="text"
                        name="class4"
                        value={userData.class4}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        school fees5(for a particular class and fill in the
                        class below) ?
                      </label>
                      <input
                        type="text"
                        name="schoolfees5"
                        value={userData.schoolfees5}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        school fees5 for what class ?
                      </label>
                      <input
                        type="text"
                        name="class5"
                        value={userData.class5}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        school fees6(for a particular class and fill in the
                        class below) ?
                      </label>
                      <input
                        type="text"
                        name="schoolfees6"
                        value={userData.schoolfees6}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        school fees6 for what class ?
                      </label>
                      <input
                        type="text"
                        name="class6"
                        value={userData.class6}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        school fees7(for a particular class and fill in the
                        class below) ?
                      </label>
                      <input
                        type="text"
                        name="schoolfees7"
                        value={userData.schoolfees7}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        school fees7 for what class ?
                      </label>
                      <input
                        type="text"
                        name="class7"
                        value={userData.class7}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        any job vacancy in your school(yes/No)
                      </label>
                      <input
                        type="text"
                        name="jobVacancy"
                        value={userData.jobVacancy}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        how many positions are vacant if there is any
                      </label>
                      <input
                        type="number"
                        name="NumberOfVacancy"
                        value={userData.NumberOfVacancy}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        vacant position 1?
                      </label>
                      <input
                        type="text"
                        name="position1"
                        value={userData.position1}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        whats the salary for position 1?
                      </label>
                      <input
                        type="text"
                        name="salary1"
                        value={userData.salary1}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        what qualification are you searching for to fit in
                        position 1?
                      </label>
                      <input
                        type="text"
                        name="qualification1"
                        value={userData.qualification1}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        vacant position 2?
                      </label>
                      <input
                        type="text"
                        name="position2"
                        value={userData.position2}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        whats the salary for position 2?
                      </label>
                      <input
                        type="text"
                        name="salary2"
                        value={userData.salary2}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        what qualification are you searching for to fit in
                        position 2?
                      </label>
                      <input
                        type="text"
                        name="qualification2"
                        value={userData.qualification2}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        vacant position 3?
                      </label>
                      <input
                        type="text"
                        name="position3"
                        value={userData.position3}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        whats the salary for position 3?
                      </label>
                      <input
                        type="text"
                        name="salary3"
                        value={userData.salary3}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        what qualification are you searching for to fit in
                        position 3?
                      </label>
                      <input
                        type="text"
                        name="qualification3"
                        value={userData.qualification3}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        vacant position 4?
                      </label>
                      <input
                        type="text"
                        name="position4"
                        value={userData.position4}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        whats the salary for position 4?
                      </label>
                      <input
                        type="text"
                        name="salary4"
                        value={userData.salary4}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        what qualification are you searching for to fit in
                        position 4?
                      </label>
                      <input
                        type="text"
                        name="qualification4"
                        value={userData.qualification4}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        vacant position 5?
                      </label>
                      <input
                        type="text"
                        name="position5"
                        value={userData.position5}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        whats the salary for position 5?
                      </label>
                      <input
                        type="text"
                        name="salary5"
                        value={userData.salary5}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        what qualification are you searching for to fit in
                        position 5?
                      </label>
                      <input
                        type="text"
                        name="qualification5"
                        value={userData.qualification5}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        vacant position 6?
                      </label>
                      <input
                        type="text"
                        name="position6"
                        value={userData.position6}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        whats the salary for position 6?
                      </label>
                      <input
                        type="text"
                        name="salary6"
                        value={userData.salary6}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        what qualification are you searching for to fit in
                        position 6?
                      </label>
                      <input
                        type="text"
                        name="qualification6"
                        value={userData.qualification6}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        VC or principal speech
                      </label>
                      <textarea
                        type="text"
                        name="vcspeech"
                        value={userData.vcspeech}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        Aims and Objectives
                      </label>
                      <input
                        type="text"
                        name="AO"
                        value={userData.AO}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        School Picture
                      </label>
                      <input
                        type="file"
                        onChange={(e) => handleFileChange(e, "schoolPicture")}
                        className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-gray-100 file:text-gray-700"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        Cover Picture
                      </label>
                      <input
                        type="file"
                        onChange={(e) => handleFileChange(e, "coverPicture")}
                        className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-gray-100 file:text-gray-700"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        Profile Picture
                      </label>
                      <input
                        type="file"
                        onChange={(e) => handleFileChange(e, "Picture")}
                        className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-gray-100 file:text-gray-700"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        Picture
                      </label>
                      <input
                        type="file"
                        onChange={(e) => handleFileChange(e, "picture1")}
                        className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-gray-100 file:text-gray-700"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        Picture
                      </label>
                      <input
                        type="file"
                        onChange={(e) => handleFileChange(e, "picture2")}
                        className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-gray-100 file:text-gray-700"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        Picture
                      </label>
                      <input
                        type="file"
                        onChange={(e) => handleFileChange(e, "picture3")}
                        className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-gray-100 file:text-gray-700"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        Picture
                      </label>
                      <input
                        type="file"
                        onChange={(e) => handleFileChange(e, "picture4")}
                        className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-gray-100 file:text-gray-700"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        Vc/ principal picture
                      </label>
                      <input
                        type="file"
                        onChange={(e) => handleFileChange(e, "vcpicture")}
                        className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-gray-100 file:text-gray-700"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                    >
                      Update Profile
                    </button>
                  </form>
                </div>
              </div>
            )}

            {error && <div className="text-red-500 mt-5">{error}</div>}
            {successMessage && (
              <div className="text-green-500 mt-5">{successMessage}</div>
            )}
          </div>
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

                        <td className="p-4 text-sm flex space-x-2">
                          <Link
                            to={`hrms/details/${emp._id}`}
                            state={{ email: emp.email }}
                          >
                            <button className="text-blue-500">
                              <span className="material-icons">edit</span>
                            </button>
                          </Link>
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

                        <td className="p-4 text-sm flex space-x-2">
                          <Link
                            to={`hrms/details/${emp._id}`}
                            state={{ email: emp.email }}
                          >
                            <button className="text-blue-500">
                              <span className="material-icons">edit</span>
                            </button>
                          </Link>
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
      case "Announcements": 
      return (
        <>
        <div className="flex-col space-x-7 mb-2">
           <button
             className="bg-blue-500 text-white py-2 px-4 rounded"
             onClick={() => handleNoticeModalOpen()}
           >
             post Announcement
           </button>
           </div>
          <div className="text-black">Announcements</div>
         <div className="mt-4 bg-white text-black shadow-md rounded-md">
           <table className="table-auto w-full text-left border-collapse">
             <thead>
               <tr className="border-b">
           
                 <th className="p-4 text-sm text-gray-600">Announcement</th>

                 <th className="p-4 text-sm text-gray-600">Date</th>

             
              
               </tr>
             </thead>
             <tbody>
               {getNotice && getNotice?.length > 0 ? (
                 getNotice.map((emp, index) => (
                   <tr key={index} className="border-b hover:bg-gray-50">
                    

              

                     <td className="p-4 text-sm">{emp.issue}</td>

                     <td className="p-4 text-sm">{new Date(emp.createdAt).toLocaleDateString()}</td>

                  

                 
                   </tr>
                 ))
               ) : (
                 <tr>
                   <td colSpan="5" className="p-4 text-center text-sm">
                     You don't have any notice yet.
                   </td>
                 </tr>
               )}
             </tbody>
           </table>
           {noticeModal && (
     <div className="fixed inset-0 overflow-y-scroll  bg-gray-900 bg-opacity-50 flex justify-center items-center">
       <div className="bg-white p-6 rounded-md shadow-md w-96">

       {successMessage && <p className="text-green-500 mb-2">{successMessage}</p>}
         {error && <p className="text-red-500 mb-2">{error}</p>}
         


         <form onSubmit={postMyNotice}>

     

    

           <label className="block mt-2 mb-2">Announcements</label>
           <input type="text" name="issue" className="w-full p-2 border rounded-md" onChange={handleNoticeInput} />

           <button type="submit" className="w-full bg-green-500 text-white py-2 mt-4 rounded-md hover:bg-green-700">
             {loading ? "Submitting..." : "Submit"}
           </button>
           <button onClick={handleNoticeModalClose} className="w-full bg-red-500 text-white py-2 mt-2 rounded-md hover:bg-red-700">
             Cancel
           </button>
         </form>
       </div>
     </div>
   )}
         </div>

       </>
      )
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

                        <td className="p-4 text-sm flex space-x-2">
                          <Link
                            to={`hrms/details/${emp._id}`}
                            state={{ email: emp.email }}
                          >
                            <button className="text-blue-500">
                              <span className="material-icons">edit</span>
                            </button>
                          </Link>
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
            <button
              className="bg-green-500 text-white py-2 px-4 rounded"
              onClick={() => handleShowClassModal()}
            >
              Add a class
            </button>

            {showClassModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 animate-fade-in">
                <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md max-h-[90vh] overflow-y-auto">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
                    Add a class
                  </h2>

                  {/* Success & Error Messages */}
                  {successMessage && (
                    <p className="text-green-600 bg-green-100 p-2 rounded-md text-center mb-2">
                      {successMessage}
                    </p>
                  )}
                  {error && (
                    <p className="text-red-600 bg-red-100 p-2 rounded-md text-center mb-2">
                      {error}
                    </p>
                  )}

                  <form onSubmit={handlePostMyClass} className="space-y-4">
                    {/* Input Field */}
                    <div>
                      <label className="block text-gray-700 font-medium">
                        Class Name
                      </label>
                      <input
                        type="text"
                        placeholder="Enter class name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="flex-col space-x-2 space-y-2">
                      <button
                        type="submit"
                        className="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-lg font-semibold transition duration-300"
                      >
                        Create a class
                      </button>
                      <button
                        type="submit"
                        onClick={handleCloseClassModal}
                        className="w-full bg-gray-500 hover:bg-gray-600 text-white py-3 px-4 rounded-lg font-semibold transition duration-300"
                      >
                        cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

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
                          </tr>
                        ))}
                      </>
                    )
                  )}

     
                </tbody>
              </table>
            </div>
          </>
        );
      case "Subjects":
        return <>
           <>
            <button
              className="bg-green-500 text-white py-2 px-4 rounded"
              onClick={() => handlePopupForSubject()}
            >
              Add a subject
            </button>

            {showModalPopupForSubject && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 animate-fade-in">
                <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md max-h-[90vh] overflow-y-auto">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
                    Add a Subject
                  </h2>

                  {/* Success & Error Messages */}
                  {successMessage && (
                    <p className="text-green-600 bg-green-100 p-2 rounded-md text-center mb-2">
                      {successMessage}
                    </p>
                  )}
                  {error && (
                    <p className="text-red-600 bg-red-100 p-2 rounded-md text-center mb-2">
                      {error}
                    </p>
                  )}

                  <form onSubmit={handlepostMySubject} className="space-y-4">
                    {/* Input Field */}
                    <div>
                      <label className="block text-gray-700 font-medium">
                        subject Name
                      </label>
                      <input
                        type="text"
                        name= "name"
                        placeholder="Enter class name"
                        value={postMySubject.name}
                        onChange={handleInputForSubject}
                        required
                        className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="mb-4">
                        <label className="block mb-1">Class</label>
                        <select
                          name="classes"
                          value={postMySubject.classes}
                          onChange={handleInputForSubject}
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

                    <div className="flex-col space-x-2 space-y-2">
                      <button
                        type="submit"
                        className="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-lg font-semibold transition duration-300"
                      >
                        Create a Subject
                      </button>
                      <button
                        type="submit"
                        onClick={handleCloseSubjectPopup}
                        className="w-full bg-gray-500 hover:bg-gray-600 text-white py-3 px-4 rounded-lg font-semibold transition duration-300"
                      >
                        cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

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
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen mt-5 bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 bg-white shadow-lg w-64 p-5 transition-transform transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:static`}
      >
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-bold text-green-600">Dashboard</h2>
          <h2 className="text-xl  text-green-600">{user.school?.schoolName}</h2>
        </div>
        <nav>
          {sidebarItems.map((item, index) => (
            <button
              key={index}
              className={`flex items-center gap-3 block w-full text-left py-2 px-4 rounded-lg ${
                activeSection === item.name
                  ? "bg-green-600 text-white"
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
        <button className="lg:hidden" onClick={toggleSidebar}>
          X
        </button>
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

export default Dashboard;
