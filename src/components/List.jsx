import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import axios from 'axios';

import { FacultyButtons, columns } from './FacultyHelper.jsx';

const List = () => {
    const [faculties, setFaculties] = useState([]);
    const [facLoading, setFacLoading] = useState(false);
    useEffect(() => {
        const fetchFaculties = async () => {
            setFacLoading(true);
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('Authorization token not found');
                }
    
                const response = await axios.get('http://localhost:5000/api/faculty', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
    
                console.log('Response data:', response.data); // Debugging: Log the response data
    
                if (response.data.message && Array.isArray(response.data.faculties)) {
                    let sno = 1;
                    const data = response.data.faculties.map(fac => ({
                        _id: fac._id,
                        sno: sno++,
                        dep_name: fac.department?.dep_name || 'N/A',
                        name: fac.userId?.name || 'Unknown',
                        dob: fac.dob ? new Date(fac.dob).toLocaleDateString() : 'N/A',
                        profileImage: fac.userId?.profileImage
                            ? (
                                <img
                                    width={40}
                                    className="rounded-full"
                                    src={`http://localhost:5000/${fac.userId.profileImage}`}
                                    alt="profile"
                                />
                              ):"No Image",
                            
                        action: <FacultyButtons Id={fac._id} />,
                    }));
                    setFaculties(data);
                }
            } catch (error) {
                console.error('Error fetching faculties:', error);
                if (error.response?.data?.error) {
                    alert(error.response.data.error);
                } else {
                    alert('An error occurred while fetching faculties.');
                }
            } finally {
                setFacLoading(false);
            }
        };
    
        fetchFaculties();
    }, []);
    

    return (
        <div className="p-6">
            <div className="text-center">
                <h3 className="text-2xl font-bold">Manage Faculty</h3>
            </div>
            <div className="flex justify-between items-center">
                <input
                    type="text"
                    placeholder="Search by dept-name"
                    className="px-4 py-0.5 border"
                />
                <Link
                    to="/admin-dashboard/add-faculty"
                    className="px-4 py-1 bg-teal-600 rounded text-white"
                >
                    Add new Faculty
                </Link>
            </div>
            <div>
                <DataTable columns={columns} data={faculties} progressPending={facLoading} />
            </div>
        </div>
    );
};

export default List;
