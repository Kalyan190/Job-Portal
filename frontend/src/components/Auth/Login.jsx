import React, { useState } from 'react'
import Navbar from '../Shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '@/Redux/authSlice'
import { Loader2 } from 'lucide-react'

const Login = () => {
      const [input,setInput] = useState({
            email:"",
            password:"",
            role:"",
      })
      const navigate = useNavigate()
      const changeEventHandler = (e)=>{
            setInput({...input,[e.target.name]:e.target.value});
      }
      const dispatch = useDispatch();
      const {loading} = useSelector(store=>store.auth)
  
      
      
      const submitHandler = async (e)=>{
            e.preventDefault();

            try {
                  dispatch(setLoading(true));
                  const res = await axios.post('/api/v1/users/login',input,{
                        headers:{
                              "Content-Type":"application/json"
                        },
                        withCredentials:true
                  });
                  
                  if(res.data.success){
                        dispatch(setUser(res.data.user));
                        navigate("/")
                        toast.success(res.data.message);
                  }
            } catch (error) {
                  console.log(error);
                  toast.error(error.response.data.message);
            }finally{
                  dispatch(setLoading(false));
            }
      }


  return (
    <div>
      <Navbar/>
      <div className='flex items-center justify-center max-w-7xl mx-auto'>
      <form onSubmit={submitHandler} className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
      <h1 className='font-bold text-xl mb-5'>Sign Up</h1>
         
         <div className='my-2'>
         <Label >Email</Label>
         <Input type="email" placeholder="Email" name="email" onChange={changeEventHandler}  value={input.email}/>
         </div>
         
         <div className='my-2'>
         <Label >Password</Label>
         <Input type="password" placeholder="Password" name="password" onChange={changeEventHandler} value={input.password} autoComplete="false"/>
         </div>
         <div className='flex items-center justify-between py-1'>
         <RadioGroup  className="flex gap-4 items-center">
         <div className="flex items-center space-x-2">
           <Input type="radio" name="role" value="Student" checked={input.role === 'Student'} onChange={changeEventHandler} className="cursor-pointer"/>
           <Label>Student</Label>
         </div>
         <div className="flex items-center space-x-2">
            <Input type="radio" name="role" value="Recruiter" checked={input.role === 'Recruiter'} onChange={changeEventHandler}className="cursor-pointer" />
           <Label>Recruiter</Label>
         </div>
        
       </RadioGroup>
       
         </div>
         {
            loading ? <Button className="w-full my-4"><Loader2 className='mr-2 h-4 w-4 animate-spin' />Please wait..</Button>:<Button type="submit" className="w-full my-4">Login</Button>
         }
         
         <span className='text-sm'>Don't have an account ? <Link to='/signup' className='text-blue-600'>Sign Up</Link></span>
         
      </form>
      </div>
    </div>
  )
}

export default Login