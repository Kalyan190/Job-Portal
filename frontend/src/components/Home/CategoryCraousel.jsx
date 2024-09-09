import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setSearchQuery } from '@/Redux/jobSlice'


const category = [
      "Frontend Developer",
      "Backend Developer",
      "ReactJs Developer",
      "Data Science",
      "Graphic Designer",
      "FullStack Developer",
      "NextJs Developer"
]

const CategoryCraousel = () => {
   const navigate = useNavigate();
   const dispatch = useDispatch();

   const searchJobHandler = (query) => {
      dispatch(setSearchQuery(query));
      navigate('/browse');
   }
      return (
            <div className='m-2 flex items-center justify-center'>
                  <Carousel className=" my-16 max-sm:w-[50%] md:w-[80%] mx-auto sm:max-w-xs md:max-w-xl ">
                        <CarouselContent className="">
                        {
                              category.map((cat,index)=>(
                                 <CarouselItem className="md:basis-1/2 lg:basis-1/3 flex items-center justify-center " key={index}>
                                   <Button onClick={()=>searchJobHandler(cat)} className="rounded-full" variant="outline">{cat}</Button>
                                    </CarouselItem>
                              ))
                        }
                              
                        </CarouselContent>
                        <CarouselPrevious/>
                        <CarouselNext/>
                  </Carousel>

            </div>
      )
}

export default CategoryCraousel
