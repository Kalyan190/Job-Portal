import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const CompaniesTable = () => {
   const navigate = useNavigate();
   const { companies, searchCompanyByText } = useSelector(store=>store.company);

   const [filterCompanies,setFilterCompanies] = useState(companies);

   useEffect(()=>{
      const filterCompany = companies.length >=0 && companies.filter((company)=>{
         if(!searchCompanyByText){
            return true;
         }
         return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase())
      });

      setFilterCompanies(filterCompany)

   }, [companies, searchCompanyByText]);
   console.log(filterCompanies);
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
            
               
                  {
                     filterCompanies?.map((company)=>
                        <tr key={company._id}>
                           <TableCell>
                              <Avatar>
                                 <AvatarImage src={company.logo} />
                              </Avatar>
                           </TableCell>
                           <TableCell>
                              {company.name}
                           </TableCell>
                           <TableCell>
                              {company.createdAt.split("T")[0]}
                           </TableCell>
                           <TableCell className="text-right">
                              <Popover>
                                 <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                 <PopoverContent className="w-32">
                                    <div className='flex items-center gap-2 w-fit cursor-pointer' onClick={()=>navigate(`/admin/companies/${company._id}`)}>
                                       <Edit2 className='w-4' />
                                       <span>Edit</span>
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

export default CompaniesTable