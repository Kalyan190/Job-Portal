import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, Eye, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const AdminJobsTable = () => {
   const {allAdminJobs,searchTextByAdminJobs} = useSelector(store=>store.Job)
   const navigate = useNavigate();

   const [filterAdminJobs, setFilterAdminJobs] = useState(allAdminJobs);

   useEffect(() => {
      const filterAdminJobs = allAdminJobs.length >= 0 && allAdminJobs.filter((jobs) => {
         if (!searchTextByAdminJobs) {
            return true;
         }
         return jobs?.title?.toLowerCase().includes(searchTextByAdminJobs.toLowerCase()) || jobs?.company?.name.toLowerCase().includes(searchTextByAdminJobs.toLowerCase())
      });

      setFilterAdminJobs(filterAdminJobs)

   }, [allAdminJobs, searchTextByAdminJobs]);
  
   return (
      <div>
         <Table>
            <TableCaption>A list of your recent posted jobs</TableCaption>
            <TableHeader>
               <TableRow>
                  <TableHead>Company Name</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Action</TableHead>
               </TableRow>
            </TableHeader>
            <TableBody>


               {
                  filterAdminJobs?.map((job) =>
                     <tr key={job._id}>
                        
                        <TableCell>
                           {job?.company?.name}
                        </TableCell>
                        <TableCell>
                           {job?.title}
                        </TableCell>

                        <TableCell>
                           {job.createdAt.split("T")[0]}
                        </TableCell>
                        <TableCell className="text-right">
                           <Popover>
                              <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                              <PopoverContent className="w-32">
                                 <div className='flex items-center gap-2 w-fit cursor-pointer' onClick={() => navigate(`/admin/job/${job._id}`)}>
                                    <Edit2 className='w-4' />
                                    <span>Edit</span>
                                 </div>
                                 <div className='flex items-center gap-2 w-fit cursor-pointer' onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}>
                                    <Eye className='w-4' />
                                    <span>Applicant</span>
                                 </div>
                              </PopoverContent>
                           </Popover>
                        </TableCell>
                     </tr>
                  )
               }




            </TableBody>
         </Table>

      </div>
   )
}

export default AdminJobsTable;
