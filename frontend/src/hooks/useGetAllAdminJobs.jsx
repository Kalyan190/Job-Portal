import { setAllAdminJobs} from '@/Redux/jobSlice'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'
import { API } from '@/utils/constant'


const useGetAllAdminJobs = () => {
   const dispatch = useDispatch();
   const {user} = useSelector(store=>store.auth);
   
   useEffect(() => {
      const fetchAllAdminJobs = async () => {
         try {
            const res = await axios.get(`${API}/api/v1/job/getadminjobs`,
               {
                  headers: {
                     'Content-Type': 'application/json',
                     'Authorization': `Bearer ${user.token}`, // Add the Bearer token here
                  },
                  withCredentials: true, // Ensure that cookies are sent with requests
               });
            if (res.data.success) {
               dispatch(setAllAdminJobs(res.data.jobs))
            }
         } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
         }
      }
      fetchAllAdminJobs();
   }, [])
}

export default useGetAllAdminJobs;
