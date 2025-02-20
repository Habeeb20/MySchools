import React from 'react';
import im from '../../assets/website/tutorial8.jpg';
import g from '../../assets/website/guy.png';

const Landpage5 = () => {
  return (
    <div className="font-sans text-gray-800">
      {/* First Section */}
      <div
        className="bg-cover bg-center text-white py-16 text-center"
        style={{ backgroundImage: `url(${im})`, height: '380px' }}
      >
        <h1 className="text-2xl md:text-4xl mb-4">
          We tell you more about <br /> People, Businesses & Places In{' '}
          <span className="text-green-500">Nigeria</span> Than Any Other Directory.
        </h1>
      </div>

      {/* Advert Section */}
      <div className="text-center py-12 bg-gray-100">
        <div className="text-3xl font-bold mb-4">Advert</div>
        <div className="text-lg text-gray-600">Here • Now • Free</div>
      </div>

      {/* Second Section */}
      <div className="py-10 flex flex-col items-center text-center">
        <div
          className="relative w-full max-w-5xl h-96 bg-cover bg-center flex items-center justify-center"
          style={{ backgroundImage: `url(${g})` }}
        >
          <div className="absolute top-0 right-0 w-full h-full bg-yellow-400 bg-opacity-50 flex flex-col justify-center items-center text-center clip-polygon">
            <h2 className="text-3xl md:text-4xl mb-4">
              Did <span className="font-bold text-black">YOU</span> know?
            </h2>
            <p className="text-lg md:text-xl font-semibold">
              That you can teach easily than before, make double the cash, and rest twice more?
            </p>
          </div>
        </div>
      </div>

      {/* Third Section */}
      <div className="bg-white py-10 flex flex-col items-center text-center">
        <h2 className="text-3xl md:text-4xl text-gray-800 mb-4">
          Students can get jobs easily with student e-jobs
        </h2>
        <p className="text-lg md:text-2xl mb-6">
          Part-time, full-time, summer, holiday, services, etc.
        </p>
        <button className="bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600 transition duration-300">
          Learn More
        </button>
      </div>

      {/* Advert Section */}
      <div className="text-center py-12 bg-gray-100">
        <div className="text-3xl font-bold mb-4">Advert</div>
        <div className="text-lg text-gray-600">Here • Now • Free</div>
      </div>
    </div>
  );
};

export default Landpage5;
