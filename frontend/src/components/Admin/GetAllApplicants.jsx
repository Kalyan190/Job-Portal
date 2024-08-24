import React, { useEffect } from 'react'
import Navbar from '../Shared/Navbar'
import ApplicantsTable from './ApplicantsTable'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setAllApplicants } from '@/Redux/applicationSlice'
import { API } from '@/utils/constant'

const GetAllApplicants = () => {
   const params = useParams();
   const dispatch = useDispatch();
   const {applicants} = useSelector(store=>store.application);
   useEffect(()=>{
     const fetchAllApplicants = async()=>{
        try {
           const res = await axios.get(`${API}/api/v1/application/${params.id}/applicants`, {
              headers: {
                 'Content-Type': 'application/json',
                 'Authorization': `Bearer ${user.token}`, // Add the Bearer token here
              },
              withCredentials: true, // Ensure that cookies are sent with requests
           })
           
           if(res.data.success){
            dispatch(setAllApplicants(res.data.job))
           }
        } catch (error) {
          console.log(error);
        }
     }
     fetchAllApplicants();
   },[])  

   return (
      <div>
         <Navbar />
         <div className='max-w-6xl mx-auto'>
            <h1 className='font-bold text-xl my-5'>Applicants ({applicants?.applications?.length})</h1>
            <ApplicantsTable />
         </div>
      </div>
   )
}

export default GetAllApplicants
