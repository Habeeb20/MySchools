import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom'

import './App.css'

import Navbar from './component/Navbar'

import Scholarship from './pages/Scholarship'

import AdminLogin from './pages/Admin/AdminLogin'
import AdminRegister from './pages/Admin/AdminSignup'
import AdminDashboard from './pages/Admin/AdminDashboard'
import AllBooks from './pages/Admin/AllBooks'
import AllSchools from './pages/Admin/AllSchools'
import AllTeacher from './pages/Admin/AllTeacher'
import AllTutorial from './pages/Admin/AllTutorial'
import AllTraining from './pages/Admin/AllTraining'
import AllExam from './pages/Admin/AllExam'



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
import Home from './eschools/LandingPage/Home'
import Report from './eschools/Report'
import RequestForm from './eschools/RequestForm'
import SchoolsHomePage from './eschools/schools/SchoolsHomePage'
import SchoolsDetails from './eschools/schools/SchoolsDetails'
import ChooseLogin from './eschools/schools/ChooseLogin'
import StoreDashboard from './eschools/store/StoreDashboard'
import StoreHomePage from './eschools/store/StoreHomePage'
import StoreDetails from './eschools/store/StoreDetails'
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
        <Route path="/schoolshomepage" element={<SchoolsHomePage />} />
        <Route path="/chooselogin" element={<ChooseLogin />} />
        <Route path="/schools/:slug" element={<SchoolsDetails />} />
        <Route path="/" element={<Home />} />
        <Route path="/report" element={<Report />} />
        <Route path="/request" element={<RequestForm />} />
       

        <Route path="/storedashboard" element={<StoreDashboard />} />
         <Route path="/storehomepage" element={<StoreHomePage />} />
         <Route path="/store/:slug"  element={<StoreDetails />} />
      </Routes>




    </AppLayout>
      
  
    
 
    </Router>
    {/* </PaymentProvider> */}
    

    
  
    </>
  )
}

export default App
