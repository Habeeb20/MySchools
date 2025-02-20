import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import im from "../../assets/eschools.png"
import { FaLock, FaEnvelope, FaEye, FaEyeSlash, FaRobot } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
const Signup = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    role:"",
    email:"",
    password:"",
  })
  const [role, setRole] = useState("");
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await axios.post(`${import.meta.env.VITE_API_1}/signup`,formData);
      toast.success("Registration successful!");
      navigate("/verifyEmail");
    } catch (err) {
      toast.error("Registration failed");
      console.log(err);
      setError(err.response?.data?.message || "Registration failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br ">
     

      <form
        className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-sm md:max-w-md lg:max-w-lg"
        onSubmit={handleSubmit}
      >
      <div className="flex justify-center mb-0">
        <img src={im} alt="logo" className="rounded-full w-20" />
      </div>
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">
          Create an Account
        </h2>
        {error && (
          <div className="text-red-500 mb-4 text-center font-semibold">
            {error}
          </div>
        )}
        <select
          name="role"
          onChange={handleInputChange}
          className="w-full px-4 py-3 mb-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
        >
          <option value="" disabled="true" selected="true">
            select a role
          </option>
          <option value="school-administrator">school administrator</option>
          <option value="store-owner">store owner</option>
          <option value="tutorial-center">tutorial center</option>
        </select>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
         
          </label>
          <input
            type="email"
            placeholder="email"
            name="email"
onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none transition-all duration-300"
          />
        </div>
        <div className="mb-4">
        
          <input
            type="password"
            placeholder="Enter password"
            name="password"
onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none transition-all duration-300"
          />
        </div>
        <div className="flex justify-between text-sm text-gray-600 mb-6">
         
          <Link to="/login" className="hover:text-green-600">
            Already have an account? Login
          </Link>
        </div>
        <button
          type="submit"
          className={`w-full py-2 rounded-lg text-white font-semibold shadow-md transition-all duration-300 ${
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
            "Register"
          )}
        </button>
      </form>
    </div>
  );
};

export default Signup;
