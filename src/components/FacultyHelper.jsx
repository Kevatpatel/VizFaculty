import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const columns = [
  {
    name: "S No",
    selector: (row) => row.sno,
    width: '70px'
  },
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
    width: "100px"
  },
  {
    name: "Image",
    selector: (row) => row.profileImage,
    width: "90px"
  },
  {
    name: "Department",
    selector: (row) => row.dep_name,
    width: '120px'
  },
  {
    name: "DOB",
    selector: (row) => row.dob,
    sortable: true,
    width: '150px'
  },
  {
    name: "Action",
    selector: (row) => row.action,
    center: "true"
  },
];

export const fetchDepartments = async () => {
  let departments;
  try {
    const responnse = await axios.get("http://localhost:5000/api/department", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (responnse.data.message) {
      departments = responnse.data.departments;
    }
  } catch (error) {
    if (error.response && !error.response.data.message) {
      alert(error.response.data.error);
    }
  }
  return departments;
};

export const FacultyButtons = ({ Id }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-wrap gap-2">
      <button
        className="px-3 py-1 bg-teal-600 text-white rounded"
        onClick={() => navigate(`/admin-dashboard/faculties/${Id}`)}
      >
        View
      </button>
      <button className="px-3 py-1 bg-teal-600 text-white rounded">Edit</button>
      <button className="px-3 py-1 bg-teal-600 text-white rounded">Salary</button>
      <button className="px-3 py-1 bg-teal-600 text-white rounded">Leave</button>
    </div>
  );
};
