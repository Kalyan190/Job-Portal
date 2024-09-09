// AdminJobsTable.jsx
import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Delete, Edit2, Eye, MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import { API } from '@/utils/constant';
import useGetAppliedJob from '@/hooks/useGetAppliedJob';

const AdminJobsTable = () => {
   const { allAdminJobs, searchTextByAdminJobs } = useSelector((store) => store.Job);
   const { user } = useSelector((store) => store.auth);
   const navigate = useNavigate();
   const [refetch, setRefetch] = useState(false); // State to trigger refetch

   // Use the custom hook to fetch applied jobs with a refetch dependency
   const refetchJobs = useGetAppliedJob(refetch);

   const [filterAdminJobs, setFilterAdminJobs] = useState(allAdminJobs);

   useEffect(() => {
      const filterJobs = allAdminJobs.filter((jobs) => {
         if (!searchTextByAdminJobs) {
            return true;
         }
         return (
            jobs?.title?.toLowerCase().includes(searchTextByAdminJobs.toLowerCase()) ||
            jobs?.company?.name.toLowerCase().includes(searchTextByAdminJobs.toLowerCase())
         );
      });

      setFilterAdminJobs(filterJobs);
   }, [allAdminJobs, searchTextByAdminJobs]);

   const deleteHandler = async (jobId) => {
      try {
         if (!window.confirm('Are you sure you want to delete this job?')) return;

         const response = await axios.delete(`${API}/api/v1/job/delete/${jobId}`, {
            headers: {
               Authorization: `Bearer ${user.token}`,
            },
            withCredentials: true,
         });

         if (response.data.success) {
            toast.success(response.data.message || 'Job deleted successfully.');
            setFilterAdminJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));

            // Trigger refetch after deleting a job
            setRefetch((prev) => !prev);
         } else {
            toast.error(response.data.message || 'Failed to delete the job.');
         }
      } catch (error) {
         console.error('Error deleting job:', error);
         toast.error(error.response?.data?.message || 'Error deleting the job.');
      }
   };

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
               {filterAdminJobs?.map((job) => (
                  <TableRow key={job._id}>
                     <TableCell>{job?.company?.name}</TableCell>
                     <TableCell>{job?.title}</TableCell>
                     <TableCell>{job.createdAt.split('T')[0]}</TableCell>
                     <TableCell className="text-right">
                        <Popover>
                           <PopoverTrigger>
                              <MoreHorizontal />
                           </PopoverTrigger>
                           <PopoverContent className="w-32">
                              <div
                                 className="flex items-center gap-2 w-fit cursor-pointer"
                                 onClick={() => deleteHandler(job._id)}
                              >
                                 <Delete className="w-4" />
                                 <span>Delete</span>
                              </div>
                              <div
                                 className="flex items-center gap-2 w-fit cursor-pointer"
                                 onClick={() => navigate(`/admin/job/edit/${job._id}`)}
                              >
                                 <Edit2 className="w-4" />
                                 <span>Edit</span>
                              </div>
                              <div
                                 className="flex items-center gap-2 w-fit cursor-pointer"
                                 onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                              >
                                 <Eye className="w-4" />
                                 <span>Applicant</span>
                              </div>
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

export default AdminJobsTable;
