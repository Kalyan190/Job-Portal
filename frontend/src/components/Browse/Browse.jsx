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
         <div className='max-w-7xl mx-auto my-10 flex flex-col items-center justify-center '>
            <h1 className='font-bold text-xl my-6'>Search Result ({allJobs.length})</h1>
            <div className='md:grid max-md:grid-cols-2 max-sm:grid-cols-2 max-lg:grid-cols-2 max-xl:grid-cols-3 max-2xl:grid-cols-3 lg:gap-8 md:gap-10 gap-8 py-5 flex items-center justify-center flex-col'>
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
