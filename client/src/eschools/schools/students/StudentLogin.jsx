import { useState } from "react";
import axios from "axios";
import  toast  from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

import im from "../../../assets/eschools.png";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

const StudentLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
   
  });
  const [error, setError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
   

    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_3}/loginusers`,
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const token = response.data.token; 
      localStorage.setItem("token", token);
      toast.success("Login successful!");
      navigate("/studentdashboard")
    } catch (err) {
      console.error(err);
      toast.error("Login failed");
      setError(err.response?.data?.message || "login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <form
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm"
        onSubmit={handleSubmit}
      >
            <h4 className="text-green-500 font-semibold">You can only login if your school admin has created an account for you</h4>
        <div className="flex justify-center mb-0">
          <img src={im} alt="logo" className="rounded-full w-20" />
        </div>

        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Login as a Student
        </h2>

        {error && (
          <div className="text-red-500 mb-4 text-center font-semibold">
            {error}
          </div>
        )}

       
        <input
          type="email"
          placeholder="email"
          name="email"
          onChange={handleInputChange}
          className="w-full px-4 py-3 mb-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
        />
        <div>
          <input
            type={passwordVisible ? "text" : "password"}
            placeholder="Password"
            name="password"
            onChange={handleInputChange}
            disabled={loading}
            className="w-full px-4 py-3 mb-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
          />
          <div
            className="absolute top-3 right-3 text-gray-400 cursor-pointer"
            onClick={() => setPasswordVisible(!passwordVisible)}
          >
            {passwordVisible ? <FaEyeSlash /> : <FaEye />}
          </div>
        </div>

      

        <button
          type="submit"
          className={`w-full py-3 rounded-lg text-white font-semibold transition-all ${
            loading
              ? "bg-green-300 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
          disabled={loading}
        >
          {loading ? (
            <div className="flex justify-center items-center">
              <span className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin"></span>
            </div>
          ) : (
            "Login"
          )}
        </button>

      
      </form>
    </div>
  );
};

export default StudentLogin;
