import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import DataTable from 'react-data-table-component'
import { columns, DepartmentButton } from './DepartmentHelper'
const DepartmentList = () => {
const [departments,setDepartments]=useState([]);
const [depLoading,setDepLoading]=useState(false)
const [filteredDepartments,setFilteredDepartments]=useState([])

const onDepartmentDelete = async (id)=>{
    const data= departments.filter(dep=>dep._id!==id)
    setDepartments(data)
    
}

    useEffect(()=>{

        const fetchDepartments=async()=>{
            setDepLoading(true)
            try{
              const response = await axios.get("http://localhost:5000/api/department",{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token')}`
                },
              })
             if(response.data.message){
                console.log("data")
                let sno=1;
                const data=await response.data.departments.map((dep)=>({
                    
                        _id: dep._id,
                        sno: sno++,
                        dep_name: dep.dep_name,
                        action : <DepartmentButton Id={dep._id} onDepartmentDelete={onDepartmentDelete}/>,

                    
                }));
                setDepartments(data);
                setFilteredDepartments(data)
             }
            }catch(error){
                if(error.response && !error.response.data.message){
                    alert(error.response.data.error)
                }
            }finally{
                setDepLoading(false)
            }
        }
        fetchDepartments();

    },[])

    const filterDepartments = (e)=>{
        const records=departments.filter((dep)=>
            dep.dep_name.toLowerCase().includes(e.target.value.toLowerCase()))
            setFilteredDepartments(records)
        }
    
    return (
        <>{depLoading ? <div>Loading....!</div>:
        <div className='p-5'>
            <div className='text-center'>
                <h3 className='text-2xl font-bold'>Manage Department</h3>
            </div>
            <div className='flex justify-between items-center'>
      <input type="text" placeholder="Search by dept-name" className="px-4 py-0.5 border" onChange={filterDepartments}/>
      <Link to="/admin-dashboard/add-department" className="px-4 py-1 bg-teal-600 rounded text-white">
        Add new department
       </Link>  
       </div>
       <div>
        <DataTable
        columns={columns} data={filteredDepartments} />
        
        </div>

        </div>
       }</>
    );
}

export default DepartmentList