import React from 'react';

import im3 from '../../assets/website/image 37.png';
import { FaSchool, FaCar, FaNewspaper, FaHotel, FaBriefcase, FaStore } from 'react-icons/fa';
const Landpage2 = () => {
  return (
    <div className="font-sans bg-white text-gray-800">
      


<section className="py-8 px-4 bg-white text-center">
  <h2 className="text-2xl font-bold mb-5">Our Other Choices</h2>
  <div className="grid grid-cols-3 gap-4">
    {[
      { title: 'E-school', icon: <FaSchool size={40} />, color: 'bg-red-100 text-red-500' },
      { title: 'E-drivers', icon: <FaCar size={40} />, color: 'bg-teal-100 text-teal-500' },
      { title: 'E-news', icon: <FaNewspaper size={40} />, color: 'bg-blue-100 text-blue-500' },
      { title: 'Ebnb-hotels', icon: <FaHotel size={40} />, color: 'bg-pink-100 text-pink-500' },
      { title: 'E-jobs', icon: <FaBriefcase size={40} />, color: 'bg-blue-100 text-blue-500' },
      { title: 'E-stores', icon: <FaStore size={40} />, color: 'bg-green-100 text-green-500' },
    ].map((item, index) => (
      <div
        key={index}
        className="flex flex-col items-center p-4 border border-gray-300 rounded-lg shadow-lg"
      >
        <div className={`w-16 h-16 flex items-center justify-center rounded-full ${item.color} mb-4`}>
          {item.icon}
        </div>
        <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
        <p className="text-sm text-gray-600">Lorem ipsum dolor sit amet consectetur.</p>
      </div>
    ))}
  </div>
</section>

    

{/* Second Choices Section (Repeated) */}
{/* <section className="py-8 px-4 bg-white">
  <div className="grid grid-cols-3 gap-4 sm:flex sm:flex-wrap">
    {[
      { title: 'e-ride', image: 'path/to/image5.jpg' },
      { title: 'hauling', image: 'path/to/image6.jpg' },
      { title: 'Pride of Nigeria', image: 'path/to/image7.jpg' },
      { title: 'Oosh', image: 'path/to/image8.jpg' }
    ].map((item, index) => (
      <div
        key={index}
        className="border border-gray-300 p-4 rounded-lg shadow-sm min-w-[80px] sm:min-w-[250px] sm:md:min-w-[calc(25%-15px)]"
      >
        <img src={item.image} alt={item.title} className="w-full rounded-lg mb-4" />
        <h3 className="text-lg font-semibold">{item.title}</h3>
        <h1 className="text-sm text-gray-600">
          Lorem ipsum dolor sit amet consectetur. Et rhoncus nunc dictum massa.
        </h1>
      </div>
    ))}
  </div>
</section> */}


      {/* Promotional Banner */}
      <section className="py-12 px-4 bg-gray-100 flex flex-wrap justify-between items-center gap-8">
        <div className="max-w-full md:max-w-[50%]">
          <h2 className="text-3xl font-bold mb-4">Make the right choices during your school year with...</h2>
          <ul className="text-lg text-gray-700 list-none pl-0 space-y-2">
            <h2>• e-jobs</h2>
            <h2>• comparism</h2>
            <h2>• Scholarships</h2>
            <h2>• Admission ...etc</h2>
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
