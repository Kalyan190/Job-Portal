import React, { useState } from 'react'
import Navbar from '../Shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '@/Redux/companySlice'
import { API } from '@/utils/constant'

const CompanyCreate = () => {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const [companyName , setCompanyName] = useState();


   const registerNewCompany = async()=>{
      try {
         const res = await axios.post(`${API}/api/v1/company/register`,{companyName},{
               headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${user.token}`, // Add the Bearer token here
               },
               withCredentials: true, // Ensure that cookies are sent with requests
            })
         if(res?.data?.success){
            dispatch(setSingleCompany(res.data.company))
            toast.success(res.data.message);
            const companyId = res?.data?.company?._id;
            navigate(`/admin/companies/${companyId}`);
         }
      } catch (error) {
         console.log(error);
         toast.error(error.response.data.message);
      }
   }


   return (
      <div>
         <Navbar />
         <div className='max-w-4xl mx-auto my-10'>
            <div className='my-10'>
               <h1 className='font-bold text-2xl'>Your Company Name</h1>
               <p className='text-gray-500'>What would you like to give your company name? you can change this later.</p>
            </div>
            <Label>Company Name</Label>
            <Input
               type="text"
               className="my-2"
               placeholder="Google, Microsoft etc."
               onChange={(e)=> setCompanyName(e.target.value)}
            />
            <div className='flex items-center gap-2 my-10'>
            <Button variant="outline" onClick={()=>navigate('/admin/companies')}>Cancel</Button>
            <Button onClick={registerNewCompany}>Continue</Button>
            </div>
         </div>

      </div>
   )
}

export default CompanyCreate
