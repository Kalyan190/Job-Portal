import React from 'react'
import Navbar from '../Shared/Navbar'
import Footer from '../Home/Footer'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'

const JobDescription = () => {

      const isApplied = false;

      return (
            <div>
                  <Navbar />
                  <div className='max-w-5xl mx-auto mt-5 min-h-[65vh] '>
                        <div className='flex items-center justify-between'>
                              <div><h1 className='font-bold text-xl'>Frontend Developer</h1>

                                    <div className='flex items-center gap-2 mt-4'>
                                          <Badge className="font-bold text-blue-600 " variant="ghost">12 Positions</Badge>
                                          <Badge className="font-bold text-[#F83002] " variant="ghost">Part Time</Badge>
                                          <Badge className="font-bold text-[#7209b7] " variant="ghost">24 Lpa</Badge>
                                    </div></div>
                              <Button variant="outline" disabled={isApplied} className={`rounded-lg ${isApplied ? 'bg-gray-600 cursor-not-allowed' : 'hover:bg-[#7209b7] hover:text-white'}`}>{isApplied ? 'Already applied' : 'Apply Now'}</Button>
                        </div>
                        <div className='my-5'>
                              <h1 className='border-b-2 border-b-gray-300 font-medium py-3'>Job Descriptiton</h1>
                              <div className='my-4'>
                                    <h1 className='font-bold my-1'>Role: <span className='pl-4 font-normal text-gray-800'>Frontend Developer</span></h1>
                                    <h1 className='font-bold my-1'>Location: <span className='pl-2 font-normal text-gray-800'>Kolkata</span></h1>
                                    <h1 className='font-bold my-1'>Description: <span className='pl-2 font-normal text-gray-800'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias, ipsam!</span></h1>
                                    <h1 className='font-bold my-1'>Experience: <span className='pl-2 font-normal text-gray-800'>6 months</span></h1>
                                    <h1 className='font-bold my-1'>Salary: <span className='pl-2 font-normal text-gray-800'>4-6LPA</span></h1>
                                    <h1 className='font-bold my-1'>Total Applicant: <span className='pl-2 font-normal text-gray-800'>10</span></h1>
                                    <h1 className='font-bold my-1'>Posted Date: <span className='pl-2 font-normal text-gray-800'>17-08-2024</span></h1>
                              </div>
                        </div>

                  </div>




                  <Footer />

            </div>
      )
}

export default JobDescription
