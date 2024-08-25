import { setCompanies } from '@/Redux/companySlice';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { API } from '@/utils/constant';

const useGetAllCompanies = () => {
   const dispatch = useDispatch();
   const { user } = useSelector(store => store.auth);

   useEffect(() => {
      const fetchAllCompanies = async () => {
         if (!user || !user.token) {
            return;
         }

         try {
            const res = await axios.get(`${API}/api/v1/company/get`, {
               headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${user.token}`,
               },
               withCredentials: true,
            });
            if (res.data.success) {
               dispatch(setCompanies(res.data.companies));
            } else {
               toast.error("Failed to fetch companies");
            }
         } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || "Something went wrong");
         }
      };

      fetchAllCompanies();
   }, [user, dispatch]);

   return null;
};

export default useGetAllCompanies;
