import { useState } from "react";
import axios from "axios";
import  toast  from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import im from "../../assets/eschools.png";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "",
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
    
   
    if (!formData.role) {
      return toast.error("You haven't selected a role");
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_1}/login`,
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const token = response.data.token; 
      localStorage.setItem("token", token);
      toast.success("Login successful!");

      // Navigate based on role
      switch (formData.role) {
        case "school-administrator":
          navigate("/dashboard");
          break;
        case "store-owner":
          navigate("/storedashboard");
          break;
        case "tutorial-center":
          navigate("/tutorial-dashboard");
          break;
        default:
          navigate("/");
      }
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
        <div className="flex justify-center mb-0">
          <img src={im} alt="logo" className="rounded-full w-20" />
        </div>

        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Login
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

        <div className="flex justify-between items-center mb-6">
          <Link
            to="/forgotpassword"
            className="text-green-600 text-sm hover:underline"
          >
            Forgot Password?
          </Link>
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

        <p className="text-center text-gray-600 mt-4">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-green-600 font-semibold hover:underline"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
