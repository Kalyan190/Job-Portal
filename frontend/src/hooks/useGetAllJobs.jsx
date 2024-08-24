import { setAllJobs } from '@/Redux/jobSlice'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'
import { API } from '@/utils/constant'


const useGetAllJobs = () => {
   const dispatch = useDispatch();
   const {searchQuery} = useSelector(store=>store.Job);
   const {user} = useSelector(store=>store.auth);
    
   // https://backend-job-lsmb.onrender.com/api/v1/job/get?keyword=
  
      useEffect(() => {
         const fetchAllJobs = async () => {
            try {
               const res = await axios.get(
                  `${API}/api/v1/job/get?keyword=${searchQuery}`,
                  {
                     headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.token}`, // Add the Bearer token here
                     },
                     withCredentials: true, // Ensure that cookies are sent with requests
                  }
               );
               if (res.data.success) {
                  dispatch(setAllJobs(res.data.jobs))
               }
            } catch (error) {
               console.log(error);
               console.log("toast error");
               toast.error(error?.response?.data?.message);
            }
         }
         fetchAllJobs();
      }, [user])
   
   
}

export default useGetAllJobs
