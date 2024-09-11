import React, { useEffect, useState } from 'react'
import Navbar from '../Shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import AdminJobsTable from './AdminJobsTable'
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs'
import { setSearchByAdminJobs } from '@/Redux/jobSlice'

const AdminJobs = () => {
    useGetAllAdminJobs();
    const [input,setInput] = useState("");
   
   const navigate = useNavigate();
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(setSearchByAdminJobs(input));
   }, [input])

   return (
      <div>
         <Navbar />
         <div className='max-w-6xl mx-auto my-10 max-lg:mx-4'>
            <div className='flex items-center justify-between my-5'>
               <Input className="w-fit max-md:w-36 " placeholder="Filter by name or role" onChange={(e) => setInput(e.target.value)} />
               <Button onClick={() => navigate('/admin/jobs/create')} className='max-md:w-28' >Post New Jobs</Button>
            </div>
            <AdminJobsTable/>
         </div>

      </div>
   )
}

export default AdminJobs;
