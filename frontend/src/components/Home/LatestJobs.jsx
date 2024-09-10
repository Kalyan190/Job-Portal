import React from 'react'
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux';


// const randomJobs = [1,2,3,4,5,6,7,8];


const LatestJobs = () => {
   const { allJobs } = useSelector(store => store.Job);


   return (
      <div className='md:max-w-6xl mx-auto flex flex-col items-center justify-center'>
         <h1 className='sm:text-4xl text-xl font-bold'><span className='text-[#6A38C2]'>Latest & Top</span> Job Openings</h1>

         <div className='md:grid max-md:grid-cols-2 max-sm:grid-cols-2 max-lg:grid-cols-2 max-xl:grid-cols-3 max-2xl:grid-cols-3 gap-4 py-5 flex items-center justify-center flex-col '>
            {
               allJobs?.length <= 0 ? <span>No Jobs Available</span> : allJobs?.slice(0, 6).map((job) => <LatestJobCards key={job._id} job={job} />)
            }
         </div>




      </div>
   )
}

export default LatestJobs
