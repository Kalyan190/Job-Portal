import React from 'react'
import Navbar from '../Shared/Navbar'
import Job from '../Jobs/Job';
import Footer from '../Home/Footer';

const randomJobs = [1,2,3,];

const Browse = () => {
  return (
    <div>
    <Navbar/>
    <div className='max-w-7xl mx-auto my-10 px-24 '>
    <h1 className='font-bold text-xl my-6'>Search Result ({randomJobs.length})</h1>
    <div className='grid grid-cols-3 gap-4'>
                          {
                                randomJobs.map((item, index) => {
                                      return (
                                            <Job key={index} />
                                      )
                                })
                          }
    </div>
       
    </div>
    <Footer/>
      
    </div>
  )
}

export default Browse
