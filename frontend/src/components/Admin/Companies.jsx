import React, { useEffect, useState } from 'react'
import Navbar from '../Shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import { useDispatch } from 'react-redux'
import { setSearchCompanyByText } from '@/Redux/companySlice'

const Companies = () => {
   useGetAllCompanies();
   const [inputData,setInput] = useState("");
   const navigate = useNavigate();
   const dispatch = useDispatch();

   useEffect(()=>{
       dispatch(setSearchCompanyByText(inputData));
   },[inputData])

  return (
    <div>
    <Navbar/>
        <div className='max-w-6xl mx-auto my-10 max-md:mx-4'>
           <div className='flex items-center justify-between my-5'>
              <Input className="w-fit max-md:w-32 " placeholder="Filter by name" onChange={(e) => setInput(e.target.value)} />
              <Button onClick={()=> navigate('/admin/companies/create')}  >New Company</Button>
           </div>
           <CompaniesTable/>
    </div>
      
    </div>
  )
}

export default Companies
