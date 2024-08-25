import React, { useState } from 'react';
import Navbar from '../Shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setSingleCompany } from '@/Redux/companySlice';
import { API } from '@/utils/constant';

const CompanyCreate = () => {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const [companyName, setCompanyName] = useState('');
   const [isLoading, setIsLoading] = useState(false); // State for loading indicator
   const { user } = useSelector(store => store.auth); // Get the user from the Redux store

   const registerNewCompany = async () => {
      if (!user || !user.token) {
         return;
      }

      setIsLoading(true); // Start loading
      try {
         const res = await axios.post(`${API}/api/v1/company/register`, { companyName }, {
            headers: {
               'Content-Type': 'application/json',
               'Authorization': `Bearer ${user.token}`, // Add the Bearer token here
            },
            withCredentials: true, // Ensure that cookies are sent with requests
         });

         if (res?.data?.success) {
            dispatch(setSingleCompany(res.data.company));
            toast.success(res.data.message);
            const companyId = res?.data?.company?._id;
            navigate(`/admin/companies/${companyId}`);
         }
      } catch (error) {
         console.log(error);
         toast.error(error?.response?.data?.message || "Something went wrong");
      } finally {
         setIsLoading(false); // End loading
      }
   };

   return (
      <div>
         <Navbar />
         <div className='max-w-4xl mx-auto my-10'>
            <div className='my-10'>
               <h1 className='font-bold text-2xl'>Your Company Name</h1>
               <p className='text-gray-500'>What would you like to give your company name? You can change this later.</p>
            </div>
            <Label>Company Name</Label>
            <Input
               type="text"
               className="my-2"
               placeholder="Google, Microsoft etc."
               onChange={(e) => setCompanyName(e.target.value)}
               disabled={isLoading} // Disable input while loading
            />
            <div className='flex items-center gap-2 my-10'>
               <Button variant="outline" onClick={() => navigate('/admin/companies')} disabled={isLoading}>
                  Cancel
               </Button>
               <Button onClick={registerNewCompany} disabled={isLoading}>
                  {isLoading ? (
                     <div className="flex items-center">
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        <span className="ml-2">Registering...</span>
                     </div>
                  ) : (
                     'Continue'
                  )}
               </Button>
            </div>
            {isLoading && (
               <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
                  <div className="spinner-border text-white" role="status">
                     <span className="sr-only">Loading...</span>
                  </div>
               </div>
            )}
         </div>
      </div>
   );
};

export default CompanyCreate;
