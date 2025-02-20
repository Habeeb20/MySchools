import React from 'react';
import im from '../../assets/website/tutorial.jpg';
import im2 from '../../assets/website/img234.png';

const Landpage8 = () => {
  return (
    <div className="font-sans w-full mx-auto px-4 text-center">
      {/* Header Section */}
      <div
        className="bg-cover bg-center text-white py-16"
        style={{ backgroundImage: `url(${im2})` }}
      >
        <p className="text-lg md:text-2xl font-bold">
          Book a flight, Hotel, train, interstate ALL OVER NIGERIA <br />
          AND THE WORLD - and get a student discount rate
        </p>

        {/* Booking Box */}
        <div className="bg-blue-900 text-white p-6 rounded-lg shadow-lg mt-8 mx-auto max-w-4xl -mt-12">
          <div className="flex justify-around mb-4">
            {['Economy', 'Premium', 'Business', 'First class'].map((tab, index) => (
              <button
                key={index}
                className={`px-4 py-2 ${
                  index === 0
                    ? 'border-b-2 border-white'
                    : 'hover:border-b-2 hover:border-gray-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-4 mt-6 justify-center">
            <input
              type="text"
              placeholder="From (city)"
              className="flex-1 min-w-[45%] p-3 rounded-md border border-gray-300"
            />
            <input
              type="text"
              placeholder="To (city)"
              className="flex-1 min-w-[45%] p-3 rounded-md border border-gray-300"
            />
            <input
              type="date"
              placeholder="Departure Date"
              className="flex-1 min-w-[45%] p-3 rounded-md border border-gray-300"
            />
            <input
              type="date"
              placeholder="Return Date"
              className="flex-1 min-w-[45%] p-3 rounded-md border border-gray-300"
            />
            <input
              type="number"
              placeholder="1 Passenger"
              className="flex-1 min-w-[45%] p-3 rounded-md border border-gray-300"
            />
            <button className="bg-blue-600 text-white px-4 py-3 rounded-md hover:bg-blue-700 flex-1">
              Search Flight
            </button>
          </div>
        </div>
      </div>

      {/* Subscription Section */}
      <div className="bg-gray-100 py-12 px-4 mt-8 text-center">
        <h2 className="text-lg md:text-2xl font-semibold mb-6">
          You are 90% MORE likely to get the best deals as a Student by subscribing
        </h2>

        <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
          <input
            type="email"
            placeholder="Enter your email and we'll send them your way."
            className="p-3 w-full md:w-2/3 rounded-md border border-gray-300"
          />
          <button className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600">
            Subscribe
          </button>
        </div>

        <p className="text-sm text-gray-600 mt-4">
          Your privacy is important to us, so we'll never spam you or share your info with third
          parties. Take a look at our <span className="underline">privacy policy</span>. You can
          unsubscribe at any time.
        </p>
      </div>
    </div>
  );
};

export default Landpage8;
