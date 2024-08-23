import { setAllAppliedJobs, setAllJobs } from '@/Redux/jobSlice'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'sonner'
import { API } from '@/utils/constant'


const useGetAppliedJob = () => {
   const dispatch = useDispatch();
   useEffect(() => {
      const fetchAppliedJobs = async () => {
         try {
            const res = await axios.get(`${API}/api/v1/application/get`, {
               headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${user.token}`, // Add the Bearer token here
               },
               withCredentials: true, // Ensure that cookies are sent with requests
            });
            if (res.data.success) {
               dispatch(setAllAppliedJobs(res.data.application))
            }
         } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
         }
      }
      fetchAppliedJobs();
   }, [])
}

export default useGetAppliedJob;
