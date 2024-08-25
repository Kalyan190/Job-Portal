import React, { useState } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { MoreHorizontal, Loader2 } from 'lucide-react'; // Add a loading spinner icon
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import axios from 'axios';
import { API } from '@/utils/constant';

const shortlisting = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
   const { applicants } = useSelector(store => store.application);
   const { user } = useSelector(store => store.auth);
   const [loadingId, setLoadingId] = useState(null); // State to track which item is being updated

   const statusHandler = async (status, id) => {
      setLoadingId(id); // Set loading state for the current item
      try {
         const res = await axios.post(`${API}/api/v1/application/status/${id}/update`, { status }, {
            headers: {
               'Content-Type': 'application/json',
               'Authorization': `Bearer ${user.token}`, // Add the Bearer token here
            },
            withCredentials: true, // Ensure that cookies are sent with requests
         });

         if (res.data.success) {
            toast.success(res.data.message);
            // Optionally, you can update the UI here based on the response
         }

      } catch (error) {
         toast.error(error.response.data.message);
      } finally {
         setLoadingId(null); // Reset loading state
      }
   };

   return (
      <div>
         <Table>
            <TableCaption>A list of your recent applied users</TableCaption>
            <TableHeader>
               <TableRow>
                  <TableHead>FullName</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Resume</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Action</TableHead>
               </TableRow>
            </TableHeader>
            <TableBody>
               {applicants && applicants?.applications?.map((item) => (
                  <TableRow key={item._id}>
                     <TableCell>{item?.applicant?.fullname}</TableCell>
                     <TableCell>{item?.applicant?.email}</TableCell>
                     <TableCell>{item?.applicant?.phonenumber}</TableCell>
                     <TableCell>
                        {item?.applicant?.profile?.resume ? (
                           <a href={item?.applicant?.profile?.resume} target='_blank' rel="noopener noreferrer" className="underline text-blue-600 cursor-pointer">
                              {item?.applicant?.profile?.resumeOriginalName}
                           </a>
                        ) : (
                           <span>NA</span>
                        )}
                     </TableCell>
                     <TableCell>{item?.applicant?.createdAt.split("T")[0]}</TableCell>
                     <TableCell className="text-right">
                        <Popover>
                           <PopoverTrigger>
                              {loadingId === item._id ? (
                                 <Loader2 className="animate-spin" />
                              ) : (
                                 <MoreHorizontal />
                              )}
                           </PopoverTrigger>
                           <PopoverContent className="w-32">
                              {shortlisting.map((status, index) => (
                                 <div key={index} className='flex items-center justify-center cursor-pointer' onClick={() => statusHandler(status, item?._id)}>
                                    <span>{status}</span>
                                 </div>
                              ))}
                           </PopoverContent>
                        </Popover>
                     </TableCell>
                  </TableRow>
               ))}
            </TableBody>
         </Table>
      </div>
   );
};

export default ApplicantsTable;
