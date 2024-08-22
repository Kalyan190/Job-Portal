import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
   name: "Job",
   initialState:{
      allJobs:[],
      allAdminJobs:[],
      singleJob:null,
      searchTextByAdminJobs:false,
      allAppliedJobs:[],
      searchQuery:""
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
      },
      setAllAppliedJobs:(state,action)=>{
        state.allAppliedJobs = action.payload;
      },
      setSearchQuery:(state,action)=>{
         state.searchQuery = action.payload;
      }
   }
});

export const {setAllJobs,setSingleJob,setAllAdminJobs,setSearchByAdminJobs,setAllAppliedJobs,setSearchQuery} = jobSlice.actions;
export default jobSlice.reducer;