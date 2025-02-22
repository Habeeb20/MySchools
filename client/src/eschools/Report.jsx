import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AiOutlineLoading3Quarters } from 'react-icons/ai';


import React from 'react'

const Report = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        nameOfReporter: '',
        emailOfReporter: '',
        phonenum: '',
        school:"",
        emailOfReported: "",
        offense: '',
    });

    const [error, setError]= useState('');
    const [isLoading, setIsLoading]= useState(false);

    const handleChange = (event) => {
        const{name, value} = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleSubmit= async(event) => {
        event.preventDefault();
        setIsLoading(true);

        try {
            const form = new FormData();
            for (const key in formData) {
                form.append(key, formData[key]);
            }

            form.forEach((value, key)=>{
                console.log(`${key}: ${value}`)
            })

            const {data}  = await axios.post(`${import.meta.env.VITE_API_5}/postreport`, form, {
                headers:{ 'Content-Type': 'application/json'},
            })

            if(data) {
                navigate("/");
                toast.success('successfully reported')
            }
        } catch (error) {
            const message = error.response?.data?.message || "an error occurred during the submission of the report"
            setError(message);
            console.log(error)
            toast.error(message);

        }finally{
            setIsLoading(false)
        }
    }

  return (
    <div>
       <div className="min-h-screen bg-white flex flex-col items-center mt-0">
            <header className="w-full bg-black shadow-md"></header>

            <div className="flex flex-col items-center w-full py-5 px-4 lg:px-48">
                <h1 className="text-3xl font-bold text-black mb-4 mt-7">Report</h1>
                <p className="text-center text-black mb-10">
                    Report any indecent activity directly to the admin and we would perform necessary investigation
                </p>
                {error && <p className="text-red-500 text-center">{error}</p>}

                <form onSubmit={handleSubmit} className="w-full bg-white shadow-lg p-8 rounded-lg space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className=" text-xl block text-black">Name Of Reporter</label>
                            <input 
                                type="text" 
                                name="nameOfReporter" 
                                className="w-full p-2 border border-gray-300 rounded"  
                                onChange={handleChange} 
                            />
                        </div>

                        <div>
                            <label className="text-xl block text-black">Email of Reporter</label>
                            <input 
                                type="email" 
                                name="emailOfReporter" 
                                value={formData.emailOfReporter} 
                                onChange={handleChange} 
                                className="w-full p-2 border border-gray-300 rounded" 
                            />
                        </div>

                        <div>
                            <label className="text-xl block text-black">Phone Number of Reporter</label>
                            <input 
                                type="number" 
                                name="phonenum" 
                                value={formData.phonenum} 
                                onChange={handleChange} 
                                className="w-full p-2 border border-gray-300 rounded" 
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   

                        <div>
                            <label className=" text-xl block text-black">Name of School to be Reported</label>
                            <input 
                                type="text" 
                                name="school" 
                                value={formData.school} 
                                onChange={handleChange} 
                                className="w-full p-2 border border-gray-300 rounded" 
                            />
                        </div>

                        <div>
                            <label className="text-xl block text-black">Email of the school to be Reported</label>
                            <input 
                                type="email" 
                                name="emailOfReported" 
                                value={formData.emailOfReported} 
                                onChange={handleChange} 
                                className="w-full p-2 border border-gray-300 rounded" 
                            />
                        </div>
                    </div>

                    <div>
                        <label className="text-xl block text-black">Report or Proof of Offense</label>
                        <textarea 
                            name="offense" 
                            value={formData.offense} 
                            onChange={handleChange} 
                            className="w-full p-2 border border-gray-300 rounded h-32"
                        />
                    </div>

                    <div className="flex justify-between items-center">
                        <motion.button
                            className="bg-green-900 text-white px-6 py-2 rounded-lg hover:from-blue-800 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            disabled={isLoading}
                        >
                            {isLoading ? <AiOutlineLoading3Quarters className="animate-spin mx-auto" size={24} /> : "Send"}
                        </motion.button>
                    </div>
                </form>
            </div>
        </div>
      
    </div>
  )
}

export default Report
