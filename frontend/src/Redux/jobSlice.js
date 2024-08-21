import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
   name: "Job",
   initialState:{
      allJobs:[],
      allAdminJobs:[],
      singleJob:null,
      searchTextByAdminJobs:false
   },
   reducers:{
      // actions
      setAllJobs:(state,action)=>{
         state.allJobs = action.payload;
      },
      setSingleJob: (state,action)=>{
         state.singleJob = action.payload;
      },
      setAllAdminJobs:(state,action)=>{
         state.allAdminJobs = action.payload;
      },
      setSearchByAdminJobs:(state,action)=>{
         state.searchTextByAdminJobs = action.payload;
      }
   }
});

export const {setAllJobs,setSingleJob,setAllAdminJobs,setSearchByAdminJobs} = jobSlice.actions;
export default jobSlice.reducer;