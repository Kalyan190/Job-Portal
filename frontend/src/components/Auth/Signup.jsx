import React, { useEffect, useState } from 'react'
import Navbar from '../Shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/Redux/authSlice'
import { Loader2 } from 'lucide-react'
import { API } from '@/utils/constant'
import Footer from '../Home/Footer'

const Signup = () => {
   const [input, setInput] = useState({
      fullName: "",
      email: "",
      phoneNumber: "",
      password: "",
      role: "",
      file: ""
   });

   const navigate = useNavigate()

   const changeEventHandler = (e) => {
      setInput({ ...input, [e.target.name]: e.target.value });
   }

   const changeFileHandler = (e) => {
      setInput({ ...input, file: e.target.files?.[0] })
   }

   const dispatch = useDispatch();
   const { loading, user } = useSelector(store => store.auth);

   const submitHandler = async (e) => {
      e.preventDefault();

      // Validation for required fields
      if (!input.fullName || !input.email || !input.phoneNumber || !input.password || !input.role ||!input.file) {
         toast.error("All fields are required.");
         return;
      }

      const formData = new FormData();
      formData.append("fullname", input.fullName);
      formData.append("email", input.email);
      formData.append("phonenumber", input.phoneNumber);
      formData.append("password", input.password);
      formData.append("role", input.role);
      if (input.file) {
         formData.append("file", input.file);
      }

      try {
         dispatch(setLoading(true));
         const res = await axios.post(`${API}/api/v1/users/register`, formData, {
            headers: {
               "Content-Type": "multipart/form-data"
            },
            withCredentials: true
         });

         if (res.data.success) {
            navigate("/login")
            toast.success(res.data.message);
         }
      } catch (error) {
         console.log(error);
         toast.error(error.response?.data?.message || "Something went wrong.");
      } finally {
         dispatch(setLoading(false));
      }
   }

   useEffect(() => {
      if (user) {
         navigate('/')
      }
   }, [user, navigate])

   return (
      <div>
         <Navbar />
         <div className='flex items-center justify-center sm:max-w-7xl sm:mx-auto p-3'>
            <form onSubmit={submitHandler} className='sm:w-1/2 border border-gray-200 rounded-md p-4 my-10'>
               <h1 className='font-bold text-xl mb-5'>Sign Up</h1>
               <div className='my-2'>
                  <Label>Full Name</Label>
                  <Input type="text" placeholder="Full Name" name="fullName" onChange={changeEventHandler} value={input.fullName} />
               </div>
               <div className='my-2'>
                  <Label>Email</Label>
                  <Input type="email" placeholder="Email" name="email" onChange={changeEventHandler} value={input.email} />
               </div>
               <div className='my-2'>
                  <Label>Phone Number</Label>
                  <Input type="text" placeholder="Phone Number" name="phoneNumber" onChange={changeEventHandler} value={input.phoneNumber} />
               </div>
               <div className='my-2'>
                  <Label>Password</Label>
                  <Input type="password" placeholder="Password" autoComplete="false" name="password" onChange={changeEventHandler} value={input.password} />
               </div>
               <div className='flex items-right justify-between py-1 flex-col md:flex-row'>
                  <RadioGroup className="flex gap-4 items-center">
                     <div className="flex items-center space-x-2">
                        
                        <Label className='flex items-center gap-2 cursor-pointer'>
                           <Input type="radio" name="role" value="Student" checked={input.role === 'Student'} onChange={changeEventHandler} className="cursor-pointer" />
                        Student</Label>
                     </div>
                     <div className="flex items-center space-x-2">
                        
                        <Label className='flex items-center gap-2 cursor-pointer'>
                           <Input type="radio" name="role" value="Recruiter" checked={input.role === 'Recruiter'} onChange={changeEventHandler} className="cursor-pointer" />
                        Recruiter</Label>
                     </div>
                  </RadioGroup>
                  <div className='flex items-center my-2 gap-2'>
                     <Label>Profile</Label>
                     <Input accept='image/*' type="file" onChange={changeFileHandler} className="cursor-pointer" />
                  </div>
               </div>
               {
                  loading ? <Button className="w-full my-4"><Loader2 className='mr-2 h-4 w-4 animate-spin' />Please wait..</Button> : <Button type="submit" className="w-full my-4">Signup</Button>
               }
               <span className='text-sm'>Already have an account ? <Link to='/login' className='text-blue-600'>Login</Link></span>
            </form>
         </div>
         <Footer/>
      </div>
   )
}

export default Signup
