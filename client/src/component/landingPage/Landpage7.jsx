import React from 'react';
import im2 from '../../assets/website/Rectangle 458.png';
import im from '../../assets/website/image 370.png';
import GroupsYouMayLike from '../EGroup/GroupsYouMayLike';

const Landpage7 = () => {
  return (
    <div className="font-sans max-w-7xl mx-auto p-5">
      {/* Header Section */}
      <div className="text-center py-12 bg-gray-100 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Host your school website</h1>
        <p className="text-lg text-gray-600">Here • Now • Free</p>
      </div>

      {/* Trending Section */}
      <div className="mt-8 flex gap-5 overflow-x-auto">
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className="min-w-[200px] bg-white rounded-lg shadow-md p-3 text-center hover:scale-105 transition-transform duration-300"
          >
            <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
              Trending
            </span>
            <img
              src={im}
              alt="Trending"
              className="w-full h-32 rounded-lg object-cover mb-3"
            />
            <p className="text-gray-800">Lecturer caught with fraud</p>
          </div>
        ))}
      </div>

      {/* Advert Section */}
      <div className="text-center py-12 bg-gray-100 rounded-lg shadow-md mt-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Advert</h1>
        <p className="text-lg text-gray-600">Here • Now • Free</p>
      </div>

      {/* News Section */}
      <div className="relative mt-8">
        <img
          src={im2}
          alt="News"
          className="w-full h-64 rounded-lg object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center rounded-lg">
          <h1 className="text-3xl font-bold text-white">Newsroom & Blog</h1>
        </div>
      </div>

   <GroupsYouMayLike />

      {/* Footer Advert Section */}
      <div className="text-center py-12 bg-gray-100 rounded-lg shadow-md mt-8 text-3xl font-semibold">
        Advert
      </div>
    </div>
  );
};

export default Landpage7;
