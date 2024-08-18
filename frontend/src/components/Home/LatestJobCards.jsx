import React from 'react'
import { Badge } from '../ui/badge'

const LatestJobCards = ({job}) => {
  return (
    <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer'>
      <div>
        <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
        <p className='text-sm text-gray-500'>{job?.location}</p>
      </div>
      <div>
        <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
        <p className='text-sm text-gray-600'>{job?.description}</p>
      </div>
      <div className='flex items-center gap-2 mt-4'>
        <Badge className="font-bold text-blue-600 " variant="ghost">{job?.position} Positions</Badge>
        <Badge className="font-bold text-[#F83002] " variant="ghost">{job?.jobType}</Badge>
        <Badge className="font-bold text-[#7209b7] " variant="ghost">{job?.salary} Lpa</Badge>
      </div>

    </div>
  )
}

export default LatestJobCards
