import React, { useState, useEffect } from 'react'
import Navbar from '../Shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Loader2, MoveLeft } from 'lucide-react'
import { Button } from '../ui/button'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { toast } from 'sonner'
import { useNavigate, useParams } from 'react-router-dom'
import { API } from '@/utils/constant'

const EditPostJob = () => {
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
   });

   const { user } = useSelector(store => store.auth);
   const { companies } = useSelector(store => store.Job);
   const navigate = useNavigate();
   const { id } = useParams(); // Assuming jobId is passed as a URL parameter


   useEffect(() => {
      const fetchJobData = async () => {
         try {
            setLoading(true);
            const res = await axios.get(`${API}/api/v1/job/get/${id}`, {
               headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${user.token}`
               },
               withCredentials:true,
            });

            if (res.data.success) {
               // Ensure all fields are defined in the response to avoid controlled/uncontrolled input issues
               const jobData = {
                  title: res.data.job.title || "",
                  description: res.data.job.description || "",
                  requirements: res.data.job.requirements || "",
                  salary: res.data.job.salary || "",
                  location: res.data.job.location || "",
                  jobType: res.data.job.jobType || "",
                  experience: res.data.job.experienceLevel || "",
                  position: res.data.job.position !== undefined ? res.data.job.position : 0,
                  companyId: res.data.job.company || ""
               };
               setinputData(jobData);
            } else {
               toast.error('Failed to load job data.');
            }
         } catch (error) {
            toast.error('Error fetching job data.');
            console.error(error);
         } finally {
            setLoading(false);
         }
      };

      fetchJobData();
   }, [id, user.token]);


   const eventHandler = (e) => {
      setinputData({ ...inpuData, [e.target.name]: e.target.value });
   };

   const submitHandler = async (e) => {
      e.preventDefault();
      

      if (!inpuData.title || !inpuData.description || !inpuData.requirements || !inpuData.salary || !inpuData.location || !inpuData.jobType || !inpuData.position || !inpuData.companyId) {
         toast.error("All fields are required.");
         return;
      }

     

      try {
         setLoading(true);
         console.log(inpuData);
         const res = await axios.put(`${API}/api/v1/job/edit/${id}`, inpuData, {
            headers: {
               'Content-Type': 'application/json',
               'Authorization': `Bearer ${user.token}`
            },
            withCredentials: true
         });

         if (res.data.success) {
            toast.success(res.data.message);
            navigate('/admin/jobs');
         }

      } catch (error) {
         console.log(error);
         toast.error(error.response.data.message);

      } finally {
         setLoading(false);
      }
   };

   return (
      <div>
         <Navbar />
         <div className='flex items-center justify-center w-screen my-5'>

            <form className='px-8 max-w-4xl border border-gray-200 shadow-lg rounded-md' onSubmit={submitHandler}>
               <Button className="flex items-center gap-2 justify-center my-2" onClick={() => navigate('/admin/jobs')}>
                  <MoveLeft className='w-4' /> <span>Back</span>
               </Button>
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
               </div>
               {
                  loading ? <Button className="w-full my-4"><Loader2 className='mr-2 h-4 w-4 animate-spin' />Please wait..</Button> : <Button type="submit" className="w-full my-4">Update Post Job</Button>
               }
            </form>

         </div>
      </div>
   )
}

export default EditPostJob;
