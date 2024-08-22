import React, { useEffect } from 'react'
import Navbar from '../Shared/Navbar'
import Job from '../Jobs/Job';
import Footer from '../Home/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery } from '@/Redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';

// const randomJobs = [1, 2, 3,];

const Browse = () => {
   useGetAllJobs();
   const {allJobs} = useSelector(store=>store.Job);
   const dispatch = useDispatch();
   useEffect(()=>{
      return ()=>{
         dispatch(setSearchQuery(""));
      }
   },[])
   return (
      <div>
         <Navbar />
         <div className='max-w-7xl mx-auto my-10 px-24 '>
            <h1 className='font-bold text-xl my-6'>Search Result ({allJobs.length})</h1>
            <div className='grid grid-cols-3 gap-4'>
               {
                  allJobs.length <=0 ? (<span>No Jobs</span>) : allJobs.map((job) => {
                     return (
                        <Job key={job._id} job={job} />
                     )
                  })
               }
            </div>

         </div>
         <Footer />

      </div>
   )
}

export default Browse
