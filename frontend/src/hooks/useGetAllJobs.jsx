import { setAllJobs } from '@/Redux/jobSlice'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'sonner'


const useGetAllJobs = () => {
   const dispatch = useDispatch();
    useEffect(()=>{
      const fetchAllJobs = async()=>{
         try {
            const res = await axios.get('/api/v1/job/get',{withCredentials:true});
            if(res.data.success){
               dispatch(setAllJobs(res.data.jobs))
            }
         } catch (error) {
            console.log(error);
            toast.error()
         }
      }
      fetchAllJobs();
    },[])
}

export default useGetAllJobs
