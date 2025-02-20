import React from 'react';

const Landpage1 = () => {
  const boxes = [
    {
      id: 1,
      title: 'Sign up',
      description: 'Signup up to your school on Eschools',
      link: '/schoolslogin',
    },
    {
      id: 2,
      title: 'Report a scam',
      description: 'Report schools or fraud to help protect others',
      link: '/report',
    },
    {
      id: 3,
      title: 'make a request',
      description: '        If you need help, let us know. We’re here to assist you promptly',
      link: '/request',
    },
  ];

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {boxes.map((box) => (
          <div
            key={box.id}
            className="bg-green-800 text-white p-6 rounded-lg shadow-md flex flex-col justify-between"
          >
            <div>
              <h3 className="text-lg font-bold mb-2">{box.title}</h3>
              <p className="text-sm mb-4">{box.description}</p>
            </div>
            <a
              href={box.link}
              className="bg-green-600 hover:bg-green-500 text-white py-2 px-4 rounded text-center transition"
            >
              click
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Landpage1;
