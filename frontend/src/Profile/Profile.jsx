import Navbar from '@/components/Shared/Navbar'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Contact, Mail, Pen } from 'lucide-react'
import React from 'react'
import AppliedJobTable from './AppliedJobTable'
import Footer from '@/components/Home/Footer'

const skills = ["Html","CSS","Javascript","Reactjs"]

const Profile = () => {
      const isResume = true;
      return (
            <div>
                  <Navbar />
                  <div className='max-w-5xl mx-auto my-5 p-8 bg-white border border-gray-200 rounded-2xl'>
                        <div className='flex gap-4 justify-between items-center'>
                              <div className='flex gap-4 items-center'>
                                    <Avatar className='cursor-pointer h-24 w-24'>
                                          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                    </Avatar>

                                    <div>
                                          <h1 className='text-xl font-medium'>Full Name</h1>
                                          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Optio, atque.</p>
                                    </div>

                              </div>
                              <Button className="text-right" variant="outline"><Pen /></Button>
                        </div>
                        <div className='my-4 '>
                              <div className='flex gap-2'><Mail />
                                    <span>example@gmail.com</span></div>
                              <div className='flex gap-2 my-2'> <Contact />
                                    <span>1234-5678-10</span></div>
                        </div>
                        <div className='my-5'>
                        <h1>Skills</h1>
                        <div className='flex gap-2 items-center mt-2'>
                                    {
                                       skills.length !== 0? skills.map((item, index) => <Badge key={index}>{item}</Badge>):<span>NA</span>
                                    }
                        </div>
                        </div>

                        <div className='grid max-w-sm items-center gap-1.5'>
                        <Label className="text-md font-bold">Resume</Label>
                        {
                              isResume? <a target='blank' href='https://resume/kalyan@btech.com' className='text-blue-500 w-full hover:underline'>resume.kalyankumar.pdf</a>:<span>NA</span>
                        }
                        </div>
                       


                  </div>
                  <div className='max-w-5xl bg-white rounded-2xl mx-auto'>
                        <h1 className='font-bold text-lg '>Applied Jobs</h1>
                        <AppliedJobTable />
                  </div>

                  <Footer />

            </div>
      )
}

export default Profile
