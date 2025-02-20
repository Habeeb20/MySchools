import React from 'react'
import im2 from '../../assets/website/Rectangle 392.png';
import im3 from '../../assets/website/Rectangle 393.png';
import im4 from '../../assets/website/graduate.png';

const Landpage4 = () => {
    return (
        <div className="w-full p-5">
          
          {/* Image Card Section */}
          <div className="flex flex-col md:flex-row gap-4 mb-8 justify-center items-center">
            <div className="relative flex-1 rounded-lg overflow-hidden">
              <img src={im2} alt="Discount 1" className="w-full h-auto object-cover" />
            </div>
            <div className="relative flex-1 rounded-lg overflow-hidden">
              <img src={im3} alt="Discount 2" className="w-full h-96 object-cover" />
              <div className="absolute bottom-0 left-0 w-full p-4 bg-black bg-opacity-50 text-white text-center text-lg font-semibold">
                Student Discounts on everything you want
              </div>
            </div>
          </div>
          
          {/* Advertisement Section */}
          <div className="text-center py-12 bg-gray-100">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Advert</h2>
            <p className="text-lg md:text-xl text-gray-600">Here • Now • Free</p>
          </div>
    
          {/* Footer Section */}
          <div className="relative mt-8 bg-cover bg-center rounded-lg overflow-hidden h-96 flex flex-col justify-center items-center" style={{ backgroundImage: `url(${im4})` }}>
            <div className="absolute inset-0 bg-black opacity-60"></div>
            <div className="relative text-center text-white p-5">
              <h3 className="text-2xl md:text-4xl font-bold mb-4">Enjoy being a student more with our e-student ID card benefits</h3>
              <p className="text-base md:text-lg mb-6">Lorem ipsum dolor sit amet consectetur. Et rhoncus nunc dictum massa.</p>
              <div className="flex flex-wrap gap-2 justify-center">
                <button className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-md">eJobs</button>
                <button className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-md">Buy</button>
                <button className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-md">Loans</button>
                <button className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-md">Ride</button>
              </div>
            </div>
          </div>
          
        </div>
      );
}

export default Landpage4
