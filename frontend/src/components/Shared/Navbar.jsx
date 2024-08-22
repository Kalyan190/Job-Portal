import { LogOut, User2 } from 'lucide-react'
import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'
import axios from 'axios'
import { setUser } from '@/Redux/authSlice'
import { API } from '@/utils/constant'

const Navbar = () => {

   const { user } = useSelector(store => store.auth);
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const logoutHandler = async () => {
      try {
         const res = await axios.get(`${API}/api/v1/users/logout`, { withCredentials: true });
         if (res.data.success) {
            dispatch(setUser(null));
            navigate('/');
            toast.success(res.data.message);

         }
      } catch (error) {
         console.log(error);
         toast.error(error.response.data.message);
      }
   }
   // console.log(user);


   return (
      <div className='bg-white mx-12'>
         <div className='flex items-center justify-between mx-auto max-w-7xl h-16 px-8'>
            <div>
               <h1 className='text-2xl font-bold'>Job<span className='text-[#f83002]'>Portal</span></h1>
            </div>
            <div className='flex items-center gap-8'>
               <ul className='flex font-medium items-center gap-5'>
                  {
                     user && user.role === "Recruiter" ? (
                        <>
                           <li><Link to='/admin/companies'>Companies</Link></li>
                           <li><Link to='/admin/jobs'>Job</Link></li>
                        </>
                     ) : (
                        <>
                           <li><Link to='/'>Home</Link></li>
                           <li><Link to='/jobs'>Job</Link></li>
                           <li><Link to='/browse'>Browse</Link></li>
                        </>
                     )
                  }

               </ul>
               {!user ? (
                  <div className='flex gap-2'>
                     <Link to='/login'><Button variant="outline">Login</Button></Link>
                     <Link to='/signup'><Button className="bg-[#6A38C2] hover:bg-[#542c98]">Signup</Button></Link>


                  </div>
               ) : (
                  <Popover >
                     <PopoverTrigger asChild>
                        <Avatar className='cursor-pointer'>
                           <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />

                        </Avatar>
                     </PopoverTrigger>
                     <PopoverContent className="w-80">
                        <div className='flex  gap-4 space-y-2'>
                           <Avatar className='cursor-pointer'>
                              <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />

                           </Avatar>
                           <div>
                              <h4 className='font-medium'>
                                 {user?.fullname}
                              </h4>
                              <p className='text-sm text-muted-foreground'>{user?.profile?.bio} </p>
                           </div>
                        </div>
                        <div className='flex flex-col text-gray-600 my-2'>

                           {
                              user && user.role === "Student" && (

                                 <div className='flex items-center'>
                                    <User2 />
                                    <Button variant="link"><Link to='/profile' >View Profile</Link></Button>
                                 </div>


                              )

                           }


                           <div className='flex items-center'>
                              <LogOut />
                              <Button onClick={logoutHandler} variant="link">logout</Button>
                           </div>

                        </div>
                     </PopoverContent>
                  </Popover>
               )
               }

            </div>

         </div>

      </div>
   )
}

export default Navbar
