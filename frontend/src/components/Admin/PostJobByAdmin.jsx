import React, { useState } from 'react'
import Navbar from '../Shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Loader2 } from 'lucide-react'
import { Button } from '../ui/button'
import { useSelector } from 'react-redux'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import axios from 'axios'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { API } from '@/utils/constant'

// const companyArray = [0, 1, 2];

const PostJobByAdmin = () => {
   const [loading, setLoading] = useState(false);
   const [inpuData, setinputData] = useState({
      title: "",
      description: "",
      requirements: "",
      salary: "",
      location: "",
      jobType: "",
      experience: "",
      position: 0,
      companyId: ""
   })
   const eventHandler = (e) => {
      setinputData({ ...inpuData, [e.target.name]: e.target.value });
   }
   const selectChangeHandler = (value)=>{
      const selectCompany = companies.find((company)=> company.name.toLowerCase() === value);
      setinputData({...inpuData,companyId:selectCompany._id})
   }

   const { companies } = useSelector(store => store.company);
   const navigate = useNavigate();
   
   const submitHandler = async(e)=>{
      e.preventDefault();
      console.log("formData : ",inpuData);
   //   const formData = new FormData();
   //   formData.append('title',inpuData.title);

      try {
         setLoading(true);
         const res = await axios.post(`${API}/api/v1/job/post`, inpuData, {
            headers: {
               'Content-Type': 'application/json',
               'Authorization': `Bearer ${user.token}`, // Add the Bearer token here
            },
            withCredentials: true, // Ensure that cookies are sent with requests
         })

         if(res.data.success){
            toast.success(res.data.message);
            navigate('/admin/jobs')
         }
         
      } catch (error) {
         console.log(error);
         toast.error(error.response.data.message)
         
      }finally{
         setLoading(false);
      }
      
   }

   return (
      <div>
         <Navbar />
         <div className='flex items-center justify-center w-screen my-5'>
            <form className='p-8 max-w-4xl border border-gray-200 shadow-lg rounded-md' onSubmit={submitHandler} >
               <div className='grid grid-cols-2 gap-2'>
                  <div>
                     <Label>Title</Label>
                     <Input
                        type="text"
                        name="title"
                        value={inpuData.title}
                        onChange={eventHandler}
                        className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                     />
                  </div>
                  <div>
                     <Label>Description</Label>
                     <Input
                        type="text"
                        name="description"
                        value={inpuData.description}
                        onChange={eventHandler}
                        className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                     />
                  </div>
                  <div>
                     <Label>Requirements</Label>
                     <Input
                        type="text"
                        name="requirements"
                        value={inpuData.requirements}
                        onChange={eventHandler}
                        className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                     />
                  </div>
                  <div>
                     <Label>Salary</Label>
                     <Input
                        type="text"
                        name="salary"
                        value={inpuData.salary}
                        onChange={eventHandler}
                        className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                     />
                  </div>
                  <div>
                     <Label>Location</Label>
                     <Input
                        type="text"
                        name="location"
                        value={inpuData.location}
                        onChange={eventHandler}
                        className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                     />
                  </div>
                  <div>
                     <Label>Job Type</Label>
                     <Input
                        type="text"
                        name="jobType"
                        value={inpuData.jobType}
                        onChange={eventHandler}
                        className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                     />
                  </div>
                  <div>
                     <Label>Experience Level</Label>
                     <Input
                        type="text"
                        name="experience"
                        value={inpuData.experience}
                        onChange={eventHandler}
                        className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                     />
                  </div>
                  <div>
                     <Label>No. Of Position</Label>
                     <Input
                        type="number"
                        name="position"
                        value={inpuData.position}
                        onChange={eventHandler}
                        className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                     />
                  </div>
                  <div>
                     {
                        companies.length >= 0 && (
                           <Select onValueChange={selectChangeHandler}>
                              <SelectTrigger>
                                 <SelectValue placeholder={'Select a Company'} />
                              </SelectTrigger>
                              <SelectContent>
                                 <SelectGroup>
                                    {
                                       companies.map((company) => {
                                          return (
                                             <SelectItem key={company._id} value={company?.name.toLowerCase()}>
                                                {company?.name}
                                             </SelectItem>
                                          )
                                       })
                                    }
                                 </SelectGroup>
                              </SelectContent>
                           </Select>
                        )
                     }
                  </div>

               </div>
               {
                  loading ? <Button className="w-full my-4"><Loader2 className='mr-2 h-4 w-4 animate-spin' />Please wait..</Button> : <Button type="submit" className="w-full my-4">Post New Job</Button>
               }
               {
                  companies.length === 0 && <p className='text-xs text-red-600 font-bold text-center'>*Please register a company first, before posting a jobs</p>
               }
            </form>

         </div>

      </div>
   )
}

export default PostJobByAdmin
