import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { Label } from '../ui/label'
import { useDispatch } from 'react-redux'
import { setSearchQuery } from '@/Redux/jobSlice'

const FilterData = [
   {
      filterType: "Location",
      array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Kolkata"]
   },
   {
      filterType: "Industry",
      array: ["Frontend Developer", "Backend Developer", "FullStack Developer", "Data Science"]
   },
   {
      filterType: "Salary",
      array: ["0-40k", "41-1lakh", "1lakh to 5lakh", "5lakh to 10lakh"]
   }

]


const FilterCard = () => {
   const [selectedValue,setSelectedValue] = useState('');
   const dispatch = useDispatch();

   const handleChange = (value)=>{
      setSelectedValue(value);
   }
   useEffect(()=>{
      dispatch(setSearchQuery(selectedValue))
   },[selectedValue])
   return (
      <div className='mx-10 w-full rounded-md bg-white p-3'>
         <h1 className='font-bold text-lg'>Filter Jobs</h1>
         <hr className='mt-3' />
         <div>
            <RadioGroup value={selectedValue} onValueChange={handleChange}>
               {
                  FilterData.map((item, index) => (
                     <div key={index}>
                        <h1 className='text-lg font-bold' >{item.filterType}</h1>
                        {
                           item.array.map((data, idx) => {
                              const itemId = `id${index} - ${idx}`
                              return (
                                 <div className='flex items-center space-x-2 my-2' key={idx} >
                                    <RadioGroupItem value={data} id={itemId} />
                                    <Label htmlFor={itemId}>{data}</Label>
                                 </div>
                              )
                           })
                        }
                     </div>
                  ))
               }
            </RadioGroup>
         </div>
      </div>
   )
}

export default FilterCard
