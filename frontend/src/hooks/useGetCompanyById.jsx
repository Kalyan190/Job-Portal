import { setSingleCompany } from '@/Redux/companySlice'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'sonner'
import { API } from '@/utils/constant'


const useGetCompanyById = (companyId) => {
   const dispatch = useDispatch();
   useEffect(() => {
      const fetchSingleCompany = async () => {
         try {
            const res = await axios.get(`${API}/api/v1/company/get/${companyId}`, {
               headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${user.token}`, // Add the Bearer token here
               },
               withCredentials: true, // Ensure that cookies are sent with requests
            });
            if (res.data.success) {
               dispatch(setSingleCompany(res.data.company))
            }
         } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
         }
      }
      fetchSingleCompany();
   }, [companyId,dispatch])
}

export default useGetCompanyById;
