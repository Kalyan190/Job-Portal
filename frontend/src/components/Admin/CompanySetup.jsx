import React, { useEffect, useState } from 'react';
import Navbar from '../Shared/Navbar';
import { Button } from '../ui/button';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { toast } from 'sonner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useGetCompanyById from '@/hooks/useGetCompanyById';
import { API } from '@/utils/constant';

const CompanySetup = () => {
   const [loading, setLoading] = useState(false);
   const [input, setInput] = useState({
      name: "",
      description: "",
      website: "",
      location: "",
      file: null
   });

   const { singleCompany } = useSelector(store => store.company);
   const { user } = useSelector(store => store.auth); // Retrieve the user from the Redux store

   const changeEventHandler = (e) => {
      setInput({ ...input, [e.target.name]: e.target.value });
   };

   const changeFileHandler = (e) => {
      const file = e.target.files?.[0];
      setInput({ ...input, file });
   };

   const params = useParams();
   const navigate = useNavigate();
   useGetCompanyById(params.id);

   const submitHandler = async (e) => {
      e.preventDefault();
      const formData = new FormData();

      formData.append("name", input.name);
      formData.append("description", input.description);
      formData.append("website", input.website);
      formData.append("location", input.location);
      if (input.file) {
         formData.append("file", input.file);
      }

      try {
         setLoading(true);
         const res = await axios.put(`${API}/api/v1/company/update/${params.id}`, formData,
            {
               headers: {
                  'Content-Type': 'multipart/form-data',
                  'Authorization': `Bearer ${user.token}`, // Use user token here
               },
               withCredentials: true, // Ensure that cookies are sent with requests
            });

         if (res.data.success) {
            toast.success(res.data.message);
            navigate('/admin/companies');
         }

      } catch (error) {
         console.log(error);
         toast.error(error?.response?.data?.message || "Something went wrong");
      } finally {
         setLoading(false);
      }
   };

   useEffect(() => {
      setInput({
         name: singleCompany?.name || "",
         description: singleCompany?.description || "",
         website: singleCompany?.website || "",
         location: singleCompany?.location || "",
         file: singleCompany?.file || null
      });
   }, [singleCompany]);

   return (
      <div>
         <Navbar />
         <div className='max-w-xl mx-auto my-10'>
            <form onSubmit={submitHandler}>
               <div className='flex items-center gap-5'>
                  <Button onClick={() => navigate('/admin/companies')} variant="outline" className="flex items-center gap-2 text-gray-500 font-semibold">
                     <ArrowLeft />
                     <span>Back</span>
                  </Button>
                  <h1 className='font-bold text-xl'>Company Setup</h1>
               </div>
               <div className='grid grid-cols-2 gap-4'>
                  <div>
                     <Label>Company Name</Label>
                     <Input
                        type="text"
                        name="name"
                        placeholder="Google, Microsoft etc."
                        value={input.name}
                        onChange={changeEventHandler}
                     />
                  </div>
                  <div>
                     <Label>Description</Label>
                     <Input
                        type="text"
                        name="description"
                        placeholder="Job Description"
                        value={input.description}
                        onChange={changeEventHandler}
                     />
                  </div>
                  <div>
                     <Label>Website</Label>
                     <Input
                        type="text"
                        name="website"
                        placeholder="Website link..."
                        value={input.website}
                        onChange={changeEventHandler}
                     />
                  </div>
                  <div>
                     <Label>Location</Label>
                     <Input
                        type="text"
                        name="location"
                        placeholder="Location"
                        value={input.location}
                        onChange={changeEventHandler}
                     />
                  </div>
                  <div>
                     <Label>Company Logo</Label>
                     <Input
                        type="file"
                        accept="image/*"
                        onChange={changeFileHandler}
                     />
                  </div>
               </div>
               {loading ? (
                  <Button className="w-full my-4">
                     <Loader2 className='mr-2 h-4 w-4 animate-spin' />Please wait..
                  </Button>
               ) : (
                  <Button type="submit" className="w-full my-4">Update</Button>
               )}
            </form>
         </div>
      </div>
   );
};

export default CompanySetup;
