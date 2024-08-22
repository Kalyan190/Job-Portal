import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Signup from './components/Auth/Signup'
import Login from './components/Auth/Login'
import Home from './components/Home/Home'
import Jobs from './components/Jobs/Jobs'
import Browse from './components/Browse/Browse'
import Profile from './Profile/Profile'
import JobDescription from './components/Jobs/JobDescription'
import Companies from './components/Admin/Companies'
import CompanyCreate from './components/Admin/CompanyCreate'
import CompanySetup from './components/Admin/CompanySetup'
import AdminJobs from './components/Admin/AdminJobs'
import PostJobByAdmin from './components/Admin/PostJobByAdmin'
import GetAllApplicants from './components/Admin/GetAllApplicants'
import ProtectedRoute from './components/Admin/ProtectedRoute'


const appRouter = createBrowserRouter(
  [
    {
      path:'/',
      element:<Home/>
    },
    {
      path:'/signup',
      element:<Signup/>
    },
    {
      path:'/login',
      element:<Login/>
    },
    {
      path:'/jobs',
      element:<Jobs/>
    },
    {
      path:'/description/:id',
      element:<JobDescription/>
    },
    {
      path:'/browse',
      element:<Browse/>
    },
    {
      path:'/profile',
      element:<Profile/>
    }
    // admin router setup
    ,
    {
      path:'/admin/companies',
       element: <ProtectedRoute><Companies /></ProtectedRoute>
    },
    {
      path:'/admin/jobs',
       element: <ProtectedRoute><AdminJobs /></ProtectedRoute>
    },
    {
      path:'/admin/companies/create',
       element: <ProtectedRoute><CompanyCreate /></ProtectedRoute>
    },
    {
      path:'/admin/companies/:id',
       element: <ProtectedRoute><CompanySetup /></ProtectedRoute>
    },
    {
       path: '/admin/jobs/create',
       element: <ProtectedRoute><PostJobByAdmin /></ProtectedRoute>
    },
    {
       path: '/admin/jobs/:id/applicants',
       element: <ProtectedRoute><GetAllApplicants /></ProtectedRoute>
    },

  ]
)


function App() {
  

  return (
    <>
      
      
      <RouterProvider router={appRouter} />
      
    </>
  )
}

export default App
