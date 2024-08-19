import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, MoreHorizontal } from 'lucide-react'

const CompaniesTable = () => {
   return (
      <div>
         <Table>
            <TableCaption>A list of your registered companies</TableCaption>
            <TableHeader>
               <TableRow>
                  <TableHead>Logo</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Action</TableHead>
               </TableRow>
            </TableHeader>
            <TableBody>
               <TableCell>
                  <Avatar>
                     <AvatarImage src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/company-logo-design-template-e089327a5c476ce5c70c74f7359c5898_screen.jpg?ts=1672291305" />
                  </Avatar>
               </TableCell>
               <TableCell>
                  Company name
               </TableCell>
               <TableCell>
                  19/08/2024
               </TableCell>
               <TableCell className="text-right">
                  <Popover>
                  <PopoverTrigger><MoreHorizontal/></PopoverTrigger>
                     <PopoverContent className="w-32">
                        <div className='flex items-center gap-2 w-fit cursor-pointer'>
                           <Edit2 className='w-4' />
                           <span>Edit</span>
                        </div>
                     </PopoverContent>
                  </Popover>
               </TableCell>
            </TableBody>
         </Table>

      </div>
   )
}

export default CompaniesTable
