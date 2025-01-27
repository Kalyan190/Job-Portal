import React, { useEffect, useState } from 'react';
import Navbar from '../Shared/Navbar';
import FilterCard from './FilterCard';
import Job from './Job';
import Footer from '../Home/Footer';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

const Jobs = () => {
   const { allJobs, searchQuery } = useSelector(store => store.Job);
   const [filterJobs, setFilterJobs] = useState(allJobs);

   useEffect(() => {
      if (searchQuery) {
         const filteredJobs = allJobs.filter((job) => {
            return job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
               job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
               job.location.toLowerCase().includes(searchQuery.toLowerCase());
         });
         setFilterJobs(filteredJobs);
      } else {
         setFilterJobs(allJobs);
      }
   }, [allJobs, searchQuery]);

   return (
      <div>
         <Navbar />

         <div className='max-w-7xl mx-auto mt-5 px-4'>
            <div className='flex gap-5 max-sm:flex-wrap'>
               <div className=''>
                  <FilterCard />
               </div>

               {filterJobs?.length <= 0 ? (
                  <span>Job not found..</span>
               ) : (
                     <div className='flex items-center justify-center w-full min-h-[88vh] overflow-y-auto sm:p-5 my-5  '>
                     <div className='grid gap-10 max-sm:grid-cols-1  max-md:grid-cols-1 max-lg:grid-cols-1 max-xl:grid-cols-2 max-2xl:grid-cols-3 mx-auto'>
                        {filterJobs?.map((job) => (
                           <motion.div key={job?._id}
                              initial={{ opacity: 0, x: 100 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -100 }} 
                              transition={{ duration: 0.3 }}
                           >
                              <Job job={job} />
                           </motion.div>
                        ))}
                     </div>
                  </div>
               )}
            </div>
         </div>
         <Footer />
      </div>
   );
};

export default Jobs;
