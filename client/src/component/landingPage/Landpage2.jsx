import React from 'react';

import im3 from '../../assets/website/image 37.png';
import { FaSchool, FaCar, FaNewspaper, FaHotel, FaBriefcase, FaStore } from 'react-icons/fa';

const Landpage2 = () => {
  return (
    <div className="font-sans bg-white text-gray-800">
      <section className="py-8 px-4 bg-white text-center">
        <h2 className="text-2xl font-bold mb-5">Our Other Choices</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { title: 'E-School Learning', icon: <FaSchool size={40} />, color: 'bg-red-100 text-red-500', description: 'Enhance your learning experience with top-notch online education.' },
            { title: 'E-Drivers Hub', icon: <FaCar size={40} />, color: 'bg-teal-100 text-teal-500', description: 'Find professional drivers and driving opportunities easily.' },
            { title: 'E-News Daily', icon: <FaNewspaper size={40} />, color: 'bg-blue-100 text-blue-500', description: 'Stay updated with the latest news and trends worldwide.' },
            { title: 'Ebnb Luxury Hotels', icon: <FaHotel size={40} />, color: 'bg-pink-100 text-pink-500', description: 'Book luxurious stays at the best hotels with ease.' },
            { title: 'E-Jobs Portal', icon: <FaBriefcase size={40} />, color: 'bg-blue-100 text-blue-500', description: 'Explore job opportunities across various industries.' },
            { title: 'E-Stores Marketplace', icon: <FaStore size={40} />, color: 'bg-green-100 text-green-500', description: 'Shop from a wide range of products at great prices.' },
          ].map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-4 border border-gray-300 rounded-lg shadow-lg text-center"
              title={item.title}
            >
              <div className={`w-16 h-16 flex items-center justify-center rounded-full ${item.color} mb-4`}>
                {item.icon}
              </div>
              <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </section>
      
      {/* Promotional Banner */}
      <section className="py-12 px-4 bg-gray-100 flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
        <div className="w-full md:w-[50%]">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Make the right choices during your school year with...</h2>
          <ul className="text-lg text-gray-700 list-none pl-0 space-y-2">
            <li>• e-jobs</li>
            <li>• comparison</li>
            <li>• Scholarships</li>
            <li>• Admission ...etc</li>
          </ul>
        </div>
        <div className="w-full md:w-[45%]">
          <img src={im3} alt="Promotional" className="w-full rounded-lg" />
        </div>
      </section>
    </div>
  );
};

export default Landpage2;
