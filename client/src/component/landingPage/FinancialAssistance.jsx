import React from 'react'
import im4 from "../../assets/website/tutorial8.jpg"
import { Link } from 'react-router-dom'
const FinancialAssistance = () => {
  return (
    <div>
        <section className="bg-cover bg-center py-10 text-center text-white" style={{ backgroundImage: `url(${im4})` }}>
        <h2 className="text-2xl font-bold text-black">Your Student Financial Assistance - Loan and Scholarships</h2>
        <p className="max-w-2xl mx-auto mt-4 text-4xl text-white">Estudent Funding is Providing students in Nigeria with financial aid options to fund their education</p>
        <div className="flex justify-center gap-5 mt-6">
          <button className="px-6 py-3 bg-green-700 text-white rounded-md text-lg">Get Loan</button>
          <Link to="scholarship">
          <button className="px-6 py-3 border-2 border-green-700 text-white rounded-md text-lg">Scholarship</button>
          </Link>
        </div>
      </section>
      
    </div>
  )
}

export default FinancialAssistance
