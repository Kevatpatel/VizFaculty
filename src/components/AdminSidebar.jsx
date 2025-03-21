import React from "react";
import { NavLink } from "react-router-dom";
import { FaTachometerAlt, FaUsers, FaBuilding, FaCalendarAlt, FaMoneyBillWave, FaCogs } from "react-icons/fa";

const AdminSidebar = () => {
  return (
    <div className="bg-gray-800 text-white h-screen fixed left-0 bottom-0 space-y-2 w-64">
      {/* Sidebar Header */}
      <div className="bg-teal-600 h-12 flex items-center justify-center">
        <h3 className="text-2xl text-center font-pacific">Viz Faculty</h3>
      </div>

      {/* Sidebar Links */}
      <div>
        {/* Dashboard */}
        <NavLink
          to="/admin-dashboard"
          className={({ isActive }) =>
            `${isActive ? "bg-teal-500" : ""} flex items-center space-x-4 block py-2.5 px-4 rounded`
          }
          end
        >
          <FaTachometerAlt />
          <span>Dashboard</span>
        </NavLink>

        {/* Faculty */}
        <NavLink
          to="/admin-dashboard/faculties"
          className={({ isActive }) =>
            `${isActive ? "bg-teal-500" : ""} flex items-center space-x-4 block py-2.5 px-4 rounded`
          }
        >
          <FaUsers />
          <span>Faculty</span>
        </NavLink>

        {/* Department */}
        <NavLink
          to="/admin-dashboard/department"
          className={({ isActive }) =>
            `${isActive ? "bg-teal-500" : ""} flex items-center space-x-4 block py-2.5 px-4 rounded`
          }
        >
          <FaBuilding />
          <span>Department</span>
        </NavLink>

      
        <NavLink
          to="/admin-dashboard/publications"
          className={({ isActive }) =>
            `${isActive ? "bg-teal-500" : ""} flex items-center space-x-4 block py-2.5 px-4 rounded`
          }
        >
          <FaMoneyBillWave />
          <span>Publications</span>
        </NavLink>
      </div>
    </div>
  );
};

export default AdminSidebar;
