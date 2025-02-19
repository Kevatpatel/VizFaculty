import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const View = () => {
    const { id } = useParams();
    const [faculty, setfaculty] = useState(null);

    useEffect(() => {
        const fetchFaculty = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:5000/api/faculty/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                        },
                    }
                );
                if (response.data.message) {
                    console.log(response.data.faculty); // Debug log
                    setfaculty(response.data.faculty);
                }
            } catch (error) {
                if (error.response && !error.response.data.message) {
                    alert(error.response.data.error);
                }
            }
        };
        fetchFaculty();
    }, [id]);

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            {faculty ? (
                <div className="max-w-3xl bg-white p-8 rounded-md shadow-md">
                    <h2 className="text-2xl font-bold mb-8 text-center">
                        Faculty Details
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex justify-center">
                            <img
                                src={`http://localhost:5000/${faculty.userId.profileImage}`}
                                className="rounded-full border w-72"
                                alt="Profile"
                            />
                        </div>
                        <div>
                            <div className="flex space-x-3 mb-5">
                                <p className="text-lg font-bold">Name:</p>
                                <p className="font-medium">{faculty.userId.name}</p>
                            </div>

                            <div className="flex space-x-3 mb-5">
                                <p className="text-lg font-bold">Faculty ID:</p>
                                <p className="font-medium">{faculty.FacultyId}</p>
                            </div>

                            <div className="flex space-x-3 mb-5">
                                <p className="text-lg font-bold">Date of Birth:</p>
                                <p className="font-medium">
                                    {new Date(faculty.dob).toLocaleDateString()}
                                </p>
                            </div>

                            <div className="flex space-x-3 mb-5">
                                <p className="text-lg font-bold">Gender:</p>
                                <p className="font-medium">{faculty.gender}</p>
                            </div>

                            <div className="flex space-x-3 mb-5">
                                <p className="text-lg font-bold">Department:</p>
                                <p className="font-medium">{faculty.department.dep_name}</p>
                            </div>

                            <div className="flex space-x-3 mb-5">
                                <p className="text-lg font-bold">Marital Status:</p>
                                <p className="font-medium">{faculty.userId.maritalStatus}</p>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
};

export default View;
