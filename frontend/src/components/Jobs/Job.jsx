import React from 'react'
import { Button } from '../ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Badge } from '../ui/badge'
import { useNavigate } from 'react-router-dom'

const Job = () => {
   const navigate = useNavigate();
   const JobId = "fjifjri40940494o5jtigtk34r";

  return (
    <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100'>
              <div className='flex items-center justify-between'>
                    <p className='text-sm text-gray-600'>2 days ago</p>
                    <Button variant="outline" className='rounded-full' size="icon"><Bookmark /></Button>
              </div>
      

              <div className='flex items-center gap-2 my-2'>
              <Button className="p-6" variant="outline" size="icon"><Avatar><AvatarImage src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/company-logo-design-template-e089327a5c476ce5c70c74f7359c5898_screen.jpg?ts=1672291305" /></Avatar></Button>
              <div>
              <h1 className='font-medium text-lg'>Company Name</h1>
              <p className='text-sm text-gray-500'>India</p>
              </div>
              </div>

              <div>
              <h1 className='font-bold text-lg my-2'>Title</h1>
              <p className='text-sm text-gray-600'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Explicabo quis officia provident quam deserunt fugiat? Omnis hic nostrum aspernatur consequuntur.</p></div>

      <div className='flex items-center gap-2 mt-4'>
        <Badge className="font-bold text-blue-600 " variant="ghost">12 Positions</Badge>
        <Badge className="font-bold text-[#F83002] " variant="ghost">Part Time</Badge>
        <Badge className="font-bold text-[#7209b7] " variant="ghost">24 Lpa</Badge>
      </div>
      <div className='flex items-center gap-4 mt-4'>
        <Button onClick={()=>navigate(`/description/${JobId}`)} variant="outline">Details</Button>
        <Button className="bg-[#6A38C2]">Save For Later</Button>
      </div>
              
    </div>
  )
}

export default Job
