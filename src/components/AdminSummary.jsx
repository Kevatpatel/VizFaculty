import React from "react";
import SummaryCard from "../components/SummaryCard";
import {
  FaUsers,
  FaBuilding,
  FaMoneyBillWave,
  FaFileAlt,
  FaCheckCircle,
  FaHourglassHalf,
  FaTimesCircle,
} from "react-icons/fa";

const AdminSummary = () => {
  return (
    <div className="p-6">
      <h3 className="text-2xl font-bold">Dashboard Overview</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <SummaryCard icon={<FaUsers />} text="Total Faculty" number={10} color="bg-teal-600" />
        <SummaryCard icon={<FaBuilding />} text="Total Department" number={5} color="bg-teal-600" />
        <SummaryCard icon={<FaMoneyBillWave />} text="Monthly Salary" number="$654" color="bg-teal-600" />
      </div>

      <div className="mt-12">
        <h4 className="text-center text-2xl font-bold">Leave Details</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <SummaryCard icon={<FaFileAlt />} text="Leave Applied" number={5} color="bg-teal-600" />
          <SummaryCard icon={<FaCheckCircle />} text="Leave Approved" number={2} color="bg-gray-500" />
          <SummaryCard icon={<FaHourglassHalf />} text="Leave Pending" number={4} color="bg-yellow-500" />
          <SummaryCard icon={<FaTimesCircle />} text="Leave Rejected" number={1} color="bg-red-500" />
        </div>
      </div>
    </div>
  );
};

export default AdminSummary;
