import React, { useState, useEffect } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const AdminSummary = () => {
  const [publicationData, setPublicationData] = useState([
    { name: "Journal Publications", value: 0 },
    { name: "Conference Publications", value: 0 },
  ]);

  // Fetch publication counts
  useEffect(() => {
    const fetchPublicationCounts = async () => {
      try {
        const journalResponse = await axios.get(
          "http://localhost:5000/api/publications/api/journal-publications/count"
        );
        const conferenceResponse = await axios.get(
          "http://localhost:5000/api/publications/api/conference-publications/count"
        );

        setPublicationData([
          { name: "Journal Publications", value: journalResponse.data.count },
          { name: "Conference Publications", value: conferenceResponse.data.count },
        ]);
      } catch (error) {
        console.error("❌ Error fetching publication counts:", error);
      }
    };

    fetchPublicationCounts();
  }, []);

  // Colors for the Pie Chart
  const COLORS = ["#0088FE", "#00C49F"];

  return (
    <div className="min-h-screen bg-white p-6 flex flex-col items-center">
      <h2 className="text-2xl font-semibold text-teal-700 mb-6">
        Publications Overview
      </h2>

      <div className="bg-white shadow-lg rounded-lg p-6">
        <PieChart width={400} height={400}>
          <Pie
            data={publicationData}
            cx="50%"
            cy="50%"
            outerRadius={120}
            fill="#8884d8"
            dataKey="value"
            label
          >
            {publicationData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>
    </div>
  );
};

export default AdminSummary;
