import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchQuery } from '@/Redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
   const [query,setQery] = useState("");
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const searchJobHandler = ()=>{
      dispatch(setSearchQuery(query));
      navigate('/browse');
   }

   return (
      <div className='text-center'>
         <div className='flex flex-col gap-4 my-8'>
            <span className='mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#f83002] font-medium'>N0. 1 Job Hunt Website.</span>
            <h1 className='text-5xl font-bold'>Search, Apply & <br /> <span className='text-[#6A38C2]'>Dream Jobs</span></h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur et, ducimus ea doloribus.</p>
            <div className='flex w-[40%] shadow-lg items-center border border-gray-200 mx-auto pl-4 rounded-md rounded-r-full '>
               <input type="text" placeholder='Find your dream job' className='outline-none border-none w-full p-2'
               onChange={(e)=>setQery(e.target.value)}
                />
               <Button onClick={searchJobHandler} className="rounded-r-full bg-[#6A38C2]">
                  <Search />
               </Button>
            </div>
         </div>

      </div>
   )
}

export default HeroSection
