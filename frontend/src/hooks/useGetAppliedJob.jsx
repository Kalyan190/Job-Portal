import { setAllAppliedJobs, setAllJobs } from '@/Redux/jobSlice'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'sonner'


const useGetAppliedJob = () => {
   const dispatch = useDispatch();
   useEffect(() => {
      const fetchAppliedJobs = async () => {
         try {
            const res = await axios.get('/api/v1/application/get', { withCredentials: true });
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