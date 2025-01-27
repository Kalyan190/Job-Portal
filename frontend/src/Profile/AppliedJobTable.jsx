import Footer from '@/components/Home/Footer';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import React from 'react';
import { useSelector } from 'react-redux';

const AppliedJobTable = () => {
   const { allAppliedJobs } = useSelector((store) => store.Job);

   return (
      <div className=''>
         <Table>
            <TableCaption>A list of your applied jobs</TableCaption>
            <TableHeader>
               <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Job Role</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead className="text-right">Status</TableHead>
               </TableRow>
            </TableHeader>

            {allAppliedJobs.length <= 0 ? (
               <tfoot>
                  <TableRow>
                     <TableCell colSpan={4}>
                        <span>You haven't applied for any job yet.</span>
                     </TableCell>
                  </TableRow>
               </tfoot>
            ) : (
               <TableBody>
                  {allAppliedJobs.map((appliedJob) => (
                     <TableRow key={appliedJob?._id}>
                        <TableCell>{appliedJob?.createdAt.split("T")[0]}</TableCell>
                        <TableCell>{appliedJob?.job?.title}</TableCell>
                        <TableCell>{appliedJob?.job?.company?.name}</TableCell>
                        <TableCell className="text-right">
                           <Badge
                              className={`${appliedJob?.status === 'rejected'
                                    ? 'bg-red-500'
                                    : appliedJob?.status === 'pending'
                                       ? 'bg-gray-400'
                                       : 'bg-green-400'
                                 }`}
                           >
                              {appliedJob?.status.toUpperCase()}
                           </Badge>
                        </TableCell>
                     </TableRow>
                  ))}
               </TableBody>
            )}
         </Table>
      </div>
   );
};

export default AppliedJobTable;
