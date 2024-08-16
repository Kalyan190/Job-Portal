import Footer from '@/components/Home/Footer'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import React from 'react'

const AppliedJobTable = () => {
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

          <TableBody>
          {
            [1,2,3,4,5].map((item,index)=>(
                  <TableRow key={index}>
                  <TableCell>17-08-2024</TableCell>
                  <TableCell>Frontend Developer</TableCell>
                  <TableCell>Google</TableCell>
                  <TableCell className="text-right"><Badge>Pending</Badge></TableCell>
                  </TableRow>
            ))
          }
          </TableBody>
      </Table>
              
    </div>
      
    
  )
}

export default AppliedJobTable
