import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import axios from 'axios';

const shortlisting = ["Accepted", "Rejected"];
const ApplicantsTable = () => {
   const { applicants } = useSelector(store => store.application);
   const statusHandler = async(status,id)=>{
      try {
         const res = await axios.post(`/api/v1/application/status/${id}/update`,{status},{withCredentials:true});

         if(res.data.success){
            toast.success(res.data.message);
         }
         
      } catch (error) {
         toast.error(error.response.data.message);
      }
   }

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
               {
                  applicants && applicants?.applications?.map((item) => (
                     <tr key={item._id}>
                        <TableCell>{item?.applicant?.fullname}</TableCell>
                        <TableCell>{item?.applicant?.email}</TableCell>
                        <TableCell>{item?.applicant?.phonenumber}</TableCell>
                        <TableCell>
                        {
                              item?.applicant?.profile.resume ? (<a href={item?.applicant?.profile?.resume} target='_blank' rel="noopener noreferrer" className="underline text-blue-600 cursor-pointer">{item?.applicant?.profile?.resumeOriginalName}</a>):(<span>NA</span>)
                        }
                        
                        </TableCell>
                        <TableCell>{item?.applicant?.createdAt.split("T")[0]}</TableCell>
                        <TableCell className="text-right">
                           <Popover>
                              <PopoverTrigger>
                                 <MoreHorizontal />
                              </PopoverTrigger>
                              <PopoverContent className="w-32">
                                 {
                                    shortlisting.map((status, index) => {
                                       return (
                                          <div key={index} className='flex items-center justify-center cursor-pointer' onClick={()=>statusHandler(status,item?._id)} ><span>{status}</span></div>
                                       )
                                    })
                                 }
                              </PopoverContent>
                           </Popover>

                        </TableCell>

                     </tr>
                  ))
               }

            </TableBody>
         </Table>

      </div>
   )
}

export default ApplicantsTable
