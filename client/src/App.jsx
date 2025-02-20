import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom'

import './App.css'
// import Dashboard from './pages/schools/Dashboard'
// import Register from './pages/schools/Register'
// import Login from './pages/schools/Login'
import Navbar from './component/Navbar'
// import Home from './pages/landingpage/Home'
// import Request from './pages/landingpage/Request'
// import Report from './pages/landingpage/Report'
// import AschoolDetails from './pages/landingpage/AschoolDetails'
// import CategoryPage from './component/landingPage/CategoryPage'
// import LocationPage from './component/landingPage/LocationPage'
// import SchoolsHomePage from './pages/SchoolsHompage/SchoolsHomePage'
// import Footer from './component/Footer'
// import SchoolsDetails from './pages/SchoolsHompage/SchoolsDetails'
// import ExamDashboard from './pages/exam/ExamDashboard'
// import ExamLogin from './pages/exam/ExamLogin'
// import ExamRegister from './pages/exam/ExamRegister'
// import ExamDetails from './pages/ExamHomPage/ExamDetails'
// import ExamHomepage from './pages/ExamHomPage/ExamHomepage'
// import TeacherLogin from './pages/teachers/TeacherLogin'
// import TeacherRegister from './pages/teachers/TeacherRegister'
// import TeacherDashboard from './pages/teachers/TeacherDashboard'
// import TeacherHomepage from './pages/teacherHomePage/TeacherHomepage'
// import TeacherDetails from './pages/teacherHomePage/TeacherDetails'
// import TrainingLogin from './pages/training/TrainingLogin'
// import TrainingRegister from './pages/training/TrainingRegister'
// import TrainingDashboard from './pages/training/TrainingDashboard'
// import TrainingHomePage from './pages/trainingHomepage/TrainingHomePage'
// import TrainingDetails from './pages/trainingHomepage/TrainingDetails'
// import DataInState from './component/landingPage/DataInState'
// import BookLogin from './pages/Book/BookLogin'
// import BookRegister from './pages/Book/BookRegister'
// import BookDashboard from './pages/Book/BookDashboard'
// import StoreDashboard from './pages/store/StoreDashboard'
// import StoreLogin from './pages/store/StoreLogin'
// import StoreRegister from './pages/store/StoreRegister'
// import StoreHomepage from './pages/storeHomepage/StoreHomepage'
// import StoreDetails from './pages/storeHomepage/StoreDetails'
// import TutorialHomePage from './pages/tutorialHomepage/TutorialHomePage'
// import TutorialLogin from './pages/tutorial/TutorialLogin'
// import TutorialRegister from "./pages/tutorial/TutorialRegister"
// import TutorialDashboard from './pages/tutorial/TutorialDashboard'
// import TutorialDetails from './pages/tutorialHomepage/TutorialDetails'
// import Comparison from './pages/Admission/Comparison'

// import Admission from './pages/Admission/Admission'
// import LoginJob from './pages/Ejobs/LoginJob'
// import RegisterJob from './pages/Ejobs/RegisterJob'
// import EmployerDashboard from './pages/Ejobs/EmployerDashboard'
// import JobSeekerDashboard from './pages/Ejobs/JobSeeker'
// import EjobsLandingPage from './pages/Ejobs/EjobsLandingPage'
import Scholarship from './pages/Scholarship'
// import BookHomePage from './pages/BookHompeage/BookHomePage'
// import BookDetails from './pages/BookHompeage/BookDetails'
// import CategoryDisplay from './component/landingPage/CategoryDisplay'
import AdminLogin from './pages/Admin/AdminLogin'
import AdminRegister from './pages/Admin/AdminSignup'
import AdminDashboard from './pages/Admin/AdminDashboard'
import AllBooks from './pages/Admin/AllBooks'
import AllSchools from './pages/Admin/AllSchools'
import AllTeacher from './pages/Admin/AllTeacher'
import AllTutorial from './pages/Admin/AllTutorial'
import AllTraining from './pages/Admin/AllTraining'
import AllExam from './pages/Admin/AllExam'
// 
// import PaymentPage from './pages/PaystackPayment/PaymentPage'
// import ProtectedRoute from './ProtectedRoute'
// import SchForgotPassword from './pages/schools/SchForgotPassword'
// import SchResetPassword from './pages/schools/SchResetPassword'
// import MakePayment from './pages/PaystackPayment/MakePayment'
// import PaymentSuccess from './pages/PaystackPayment/PaymentSuccess'




