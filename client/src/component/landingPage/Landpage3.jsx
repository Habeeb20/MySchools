import React from 'react'
import im from '../../assets/website/Rectangle 406.png';
import im1 from '../../assets/website/Rectangle 408.png';
import im3 from '../../assets/website/Rectangle 409.png';
import im4 from '../../assets/website/Rectangle 410.png';
import student from '../../assets/website/homepage student.png';
import student1 from '../../assets/website/Mask group.png';
const Landpage3 = () => {
    return (
        <div className="font-sans m-0 p-0">
          {/* Book an Hotel before leaving Section */}
          <section className="p-5 bg-gray-100">
            <h2 className="text-xl font-bold mb-4">Book an Hotel before leaving</h2>
            <div className="flex flex-wrap gap-4">
      {/* Main Promo Image */}
      <div className="relative flex-1 w-full lg:w-2/3">
        <img src={im} alt="Promo" className="w-full rounded-lg" />
        <div className="absolute top-5 left-5 text-white text-lg font-bold">
          Thousands of 5-Star reviews
        </div>
        <div className="absolute top-16 left-5 text-white text-sm">
          Thanks to our first-class quality and great value fares...
        </div>
        <button className="absolute bottom-5 left-5 bg-green-600 text-white px-4 py-2 rounded-md font-medium">
          Book now
        </button>
      </div>
    
    
    </div>
    
            
            {/* Image Grid Section */}
            <div className="flex flex-wrap gap-4 mt-4">
              {[im1, im4, im3].map((src, index) => (
                <div key={index} className="flex-1 sm:w-1/3">
                  <img src={src} alt={`Image ${index + 1}`} className="w-full rounded-lg" />
                </div>
              ))}
            </div>
          </section>
          
          {/* Do more with student I.D Section */}
          <section className="p-5 bg-gray-50 flex flex-wrap items-center justify-between">
            <div className="w-full lg:w-1/2 mb-4 lg:mb-0">
              <h2 className="text-2xl font-bold mb-4">Do more with student I.D</h2>
              <h1 className="text-xl text-gray-600">
                Lorem ipsum dolor sit amet consectetur. Et rhoncus nunc dictum massa.
              </h1>
            </div>
            <div className="w-full lg:w-2/5">
              <img src={student1} alt="Student ID" className="w-full rounded-lg" />
            </div>
          </section>

              {/* Do more with student I.D Section */}
              <section className="p-5 bg-gray-50 flex flex-wrap items-center justify-between">
            <div className="w-full lg:w-1/2 mb-4 lg:mb-0">
              <h2 className="text-2xl font-bold mb-4">Are you a student</h2>
              <h3 className="text-xl text-gray-600">
              Do you want to enter vehicle at a very good discount? <br />
              E-ride got you covered
              </h3>
              <button className="bg-green-600 text-white px-4 py-2 rounded-md font-medium mx-auto sm:mx-0 w-1/2 sm:w-auto">
                Join our next transporting
              </button>
            </div>
            <div className="w-full lg:w-2/5">
              <img src={student} alt="Student ID" className="w-full rounded-lg" />
            </div>
          </section>
          
        
      
        </div>
      );
}

export default Landpage3
