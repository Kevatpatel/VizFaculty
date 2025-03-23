// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

// const AdminSummary = () => {
//   const [publicationData, setPublicationData] = useState([]);
//   const [departmentData, setDepartmentData] = useState([]);

//   useEffect(() => {
//     const fetchPublicationCounts = async () => {
//       try {
//         const journalResponse = await axios.get(
//           "http://localhost:5000/api/publications/api/journal-publications/count"
//         );
//         const conferenceResponse = await axios.get(
//           "http://localhost:5000/api/publications/api/conference-publications/count"
//         );

//         setPublicationData([
//           { name: "Journal Publications", value: journalResponse.data.count },
//           { name: "Conference Publications", value: conferenceResponse.data.count },
//         ]);
//       } catch (error) {
//         console.error("❌ Error fetching publication counts:", error);
//       }
//     };

//     const fetchDepartmentCounts = async () => {
//       try {
//         const deptResponse = await axios.get(
//           "http://localhost:5000/api/publications/api/publications/department-wise-count"
//         );
//         setDepartmentData(deptResponse.data);
//       } catch (error) {
//         console.error("❌ Error fetching department-wise publication counts:", error);
//       }
//     };

//     fetchPublicationCounts();
//     fetchDepartmentCounts();
//   }, []);

//   const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28CFF", "#FF6666"];

//   return (
//     <div className="min-h-screen bg-white p-6 flex flex-col items-center">
//       <h2 className="text-2xl font-semibold text-teal-700 mb-6">Publications Overview</h2>

//       {/* Journal vs. Conference Publications Pie Chart */}
//       <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
//         <h3 className="text-lg font-semibold text-gray-700 mb-4">Journal vs. Conference Publications</h3>
//         <PieChart width={400} height={400}>
//           <Pie
//             data={publicationData}
//             cx="50%"
//             cy="50%"
//             outerRadius={120}
//             fill="#8884d8"
//             dataKey="value"
//             label
//           >
//             {publicationData.map((entry, index) => (
//               <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//             ))}
//           </Pie>
//           <Tooltip />
//           <Legend />
//         </PieChart>
//       </div>

//       {/* Department-wise Publications Pie Chart */}
//       <div className="bg-white shadow-lg rounded-lg p-6">
//         <h3 className="text-lg font-semibold text-gray-700 mb-4">Department-wise Publications</h3>
//         <PieChart width={400} height={400}>
//           <Pie
//             data={departmentData}
//             cx="50%"
//             cy="50%"
//             outerRadius={120}
//             fill="#8884d8"
//             dataKey="value"
//             label
//           >
//             {departmentData.map((entry, index) => (
//               <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//             ))}
//           </Pie>
//           <Tooltip />
//           <Legend />
//         </PieChart>
//       </div>
//     </div>
//   );
// };

// export default AdminSummary;


import React, { useState, useEffect } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const AdminSummary = () => {
  const [publicationData, setPublicationData] = useState([]);
  const [departmentData, setDepartmentData] = useState([]);

  useEffect(() => {
    const fetchPublicationCounts = async () => {
      try {
        const journalResponse = await axios.get("http://localhost:5000/api/publications/api/journal-publications/count");
        const conferenceResponse = await axios.get("http://localhost:5000/api/publications/api/conference-publications/count");

        setPublicationData([
          { name: "Journal Publications", value: journalResponse.data.count },
          { name: "Conference Publications", value: conferenceResponse.data.count },
        ]);
      } catch (error) {
        console.error("❌ Error fetching publication counts:", error);
      }
    };

    const fetchDepartmentCounts = async () => {
      try {
        const deptResponse = await axios.get("http://localhost:5000/api/publications/api/publications/department-wise-count");
        setDepartmentData(deptResponse.data);
      } catch (error) {
        console.error("❌ Error fetching department-wise publication counts:", error);
      }
    };

    fetchPublicationCounts();
    fetchDepartmentCounts();
  }, []);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28CFF", "#FF6666", "#FF33CC", "#FF3300"];

  return (
    <div className="min-h-screen bg-white p-6 flex flex-col items-center">
      <h2 className="text-2xl font-semibold text-teal-700 mb-6">Publications Overview</h2>

      {/* Journal vs. Conference Publications Pie Chart */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Journal vs. Conference Publications</h3>
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

      {/* Department-wise Publications Pie Chart */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Department-wise Publications</h3>
        <PieChart width={400} height={400}>
          <Pie
            data={departmentData}
            cx="50%"
            cy="50%"
            outerRadius={120}
            fill="#8884d8"
            dataKey="value"
            label={({ name, value }) => `${name}: ${value}`}
          >
            {departmentData.map((entry, index) => (
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

