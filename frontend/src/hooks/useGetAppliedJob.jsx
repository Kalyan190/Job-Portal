// useGetAppliedJob.jsx
import { setAllAppliedJobs } from '@/Redux/jobSlice';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { API } from '@/utils/constant';

const useGetAppliedJob = (refetch) => {
   const dispatch = useDispatch();
   const { user } = useSelector((store) => store.auth);
   const [trigger, setTrigger] = useState(false); // State to control refetching

   useEffect(() => {
      const fetchAppliedJobs = async () => {
         if (!user || !user.token) {
            return;
         }

         try {
            const res = await axios.get(`${API}/api/v1/application/get`, {
               headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${user.token}`,
               },
               withCredentials: true,
            });
            if (res.data.success) {
               dispatch(setAllAppliedJobs(res.data.application));
            } else {
               toast.error("Failed to fetch applied jobs");
            }
         } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || "Something went wrong");
         }
      };

      // Fetch when the component mounts and when `refetch` changes
      fetchAppliedJobs();
   }, [user, dispatch, trigger, refetch]); // added `refetch` and `trigger` as dependencies

   // Function to trigger refetch
   const refetchJobs = () => setTrigger(!trigger);

   return refetchJobs;
};

export default useGetAppliedJob;
