import { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import SlidingText3 from "./SlidingText3";
const StoreDashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate()
  const [activeSection, setActiveSection] = useState("Profile");
  const [userData, setUserData] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [getMyStore, setGetMyStore] = useState("")
  const [storeNameModal, setStoreNameModal] = useState(false)
  const [storeProfileModal, setStoreProfileModal] = useState(false)
  const [storeName, setStoreName] = useState([])
  const [successMessage,setSuccessMessage] = useState("")
  const [userId, setUserId] = useState('')
  const [loading,setLoading] = useState(false)
  const [userProfile, setUserProfile] = useState({
     
        phone:'',
        state:'',
        LGA:'',
        location:'',
        category:'',
        picture1: '',
        picture2:'',
        picture3: '',
        picture4:'',
        picture5:'',
        picture6:'',
        picture7:'',
  })


  const menuItems = [
    "Profile",
    "Feed",
   
    "Photos",
  
    "Edit_Profile",
  ];


useEffect(() => {
    const token = localStorage.getItem("token")
    if(!token){
      navigate("/login")
    }
}, [])
//get my dashboard data
  useEffect(() => {
    const getMyDashboard = async () => {
        const token = localStorage.getItem("token");
        if(!token){
            setError("token not found")
            navigate("/login")
        }
      try {
      
        const response = await axios.get(`${import.meta.env.VITE_API_S}/dashboard`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserData(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
        setError(error?.response?.data?.message);
      }
    };
    getMyDashboard();
  }, []);


  //submit the store name
  
  const SubmitStoreName = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        `${import.meta.env.VITE_API_S}/poststoredata`,
        { storeName },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSuccessMessage("store name saved successfully!");

      setTimeout(() => {
        navigate("/storedashboard");
      });
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  //get my store details
  const getMyStoreData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${import.meta.env.VITE_API_S}/getstoredata`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setGetMyStore(response.data);
      setUserId(response.data._id);
      console.log(response.data);
    } catch (error) {
      console.log(error);
      setError(error?.response?.data?.message);
    }
  };
  

  useEffect(() => {
    getMyStoreData();
  }, []);
  

  useEffect(() => {
    if (storeProfileModal) {
      getMyStoreData();
    }
  }, [storeProfileModal]);
  
  //handle store forms and edit profile
  const handleOpenStoreNameModal = () => {
    setStoreNameModal(true)
  }
  const handleCloseStoreNameModal = () => {
    setStoreNameModal(false)
  }

  const handleOpenStoreProfileModal = () => {
    setStoreProfileModal(true)
  }
  const handleCloseStoreProfileModal = () => {
    setStoreProfileModal(false)
  }


  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`Changing ${name} to ${value}`);
    setUserProfile((prevData) => ({ ...prevData, [name]: value }));
  };
  
  ///update profile details
     
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `${import.meta.env.VITE_API_S}/${userId}`,
        userProfile,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("profile successfully updated")
      setSuccessMessage('Profile updated successfully!');

 
    
    } catch (err) {
      toast.error("failed to update profile")
      console.log(err)
      setError('Failed to update profile.');
    } finally{
        setLoading(false)
    }
  };


  const handleFileChange = async (e, field) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await axios.post('https://api.cloudinary.com/v1_1/dc0poqt9l/image/upload', formData, {
        params: {
          upload_preset: 'essential',
        },
      });
      setUserProfile((prevData) => ({
        ...prevData,
        [field]: response.data.secure_url, 
      }));
    } catch (err) {
      console.error('Error uploading file to Cloudinary', err);
    }
  };



  

  const sections = {
    Profile: (
      <div>
        <h2 className="text-xl font-semibold text-black">{userData.email}</h2>
        <p className="text-black">Lead Graphic Designer with a passion for digital art.</p>
      </div>
    ),
    Feed: (
      <div>
        <h2 className="text-xl font-semibold text-black">Latest Posts</h2>
        <div className="grid grid-cols-2 gap-4">
          <img src="https://source.unsplash.com/300x300/?portrait" alt="Post" className="rounded-md" />
          <img src="https://source.unsplash.com/300x300/?people" alt="Post" className="rounded-md" />
        </div>
      </div>
    ),
    Photos: (
        <div className="p-4 mt-10 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Photo Gallery</h2>
      
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {Array.from({ length: 7 }).map((_, index) => {
            const pictureKey = `picture${index + 1}`;
            return (
              getMyStore[pictureKey] && (
                <div key={index} className="relative group overflow-hidden rounded-lg shadow-lg">
                  <img
                    src={getMyStore[pictureKey]}
                    alt={`Picture ${index + 1}`}
                    className="w-full h-40 object-cover rounded-lg transition-transform duration-300 ease-in-out group-hover:scale-105"
                  />
                </div>
              )
            );
          })}
        </div>
      </div>
      
    ),
    Edit_Profile: (
        <div>
           {error && <div className="text-red-500 text-2xl font-semibold mt-5">{error}</div>}
            {successMessage && (
              <div className="text-green-500 text-2xl font-semibold mt-5">{successMessage}</div>
            )}
            <div className="flex-col-3 space-x-3">
              <button
                onClick={handleOpenStoreNameModal}
                className="mt-6 py-3 px-6 bg-green-600 text-white rounded-lg hover:bg-green-500 w-15"
              >
                Add store Name
              </button>
              <button
                onClick={handleOpenStoreProfileModal}
                className="mt-5 py-3 px-6 bg-green-600 text-white rounded-lg hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-indigo-300"
              >
                Edit Profile
              </button>
              {storeNameModal && (
              <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 px-4">
                <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                  <h2 className="text-xl font-semibold text-gray-800 text-center mb-4">
                    Welcome! Please Enter Your Store Name
                  </h2>

                  {successMessage && (
                    <p className="bg-green-100 text-green-700">
                      {successMessage}
                    </p>
                  )}
                  {error && <p className="bg-red-100 text-red-700">{error}</p>}
                  <form onSubmit={SubmitStoreName} className="space-y-4">
                    <input
                      type="text"
                      value={storeName}
                      onChange={(e) => setStoreName(e.target.value)}
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
                      onClick={handleCloseStoreNameModal}
                      type="submit"
                    >
                      cancel
                    </button>
                  </form>
                </div>
              </div>
            )}

            {storeProfileModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xl max-h-[90vh] overflow-y-auto">
          {successMessage && <p className="text-green-600 text-center">{successMessage}</p>}
          {error && <p className="text-red-600 text-center">{error}</p>}
            <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">Update Your Profile</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
         
     
    
              {/* New input fields */}
           
    
           
              <div className="flex flex-col">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  phone number
                </label>
                <input
                  type="text"
                  name="phone"
                  value={userProfile.phone || ""}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="flex flex-col">
                <label className="block text-sm font-medium text-gray-600 mb-1">
               Address
                </label>
                <input
                  type="text"
                  name="location"
                  value={userProfile.location || ""}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
          

              <div className="flex flex-col">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                 category(market or store)
                </label>
                <input
                  type="text"
                  name="category"
                  value={userProfile.category || ""}
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
                  value={userProfile.state || ""}
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
                  value={userProfile.LGA || ""}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                  Picture
                </label>
                <input
                  type="file"
                  onChange={(e) => handleFileChange(e, "picture5")}
                  className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-gray-100 file:text-gray-700"
                />
              </div>
              <div className="flex flex-col">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Picture
                </label>
                <input
                  type="file"
                  onChange={(e) => handleFileChange(e, "picture6")}
                  className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-gray-100 file:text-gray-700"
                />
              </div>
              <div className="flex flex-col">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Picture
                </label>
                <input
                  type="file"
                  onChange={(e) => handleFileChange(e, "picture7")}
                  className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-gray-100 file:text-gray-700"
                />
              </div>

         
    
          <div className="flex-col space-y-2">
          <button
      type="submit"
      className="w-full py-3 px-4 bg-green-600 text-white rounded-lg flex items-center justify-center hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-indigo-300"
 
      disabled={loading}
    >
      {loading ? (
        <>
          <svg
            className="animate-spin h-5 w-5 mr-2 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
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
          Updating...
        </>
      ) : (
        "Update Profile"
      )}
    </button>
              <button
                type="submit"
                onClick={handleCloseStoreProfileModal}
                className="w-full py-3 px-4 bg-red-600 text-white rounded-lg hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-indigo-300"
              >
                cancel
              </button>
          </div>
            </form>
          </div>
        </div>
      )}

      <div className="bg-gray-100 rounded-lg shadow-md p-4 mb-6 w-full text-center">
 
    <p className="text-lg text-gray-800 mb-2">
      <span className="font-bold">Store Name:</span> {getMyStore.storeName}
    </p>
    <p className="text-lg text-gray-800 mb-2">
      <span className="font-bold">Email:</span> {userData.email}
    </p>
    <p className="text-lg text-gray-800 mb-2">
      <span className="font-bold">Phone:</span> {getMyStore.phone}
    </p>
    <p className="text-lg text-gray-800 mb-2">
      <span className="font-bold">Address:</span> {getMyStore.location}
    </p>
    <p className="text-lg text-gray-800 mb-2">
      <span className="font-bold">LGA:</span> {getMyStore.LGA}
    </p>
    <p className="text-lg text-gray-800">
      <span className="font-bold">State:</span> {getMyStore.state}
    </p>
  </div>
    

          
            </div>

        </div>
      ),
  };

  return (
    <div className="flex bg-gray-200 min-h-screen">
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
        <h2 className="text-2xl font-bold p-4">Store Dashboard</h2>
        <ul className="space-y-4 px-4">
          {menuItems.map((item, index) => (
            <li
              key={index}
              onClick={() => {
                setActiveSection(item);
                setIsOpen(false);
              }}
              className="cursor-pointer p-3 bg-green-800 hover:bg-green-600 rounded-md transition-all"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>

   {/* Main Content */}
<div className={`flex-1 transition-all ${isOpen ? "ml-64 opacity-20" : "ml-0 opacity-none"} md:ml-64`}>

        {/* Profile Header */}
        <div className="relative">
          {/* Cover Image */}
          <div
            className="h-48 bg-cover bg-center"
            style={{ backgroundImage: `url('https://source.unsplash.com/random/800x300?landscape')` }}
          ></div>

          {/* Profile Info */}
          <div className="absolute bottom-0 left-6 transform translate-y-1/2 flex items-center space-x-4">
            <img
              src={getMyStore.picture1 || getMyStore.picture2 || getMyStore.picture3 || getMyStore.picture4 || getMyStore.picture5 || getMyStore.picture6 || "https://source.unsplash.com/100x100/?face"}
              alt="Profile"
              className="w-24 h-24 rounded-full border-4 border-black"
            />
            <div>
            <SlidingText3 />
              <h1 className="text-2xl font-bold text-black">{userData.email}</h1>
              <p className="text-black">Store Name:  {getMyStore.storeName}</p>
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <div className="p-6">{sections[activeSection] || <p className="text-black">Select an option</p>}</div>
      </div>
    </div>
  );
};

export default StoreDashboard;
