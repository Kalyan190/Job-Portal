import { setCompanies } from '@/Redux/companySlice'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'sonner'
import { API } from '@/utils/constant'


const useGetAllCompanies = () => {
   const dispatch = useDispatch();
   useEffect(() => {
      const fetchAllCompanies = async () => {
         try {
            const res = await axios.get(`${API}/api/v1/company/get`, { withCredentials: true });
            if (res.data.success) {
               dispatch(setCompanies(res.data.companies))
            }
         } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
         }
      }
      fetchAllCompanies();
   }, [])
}

export default useGetAllCompanies;
