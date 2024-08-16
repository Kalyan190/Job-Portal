import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Signup from './components/Auth/Signup'
import Login from './components/Auth/Login'
import Home from './components/Home/Home'
import Jobs from './components/Jobs/Jobs'


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
    }
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
