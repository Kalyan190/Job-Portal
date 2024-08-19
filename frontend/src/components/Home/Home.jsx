import React , {useEffect} from 'react'
import Navbar from '../Shared/Navbar'
import HeroSection from './HeroSection'
import CategoryCraousel from './CategoryCraousel'
import LatestJobs from './LatestJobs'
import Footer from './Footer'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Home = () => {

   const {user} = useSelector(store=>store.auth);
   const navigate = useNavigate();
   useEffect(() => {
      if(user?.role === "Recruiter"){
         navigate('/admin/companies');
      }
   }, [])

   useGetAllJobs();
  return (
    <div>
    <Navbar/>
    <HeroSection/>
    <CategoryCraousel/>
    <LatestJobs/>
    <Footer/>
      
    </div>
  )
}

export default Home
