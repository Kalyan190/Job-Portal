import React from 'react'
import Navbar from '../Shared/Navbar'
import HeroSection from './HeroSection'
import CategoryCraousel from './CategoryCraousel'
import LatestJobs from './LatestJobs'
import Footer from './Footer'

const Home = () => {
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
