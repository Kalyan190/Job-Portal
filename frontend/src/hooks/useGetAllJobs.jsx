import { setAllJobs } from '@/Redux/jobSlice';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { API } from '@/utils/constant';

const useGetAllJobs = () => {
   const dispatch = useDispatch();
   const { searchQuery } = useSelector((store) => store.Job);
   const { user } = useSelector((store) => store.auth);

   useEffect(() => {
      const fetchAllJobs = async () => {
         if (!user || !user.token) {
            toast.error("User is not authenticated");
            return;
         }

         try {
            const res = await axios.get(
               `${API}/api/v1/job/get?keyword=${searchQuery}`,
               {
                  headers: {
                     'Content-Type': 'application/json',
                     'Authorization': `Bearer ${user.token}`,
                  },
                  withCredentials: true,
               }
            );
            if (res.data.success) {
               dispatch(setAllJobs(res.data.jobs));
            } else {
               toast.error("Failed to fetch jobs");
            }
         } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || "Something went wrong");
         }
      };
      fetchAllJobs();
   }, [dispatch, searchQuery, user]);
};

export default useGetAllJobs;
