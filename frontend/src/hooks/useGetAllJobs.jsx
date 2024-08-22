import { setAllJobs } from '@/Redux/jobSlice'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'


const useGetAllJobs = () => {
   const dispatch = useDispatch();
   const {searchQuery} = useSelector(store=>store.Job);
    useEffect(()=>{
      const fetchAllJobs = async()=>{
         try {
            const res = await axios.get(`/api/v1/job/get?keyword=${searchQuery}`,{withCredentials:true});
            if(res.data.success){
               dispatch(setAllJobs(res.data.jobs))
            }
         } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
         }
      }
      fetchAllJobs();
    },[])
}

export default useGetAllJobs
