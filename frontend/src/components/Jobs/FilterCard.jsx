import React, { useEffect, useState } from 'react';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';
import { useDispatch } from 'react-redux';
import { setSearchQuery } from '@/Redux/jobSlice';
import { Button } from '../ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const FilterData = [
   {
      filterType: "Location",
      array: ["Bengaluru", "Hyderabad", "Pune", "Kolkata"]
   },
   {
      filterType: "Industry",
      array: ["Frontend Developer", "Backend Developer", "FullStack Developer", "Data Science"]
   },
   {
      filterType: "Salary",
      array: ["0-40k", "41-1lakh", "1lakh to 5lakh", "5lakh to 10lakh"]
   }
];

const FilterCard = () => {
   const [selectedValue, setSelectedValue] = useState('');
   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
   const [isMobile, setIsMobile] = useState(window.innerWidth < 650); // Track if the user is on mobile
   const dispatch = useDispatch();

   const handleChange = (value) => {
      setSelectedValue(value);
   };

   const clearFilter = () => {
      setSelectedValue('');
   };

   useEffect(() => {
      dispatch(setSearchQuery(selectedValue));
   }, [selectedValue, dispatch]);

   const toggleSidebar = () => {
      if (isMobile) {
         setIsSidebarOpen(prevState => !prevState);
      }
   };

   useEffect(() => {
      const handleResize = () => {
         const mobile = window.innerWidth < 650;
         setIsMobile(mobile);
         if (!mobile) {
            setIsSidebarOpen(true); // Automatically open the sidebar on desktop
         }
      };

      // Initial check
      handleResize();

      // Add event listener
      window.addEventListener('resize', handleResize);

      // Cleanup event listener
      return () => {
         window.removeEventListener('resize', handleResize);
      };
   }, []);

   return (
      <div className={`transition-all duration-300 ${isSidebarOpen || !isMobile ? 'w-64' : 'w-16'} bg-white rounded-md shadow p-3`}>
         <div className="flex items-center justify-between">
            <h1 className={`text-lg font-bold ${!isSidebarOpen && 'hidden'}`}>Filter Jobs</h1>
            {isMobile && (
               <Button
                  onClick={toggleSidebar}
                  variant="outline"
                  size="icon"
               >
                  {isSidebarOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
               </Button>
            )}
         </div>
         {isSidebarOpen  && (
            <>
               <hr className="my-3" />
               <RadioGroup value={selectedValue} onValueChange={handleChange}>
                  {FilterData.map((item, index) => (
                     <div key={index} className="mb-4">
                        <h1 className="text-lg font-bold">{item.filterType}</h1>
                        {item.array.map((data, idx) => {
                           const itemId = `id${index}-${idx}`;
                           return (
                              <div className="flex items-center space-x-2 my-2" key={idx}>
                                 <RadioGroupItem value={data} id={itemId} />
                                 <Label htmlFor={itemId} className="cursor-pointer">{data}</Label>
                              </div>
                           );
                        })}
                     </div>
                  ))}
               </RadioGroup>
               <Button
                  onClick={clearFilter}
                  variant="outline"
                  className="mt-4"
               >
                  Clear Filter
               </Button>
            </>
         )}
      </div>
   );
};

export default FilterCard;
