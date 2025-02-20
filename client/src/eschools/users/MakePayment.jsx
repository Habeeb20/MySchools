import React from 'react'
import im from "../../assets/eschools.png";
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { motion } from "framer-motion";

const MakePayment = () => {
    const location = useLocation();
    const [email, setEmail] = useState("");
    const [amount, setAmount] = useState(100000);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user?.email) {
          setEmail(user.email);
          console.log("User email:", user.email);
        }
    
        if (location.state?.amount) {
          setAmount(location.state.amount);
        }
      }, [location.state]);


      const handlePayment = async (e) => {
        e.preventDefault(); // Prevent form submission
        setIsLoading(true);
        try {
          const response = await axios.post(
            `${import.meta.env.VITE_API_2}/paystack/pay`,
            { email, amount }
          );
    
          console.log("Paystack response:", response.data);
    
          if (response.data?.authorization_url) {
            window.location.href = response.data.authorization_url;
          } else {
            console.error("Authorization URL is missing.");
          }
        } catch (error) {
          console.error("Payment initiation failed", error);
          setError("Payment initiation failed. Please try again.");
        } finally {
          setIsLoading(false);
        }
      };
    
    
  return (
    <div>
            <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
    <div className="w-full max-w-xs mx-auto ">
      <div className="flex justify-center mb-0">
        <img src={im} alt="logo" className="rounded-full w-20" />
      </div>


      <form onSubmit={handlePayment} className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-center">Make Payment</h2>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}


        <input
  type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
          className="w-full p-2 border rounded mb-4"
        />
     
     <p className="text-lg font-semibold text-gray-700">Amount: ₦{amount.toLocaleString()}</p>

<div className="flex items-center justify-center">
  <motion.button
    className="mt-5 w-full py-3 px-4 bg-green-700 text-white font-bold rounded-lg shadow-lg hover:bg-green-900 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    type="submit"
    disabled={isLoading}
  >
    {isLoading ? (
      <span className="flex items-center justify-center">
        <AiOutlineLoading3Quarters className="animate-spin h-5 w-5 mr-2" />
        Redirecting...
      </span>
    ) : (
      "Proceed to Payment"
    )}
  </motion.button>
</div>
      </form>

    </div>
  </div>
      
      
    </div>
  )
}

export default MakePayment
