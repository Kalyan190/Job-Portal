import React, { useEffect, useState } from 'react';
import Navbar from '../Shared/Navbar';
import Footer from '../Home/Footer';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { setSingleJob } from '@/Redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { API } from '@/utils/constant';
import {FadeLoader} from 'react-spinners' 

const JobDescription = () => {
   const params = useParams();
   const jobId = params.id;

   const dispatch = useDispatch();
   const { singleJob } = useSelector(store => store.Job);
   const { user } = useSelector(store => store.auth);

   const isInitiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;

   const [isApplied, setIsApplied] = useState(isInitiallyApplied);
   const [isLoading, setIsLoading] = useState(false);
   const [isloading, setisLoading] = useState(false);

   const applyJobHandler = async () => {
      try {
         setIsLoading(true);
         const res = await axios.get(`${API}/api/v1/application/apply/${jobId}`, {
            headers: {
               'Content-Type': 'application/json',
               'Authorization': `Bearer ${user.token}`,
            },
            withCredentials: true,
         });

         if (res.data.success) {
            setIsApplied(true);
            const updatedSingleJob = { ...singleJob, applications: [...singleJob.applications, { applicant: user?._id }] };
            dispatch(setSingleJob(updatedSingleJob));

            toast.success(res.data.message);
         }
      } catch (error) {
         console.log(error);
         toast.error(error.response?.data?.message || "Something went wrong");
      } finally {
         setIsLoading(false);
      }
   };

   useEffect(() => {
      const fetchSingleJob = async () => {
         try {
            setisLoading(true);
            const res = await axios.get(`${API}/api/v1/job/get/${jobId}`, {
               headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${user.token}`,
               },
               withCredentials: true,
            });

            if (res.data.success) {
               dispatch(setSingleJob(res.data.job));
               setIsApplied(res.data.job.applications.some(application => application.applicant === user?._id));
            }
         } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Please login the account");
         }finally{
            setisLoading(false);
         }
      };
      fetchSingleJob();
   }, [jobId, dispatch, user?._id]);

   return (
      <div>
         <Navbar />
         {
            isloading ? <span className='flex items-center justify-center max-w-5xl mx-auto mt-5 min-h-[65vh] text-blue-500'><FadeLoader color='#7209b7' /></span> : (
               <div className={`max-w-5xl mx-auto mt-5 min-h-[65vh]`}>
                  <div className='flex items-center justify-between'>
                     <div>
                        <h1 className='font-bold text-xl'>{singleJob?.title}</h1>
                        <div className='flex items-center gap-2 mt-4'>
                           <Badge className="font-bold text-blue-600" variant="ghost">{singleJob?.position} Positions</Badge>
                           <Badge className="font-bold text-[#F83002]" variant="ghost">{singleJob?.jobType}</Badge>
                           <Badge className="font-bold text-[#7209b7]" variant="ghost">{singleJob?.salary} Lpa</Badge>
                        </div>
                     </div>
                     <Button
                        variant="outline"
                        disabled={isApplied || isLoading}
                        onClick={isApplied || isLoading ? null : applyJobHandler}
                        className={`rounded-lg ${isApplied ? 'bg-gray-600 cursor-not-allowed' : 'hover:bg-[#7209b7] hover:text-white'}`}
                     >
                        {isLoading ? (
                           <div className="flex items-center">
                              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                              <span className="ml-2">Applying...</span>
                           </div>
                        ) : (
                           isApplied ? 'Already applied' : 'Apply Now'
                        )}
                     </Button>
                  </div>
                  <div className='my-5'>
                     <h1 className='border-b-2 border-b-gray-300 font-medium py-3'>Job Description</h1>
                     <div className='my-4'>
                        <h1 className='font-bold my-1'>Role: <span className='pl-4 font-normal text-gray-800'>{singleJob?.title}</span></h1>
                        <h1 className='font-bold my-1'>Location: <span className='pl-2 font-normal text-gray-800'>{singleJob?.location}</span></h1>
                        <h1 className='font-bold my-1'>Description: <span className='pl-2 font-normal text-gray-800'>{singleJob?.description}</span></h1>
                        <h1 className='font-bold my-1'>Experience: <span className='pl-2 font-normal text-gray-800'>{singleJob?.experienceLevel} yrs</span></h1>
                        <h1 className='font-bold my-1'>Salary: <span className='pl-2 font-normal text-gray-800'>{singleJob?.salary} LPA</span></h1>
                        <h1 className='font-bold my-1'>Total Applicants: <span className='pl-2 font-normal text-gray-800'>{singleJob?.applications?.length}</span></h1>
                        <h1 className='font-bold my-1'>Posted Date: <span className='pl-2 font-normal text-gray-800'>{singleJob?.createdAt.split("T")[0]}</span></h1>
                     </div>
                  </div>
               </div>
            )
         }
         
         <Footer />
      </div>
   );
};

export default JobDescription;
