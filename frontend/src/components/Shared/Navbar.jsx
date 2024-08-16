import {LogOut, User2 } from 'lucide-react'
import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

const Navbar = () => {
      const user = false;
      return (
            <div className='bg-white'>
                  <div className='flex items-center justify-between mx-auto max-w-7xl h-16 px-8'>
                        <div>
                              <h1 className='text-2xl font-bold'>Job<span className='text-[#f83002]'>Portal</span></h1>
                        </div>
                        <div className='flex items-center gap-8'>
                              <ul className='flex font-medium items-center gap-5'>
                                    <li><Link to='/'>Home</Link></li>
                                    <li><Link to='/jobs'>Job</Link></li>
                                    <li><Link to='/browse'>Browse</Link></li>
                              </ul>
                              {!user?(
                                    <div className='flex gap-2'>
                                    <Link to='/login'><Button variant="outline">Login</Button></Link>
                                    <Link to='/signup'><Button className="bg-[#6A38C2] hover:bg-[#542c98]">Signup</Button></Link>
                                    
                                    
                                    </div>
                              ):(
                                    <Popover >
                                    <PopoverTrigger asChild>
                                          <Avatar className='cursor-pointer'>
                                                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />

                                          </Avatar>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-80">
                                          <div className='flex  gap-4 space-y-2'>
                                                <Avatar className='cursor-pointer'>
                                                      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />

                                                </Avatar>
                                                <div>
                                                      <h4 className='font-medium'>
                                                            Kalyan
                                                      </h4>
                                                      <p className='text-sm text-muted-foreground'>lorem ipsum dolar sit. </p>
                                                </div>
                                          </div>
                                          <div className='flex flex-col text-gray-600 my-2'>
                                          <div className='flex items-center'>
                                          <User2/>
                                          <Button  variant="link">View Profile</Button>
                                          </div>
                                          <div className='flex items-center'>
                                          <LogOut/>
                                          <Button  variant="link">logout</Button>
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
