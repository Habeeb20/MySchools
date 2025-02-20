import React from 'react';
import im from '../../assets/website/accredit.png';
import im2 from '../../assets/website/pictureBack.png';
import im3 from '../../assets/website/unnamed 1.png';
import im4 from '../../assets/website/unnamed 2.png';
import im5 from '../../assets/website/unnamed 3.png';
import im6 from '../../assets/website/unnamed 4.png';
import im7 from '../../assets/website/unnamed 5.png';
import im8 from '../../assets/website/image 34.png';

const Landpage6 = () => {
  return (
    <div className="font-sans max-w-screen-lg mx-auto px-4">
      {/* Section 1 */}
      <div className="text-center mb-16">
        <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-4">
          Disclosure and Barring Service
        </h1>
        <p className="text-lg md:text-xl text-white leading-relaxed mb-6">
          Request standard and enhanced personal record checks for eligible positions for jobs in Nigeria.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <button className="px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition">
            Background Check
          </button>
          <button className="px-6 py-3 text-white bg-red-500 rounded-lg hover:bg-red-600 transition">
            Professional Check
          </button>
        </div>
      </div>

      {/* Section 2 */}
      <div className="relative mb-16">
        <img src={im} alt="University Image" className="w-full h-64 md:h-80 object-cover rounded-lg shadow-lg" />
        <div className="absolute inset-0 bg-black bg-opacity-70 flex justify-center items-center text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            Apply to courses and programmes everywhere, anywhere
          </h2>
        </div>
      </div>

      {/* Section 3 */}
      <div className="text-center mb-16">
        <img src={im2} alt="Exam Image" className="w-full h-64 md:h-80 object-cover rounded-lg shadow-lg mb-6" />
        <div className="flex flex-wrap justify-center gap-4">
          <img src={im8} alt="icon5" className="w-20 h-20 rounded-full border-2 border-white shadow-lg transition-transform hover:scale-105" />
          <img src={im3} alt="icon1" className="w-20 h-20 rounded-full border-2 border-white shadow-lg transition-transform hover:scale-105" />
          <img src={im4} alt="icon2" className="w-20 h-20 rounded-full border-2 border-white shadow-lg transition-transform hover:scale-105" />
          <img src={im5} alt="icon3" className="w-20 h-20 rounded-full border-2 border-white shadow-lg transition-transform hover:scale-105" />
          <img src={im6} alt="icon4" className="w-20 h-20 rounded-full border-2 border-white shadow-lg transition-transform hover:scale-105" />
        </div>
      </div>
    </div>
  );
};

export default Landpage6;
