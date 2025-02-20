import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import axios from "axios";

const TrendsChart = () => {
  const [trendData, setTrendData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/get-trends", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
    .then((res) => {
      const formattedData = Object.keys(res.data.incomeTrends).map((month) => ({
        month,
        income: res.data.incomeTrends[month] || 0,
        expense: res.data.expenseTrends[month] || 0
      }));
      setTrendData(formattedData);
    })
    .catch((err) => console.error(err));
  }, []);

  return (
    <div className="bg-white p-4 shadow-lg rounded-xl">
      <h3 className="text-lg font-semibold mb-3">Monthly Income vs Expenses</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={trendData}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="income" stroke="#4CAF50" />
          <Line type="monotone" dataKey="expense" stroke="#F44336" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TrendsChart;