import EschoolsLogin from "./eschools/users/Login"
import EschoolsSignup from "./eschools/users/Signup"
import EschoolsVerifyPayment from "./eschools/users/VerifyPayment"
import EschoolsMakePayment from "./eschools/users/MakePayment"
import EschoolsPayment from "./eschools/users/PaymentFailed"
import EschoolsForgotPassword from "./eschools/users/ForgotPassword"
import EschoolsResetPassword from "./eschools/users/ResetPasssword"
import VerifyEmail from './eschools/users/VerifyEmail'
import EschoolDashboard from "./eschools/users/Dashboard"
import Onboarding from './eschools/schools/Onboarding'
import StudentLogin from './eschools/schools/students/StudentLogin'
import TeacherLogin from './eschools/schools/teacher/TeacherLogin'
import EschoolTeacherDashboard from "./eschools/schools/teacher/TeacherDashboard"
import StudentDashboard from './eschools/schools/students/StudentDashboard'
const AppLayout = ({ children }) => {
  const location = useLocation();

  // Define the paths where the footer should not be shown
  const noFooterRoutes = ["/admin", "/admin/books", "/admin/teachers", "/admin/tutorial", "/admin/training", "/admin/exam", "/adminlogin", "/adminregister", "/admin/schools", "/schoolsdashboard"  ];

  const showFooter = !noFooterRoutes.includes(location.pathname);

  return (
    <div className="app-container">
      <div className="content">{children}</div>
      {showFooter }
    </div>
  );
};
function App() {


  return (
    <>
    {/* <PaymentProvider> */}
    <Router>
    <Navbar />
    <AppLayout>
    <Routes>
      {/* <Route path="/" element={<Home />} /> */}
     
   
      {/* <Route path="/schoolsregister" element={<Register />} />
      <Route path="/schoolslogin" element={<Login />} />
      <Route path="/schoolsdashboard" element={<Dashboard />} />
      <Route path="/schforgotpassword" element={<SchForgotPassword />} />
      <Route path="/schresetpassword" element={ <SchResetPassword />} />
      <Route path="/schooldetail/:id" element={<AschoolDetails />} />
   
      <Route path="/paymentverification" element={<PaymentSuccess />} />

      <Route path="/category/:category" element={<CategoryPage />} />
      <Route path="/:category/:id"  element={<CategoryDisplay />} />
      <Route path="/state/:state" element={<LocationPage />} />
      <Route path="/data/:location" element={<DataInState />} />
   

      <Route path="/request" element={<Request />} />
      <Route path="/report" element={<Report />}  />



      <Route path="/schoolshomepage" element={<SchoolsHomePage/>} />
      <Route path="/schools/:id" element={<SchoolsDetails />} />


      <Route path="/examdashboard" element={<ExamDashboard />} />
      
      <Route path="/examlogin" element={<ExamLogin />} />
      
      <Route path="/examregister" element={<ExamRegister />} />
      
      <Route path="/exam/:id" element={<ExamDetails />} />
      
      <Route path="/examhomepage" element={<ExamHomepage />} />



      <Route path="/teacherlogin" element={<TeacherLogin />} />
      <Route path="/teacherregister" element={<TeacherRegister />} />
  
      <Route path="/teacherhomepage" element={<TeacherHomepage />} />
      <Route path="/teacher/:id" element={<TeacherDetails />} />

       <Route path="/traininglogin" element={<TrainingLogin />} />
       <Route path="/trainingregister" element={<TrainingRegister />} />
       <Route path="/trainingdashboard" element={<TrainingDashboard />} />
       <Route path="/traininghomepage" element={<TrainingHomePage />} />
       <Route path="/training/:id" element={<TrainingDetails />} />


       <Route path="/bookshoplogin" element={<BookLogin />} />
       <Route path="/bookshopregister" element={<BookRegister />} />
       <Route path="/bookshopdashboard" element={<BookDashboard />} />
       <Route path="/bookshophomepage" element={<BookHomePage />} />
       <Route path="/bookshop/:id" element={<BookDetails />} />

       <Route path="/storedashboard" element={<StoreDashboard />} />
       <Route path="/storelogin" element={<StoreLogin />} />
       <Route path="/storeregister" element={<StoreRegister />} />
       <Route path="/storehomepage" element={<StoreHomepage />} />
       <Route path="/store/:id" element={<StoreDetails />} />


       <Route path="/tutorialhomepage" element={<TutorialHomePage />} />
        <Route path="/tutoriallogin" element={<TutorialLogin />} />
        <Route path="/tutorialregister" element={<TutorialRegister />} />
        <Route path="/tutorialdashboard" element={<TutorialDashboard />} />
        <Route path="/tutorial/:id" element={<TutorialDetails />}/>



        <Route path="/admission" element={<Admission />} />
        <Route path="/comparison" element={<Comparison />} />

        <Route path="/joblogin" element={<LoginJob />} />
        <Route path="/jobregister" element={<RegisterJob />} />
        <Route path="/employerdashboard" element={<EmployerDashboard />} />
        <Route path="/jobseekerdashboard" element={<JobSeekerDashboard />} />

        <Route path="/joblandingpage" element={<EjobsLandingPage />} />
 */}

        <Route path="/scholarship" element={<Scholarship />} />

        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/adminregister" element={<AdminRegister />} />
        <Route path="/admin" element={<AdminDashboard />} />

        <Route path="/admin/books" element={<AllBooks />} />
        <Route path="/admin/schools" element={<AllSchools />} />
        <Route path="/admin/teachers" element={<AllTeacher />} />
        <Route path="/admin/tutorial" element={<AllTutorial />} />
        <Route path="/admin/training" element={<AllTraining />} />
        <Route path="/admin/exam" element={<AllExam />} />


        //eschools
        <Route path="/login" element={<EschoolsLogin />} />
        <Route path="/signup" element={<EschoolsSignup />} />
        <Route path="/forgotpassword" element={<EschoolsForgotPassword />} />
        <Route path="/resetpassword" element={<EschoolsResetPassword />} />
        <Route path="/makepayment" element={<EschoolsMakePayment />} />
        <Route path="/verifypayment" element={<EschoolsVerifyPayment />} />
        <Route path="/payment-failed" element={<EschoolsPayment />} />
        <Route path="/verifyemail" element={<VerifyEmail />}/>
        <Route path="/dashboard" element={<EschoolDashboard />} />
        <Route path="/onboarding" element={<Onboarding />} />

        <Route path="/studentlogin" element={<StudentLogin />} />
        <Route path="/teacherlogin" element={<TeacherLogin />} />
        <Route path="/teacherdashboard" element={<EschoolTeacherDashboard />} />
        <Route path="/studentdashboard" element={<StudentDashboard />} />
      </Routes>




    </AppLayout>
      
  
    
 
    </Router>
    {/* </PaymentProvider> */}
    

    
  
    </>
  )
}

export default App
