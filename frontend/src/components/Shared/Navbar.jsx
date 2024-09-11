import { LogOut, User2 } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Avatar, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import axios from 'axios';
import { setUser } from '@/Redux/authSlice';
import { API } from '@/utils/constant';
import photo from './Photo/photo.png';

const Navbar = () => {
   const { user } = useSelector((store) => store.auth);
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const [isMenuOpen, setIsMenuOpen] = useState(false);
   const [isMobile, setIsMobile] = useState(window.matchMedia('(max-width: 768px)').matches);

   useEffect(() => {
      const handleResize = (e) => {
         setIsMobile(e.matches);
         if (!e.matches) {
            setIsMenuOpen(false);
         }
      };

      const mediaQuery = window.matchMedia('(max-width: 768px)');
      mediaQuery.addEventListener('change', handleResize);

      return () => mediaQuery.removeEventListener('change', handleResize);
   }, []);

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
         toast.error(error.response?.data?.message);
      }
   };

   return (
      <div className="bg-white">
         <div className="flex items-center justify-between md:mx-auto max-w-7xl md:max-w-6xl h-16 px-4 sm:mx-0">
            <div>
               <h1 className="text-2xl font-bold">Job<span className="text-[#f83002]">Portal</span></h1>
            </div>
            <div className="flex items-center gap-8">
               <div className="flex gap-5 md:hidden">
                  <Popover>
                     <PopoverTrigger asChild>
                        <Avatar className="cursor-pointer">
                           <AvatarImage src={user?.profile?.profilePhoto || photo} alt="User Avatar" className='w-8 h-8 rounded-full' />
                        </Avatar>
                     </PopoverTrigger>
                     <PopoverContent className="max-w-80">
                        {!user ? (
                           <div className="flex flex-col text-gray-600  items-center justify-center gap-3">
                              <Link to="/login"><Button variant="outline">Login</Button></Link>
                              <Link to="/signup"><Button className="bg-[#6A38C2] hover:bg-[#542c98]">Signup</Button></Link>
                           </div>
                        ) : (
                           <>
                              <div className="flex gap-4 space-y-2">
                                 <Avatar className="cursor-pointer">
                                    <AvatarImage src={user?.profile?.profilePhoto || photo} alt="User Avatar" />
                                 </Avatar>
                                 <div>
                                    <h4 className="font-medium">{user?.fullname}</h4>
                                    <p className="text-sm text-muted-foreground">{user?.profile?.bio}</p>
                                 </div>
                              </div>
                              <div className="flex flex-col text-gray-600 my-2">
                                 {user.role === "Student" && (
                                    <div className="flex items-center">
                                       <User2 />
                                       <Button variant="link"><Link to="/profile">View Profile</Link></Button>
                                    </div>
                                 )}
                                 <div className="flex items-center">
                                    <LogOut />
                                    <Button onClick={logoutHandler} variant="link">Logout</Button>
                                 </div>
                              </div>
                           </>
                        )}
                     </PopoverContent>
                  </Popover>
                  <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-700 focus:outline-none">
                     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        {isMenuOpen ? (
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                        )}
                     </svg>
                  </button>
               </div>
               <div
                  className={`flex-col md:flex-row font-medium items-center gap-5 absolute md:static bg-white left-0 top-16 w-full md:w-auto md:flex ${isMenuOpen ? 'flex' : 'hidden'} max-md:bg-gray-200 p-6 z-10`}
               >
                  <ul className="md:flex-row w-full flex flex-col items-center gap-2 justify-center">
                     {user && user.role === "Recruiter" ? (
                        <>
                           <li><Link to="/admin/companies">Companies</Link></li>
                           <li><Link to="/admin/jobs">Job</Link></li>
                        </>
                     ) : (
                        <>
                           <li><Link to="/">Home</Link></li>
                           <li><Link to="/jobs">Job</Link></li>
                           <li><Link to="/browse">Browse</Link></li>
                        </>
                     )}
                  </ul>
                  {!isMenuOpen && (
                     <Popover>
                        <PopoverTrigger asChild>
                           <Avatar className="cursor-pointer">
                              <AvatarImage src={user?.profile?.profilePhoto || photo} alt="User Avatar" />
                           </Avatar>
                        </PopoverTrigger>
                        <PopoverContent className="max-w-80">
                           {!user ? (
                              <div className="flex flex-col text-gray-600  items-center justify-center gap-3">
                                 <Link to="/login"><Button variant="outline">Login</Button></Link>
                                 <Link to="/signup"><Button className="bg-[#6A38C2] hover:bg-[#542c98]">Signup</Button></Link>
                              </div>
                           ) : (
                              <>
                                 <div className="flex gap-4 space-y-2">
                                    <Avatar className="cursor-pointer">
                                       <AvatarImage src={user?.profile?.profilePhoto || photo} alt="User Avatar" />
                                    </Avatar>
                                    <div>
                                       <h4 className="font-medium">{user?.fullname}</h4>
                                       <p className="text-sm text-muted-foreground">{user?.profile?.bio}</p>
                                    </div>
                                 </div>
                                 <div className="flex flex-col text-gray-600 my-2">
                                    {user.role === "Student" && (
                                       <div className="flex items-center">
                                          <User2 />
                                          <Button variant="link"><Link to="/profile">View Profile</Link></Button>
                                       </div>
                                    )}
                                    <div className="flex items-center">
                                       <LogOut />
                                       <Button onClick={logoutHandler} variant="link">Logout</Button>
                                    </div>
                                 </div>
                              </>
                           )}
                        </PopoverContent>
                     </Popover>
                  )}
               </div>
            </div>
         </div>
      </div>
   );
};

export default Navbar;
