import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie, Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const Dashboard = () => {
  const [examData, setExamData] = useState([]);
  const [tutorialData, setTutorialData] = useState([]);
  const [teacherData, setTeacherData] = useState([]);
  const [trainingData, setTrainingData] = useState([]);
  const [schoolData, setSchoolData] = useState([]);
  const [storeData, setStoreData] = useState([]);
  const [bookData, setBookData] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_APIA}/exam`)
      .then(response => setExamData(response.data))
      .catch(error => console.error('Error fetching exam:', error));

    axios.get(`${import.meta.env.VITE_APIA}/tutorial`)
      .then(response => setTutorialData(response.data))
      .catch(error => console.error('Error fetching tutorial:', error));

    axios.get(`${import.meta.env.VITE_APIA}/teacher`)
      .then(response => setTeacherData(response.data))
      .catch(error => console.error('Error fetching teacher:', error));

    axios.get(`${import.meta.env.VITE_APIA}/training`)
      .then(response => setTrainingData(response.data))
      .catch(error => console.error('Error fetching training:', error));

    axios.get(`${import.meta.env.VITE_APIA}/schools`)
      .then(response => setSchoolData(response.data))
      .catch(error => console.error('Error fetching school:', error));

    axios.get(`${import.meta.env.VITE_APIA}/book`)
      .then(response => setBookData(response.data))
      .catch(error => console.error('Error fetching books:', error));

    axios.get(`${import.meta.env.VITE_APIA}/store`)
      .then(response => setStoreData(response.data))
      .catch(error => console.error('Error fetching store:', error));
  }, []);

  const examPieData = {
    labels: ['Exams'],
    datasets: [
      {
        label: 'Exam Distribution',
        data: [examData.length],
        backgroundColor: ['#FF6384'],
      },
    ],
  };

  const tutorialPieData = {
    labels: ['Tutorials'],
    datasets: [
      {
        label: 'Tutorial Distribution',
        data: [tutorialData.length],
        backgroundColor: ['#36A2EB'],
      },
    ],
  };

  const teacherCount = {
    Certified: teacherData?.filter(teacher => teacher.certified === true).length,
    NonCertified: teacherData?.filter(teacher => teacher.certified === false).length,
  };

  const teacherBarData = {
    labels: Object.keys(teacherCount),
    datasets: [
      {
        label: 'Teachers by Certification',
        data: Object.values(teacherCount),
        backgroundColor: ['#FFCE56', '#FF6384'],
      },
    ],
  };

  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Total Exams</h2>
          <p className="text-3xl font-bold">{examData.length}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Total Tutorials</h2>
          <p className="text-3xl font-bold">{tutorialData.length}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Total Training</h2>
          <p className="text-3xl font-bold">{trainingData.length}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Total Schools</h2>
          <p className="text-3xl font-bold">{schoolData.length}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Total Bookstores</h2>
          <p className="text-3xl font-bold">{bookData.length}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Total stores</h2>
          <p className="text-3xl font-bold">{storeData.length}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Total teachers</h2>
          <p className="text-3xl font-bold">{teacherData.length}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* <div className="bg-white p-6 rounded-lg shadow-md h-64">
          <h2 className="text-xl font-semibold mb-4">Exam Distribution</h2>
          <Pie data={examPieData} options={pieChartOptions} />
       
        </div> */}

        {/* <div className="bg-white p-6 rounded-lg shadow-md h-64">
          <h2 className="text-xl font-semibold mb-4">Tutorial Distribution</h2>
          <Pie data={tutorialPieData} options={pieChartOptions} />
        </div> */}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mt-9">
        <h2 className="text-xl font-semibold mb-4">Teachers Distribution by Certification</h2>
        <Bar data={teacherBarData} />
      </div>
    </div>
  );
};

export default Dashboard;
