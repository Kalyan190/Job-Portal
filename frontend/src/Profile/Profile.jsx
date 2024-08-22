import Navbar from '@/components/Shared/Navbar'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Contact, Mail, Pen } from 'lucide-react'
import React, { useState } from 'react'
import AppliedJobTable from './AppliedJobTable'
import Footer from '@/components/Home/Footer'
import UpdateDialogProfile from './UpdateDialogProfile'
import { useSelector } from 'react-redux'
import useGetAppliedJob from '@/hooks/useGetAppliedJob'



const isResume = true;

const Profile = () => {
      useGetAppliedJob();
      const [open,setOpen] = useState(false);
      const {user} = useSelector(store=>store.auth);

     
      return (
            <div>
                  <Navbar />
                  <div className='max-w-5xl mx-auto my-5 p-8 bg-white border border-gray-200 rounded-2xl'>
                        <div className='flex gap-4 justify-between items-center'>
                              <div className='flex gap-4 items-center'>
                                    <Avatar className='cursor-pointer h-24 w-24'>
                                          <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                    </Avatar>

                                    <div>
                                          <h1 className='text-xl font-medium'>{user?.fullname}</h1>
                                          <p>{user?.profile?.bio}</p>
                                    </div>

                              </div>
                              <Button className="text-right" variant="outline" onClick={()=>setOpen(true)}><Pen /></Button>
                        </div>
                        <div className='my-4 '>
                              <div className='flex gap-2'><Mail />
                                    <span>{user?.email}</span></div>
                              <div className='flex gap-2 my-2'> <Contact />
                                    <span>{user?.phonenumber}</span></div>
                        </div>
                        <div className='my-5'>
                        <h1>Skills</h1>
                        <div className='flex gap-2 items-center mt-2'>
                                    {
                                      user?.profile?.skills?.lengtth !== 0? user?.profile?.skills.map((item, index) => <Badge key={index}>{item}</Badge>):<span>NA</span>
                                    }
                        </div>
                        </div>

                        <div className='grid max-w-sm items-center gap-1.5'>
                        <Label className="text-md font-bold">Resume</Label>
                        {
                     isResume ? <a target='blank' href={user?.profile?.resume} className='text-blue-500 w-full hover:underline'>{user?.profile?.resumeOriginalName}</a>:<span>NA</span>
                        }
                        </div>
                       


                  </div>
                  <div className='max-w-5xl bg-white rounded-2xl mx-auto'>
                        <h1 className='font-bold text-lg '>Applied Jobs</h1>
                        <AppliedJobTable />
                  </div>
                  <UpdateDialogProfile open={open} setOpen={setOpen} />

                  <Footer />

            </div>
      )
}

export default Profile
