import React, { useEffect, useState } from 'react'
import { fetchDepartments } from './FacultyHelper.jsx';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Add = () => {
    const[departments,setDepartments] = useState([])
    const[formData,setFormData] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
        const getDepartments = async() =>{
            
            const departments = await fetchDepartments();
            setDepartments(departments)
        }
       getDepartments();

    }, []);

    const handleChange = (e) =>{
        const {name,value,files} = e.target
        if(name === 'image'){
            setFormData((prevData) => ({...prevData,[name] : files[0]}))
            }else{
                setFormData((prevData) => ({...prevData,[name] : value}))
            }
        }

    const handleSubmit = async(e) =>{
        e.preventDefault();

        const formDataObj = new FormData()
        Object.keys(formData).forEach((key) => {
            formDataObj.append(key, formData[key])
        })

    try {
        const responnse = await axios.post("http://localhost:5000/api/faculty/add", 
            formDataObj,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        if (responnse.data.message) {
           navigate("/admin-dashboard/faculties")
        }
    } catch (error) {
        if (error.responnse && !error.responnse.data.message) {
            alert(error.response.data.error);
        }
    }
}

    return (
        <div className="max-w-4x1 mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
            <h2 className="text-2x1 text-white font-bold mb-6">Add New Faculty</h2>
            <form onSubmit={handleSubmit}>
                <div className="grid grid=cols-1 md:grid-cols-2 gap-4">
                    {/* Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            onChange={handleChange}
                            placeholder="Insert Name"
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                            required
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            onChange={handleChange}
                            placeholder="Insert Email"
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    {/* Faculty-id */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Faculty Id
                        </label>
                        <input
                            type="text"
                            name="FacultyId"
                            placeholder="Faculty Id"
                            onChange={handleChange}
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                            required
                        />
                    </div>

                    {/* DOB */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Date of Birth
                        </label>
                        <input
                            type="Date"
                            name="dob"
                            placeholder="DOB"
                            onChange={handleChange}
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                            required
                        />
                    </div>

                    {/* Gender */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Gender
                        </label>
                        <select
                            name="gender"
                            onChange={handleChange}
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                            required >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    {/* Marital status*/}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Marital status
                        </label>
                        <select
                            name="MaritalStatus"
                            onChange={handleChange}
                            placeholder="Marital status"
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                            required >
                            <option value="">Select Staus</option>
                            <option value="male">Single</option>
                            <option value="female">Married</option>
                        </select>
                    </div>

                    {/* Designation */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Designation
                        </label>
                        <input
                            type="text"
                            name="designation"
                            onChange={handleChange}
                            placeholder="Designation"
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                            required
                        />
                    </div>

                    {/* Department */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Department
                        </label>
                        <select
                            name="department"
                            onChange={handleChange}
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                            required
                        >
                            <option value="">Select Department</option>
                            {departments.map((dep) =>(
                                <option key ={dep.id} value={dep._id}> {dep.dep_name}</option>
                            ))}

                        </select>
                    </div>

                    {/* Salary */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Salary
                        </label>
                        <input
                            type="number"
                            name="salary"
                            onChange={handleChange}
                            placeholder="Salary"
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                            required
                        />
                    </div>

                    {/* Passsword */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            placeholder="***"
                            onChange={handleChange}
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                            required
                        />
                    </div>

                    {/* Role */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Role
                        </label>
                        <select
                            name="role"
                            onChange={handleChange}
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                            required
                        >
                            <option value="">Select Role</option>
                            <option value="admin">Admin</option>
                            <option value="employee">Faculty</option>
                        </select>
                    </div>

                    {/* Image Upload */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Upload Image
                        </label>
                        <input
                            type="file"
                            name="image"
                            onChange={handleChange}
                            placeholder="Upload Image"
                            accept="image/*"
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4"
                >
                    Add Faculty
                </button>
            </form>
        </div>

    );
};
export default Add;