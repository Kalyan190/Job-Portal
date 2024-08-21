import React, { useEffect } from 'react'
import Navbar from '../Shared/Navbar'
import ApplicantsTable from './ApplicantsTable'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setAllApplicants } from '@/Redux/applicationSlice'

const GetAllApplicants = () => {
   const params = useParams();
   const dispatch = useDispatch();
   const {applicants} = useSelector(store=>store.application);
   useEffect(()=>{
     const fetchAllApplicants = async()=>{
        try {
           const res = await axios.get(`/api/v1/application/${params.id}/applicants`,{
            withCredentials:true
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
