import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { setUser } from '@/Redux/authSlice'
import axios from 'axios'
import { Loader2 } from 'lucide-react'
import React, {  useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'
import { API } from '@/utils/constant'

const UpdateDialogProfile = ({ open, setOpen }) => {
   const [Loading, setLoading] = useState(false);
   const {user} = useSelector(store => store.auth);
   const [inputData, setinputData] = useState({
      fullname: user?.fullname,
      email: user?.email,
      phonenumber: user?.phonenumber,
      bio: user?.profile?.bio,
      skills: user?.profile?.skills?.map(skill => skill),
      file: user?.profile?.resume
   })

   const dispatch = useDispatch();

   const changeEventHandler = (e)=>{
      setinputData({...inputData,[e.target.name]:e.target.value});
   }
   const filechangeHandler = (e)=>{
      const file = e.target.files?.[0];
      setinputData({...inputData,file});
   }
  
  const submitHandler =  async(e)=>{
     e.preventDefault();
     const formData = new FormData();
     formData.append("fullname",inputData.fullname);
     formData.append("email", inputData.email);
     formData.append("phonenumber", inputData.phonenumber);
     formData.append("bio", inputData.bio);
     formData.append("skills", inputData.skills);
     if (inputData.file) {
        formData.append("file", inputData.file);
     }
     console.log("update data: ",inputData);
     try {
         setLoading(true);
        const res = await axios.post(`${API}/api/v1/users/profile/update`, formData, {
           headers: {
              "Content-Type": "multipart/form-data"
           },
           withCredentials: true
        });
        console.log(res.data.success);
        if (res.data.success) {
           dispatch(setUser(res.data.user))
           toast.success(res.data.message);
        }
     } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
     }finally{
        setLoading(false);
     }

     setOpen(false);

     
  }

   return (
      <div>
         <Dialog open={open} >
            <DialogContent className="sm:max-w-[425px]" onInteractOutside={() => setOpen(false)} aria-describedby={undefined}>
               <DialogHeader>
                  <DialogTitle>Update Profile</DialogTitle>
               </DialogHeader>
               <form onSubmit={submitHandler}>
                  <div className='grid gap-4 py-4'>
                     <div className='grid grid-cols-4 items-center gap-4'>
                        <Label htmlFor='fullname' className='text-right'>Name</Label>
                        <Input id="fullname" 
                        name="fullname" 
                        value={inputData.fullname} 
                        onChange={changeEventHandler}
                        placeholder="Name"
                        type="text"
                        className="col-span-3" />
                     </div>
                     <div className='grid grid-cols-4 items-center gap-4'>
                        <Label htmlFor='email' className='text-right'>Email</Label>
                        <Input id="email"
                           type="email"
                           value={inputData.email}
                           onChange={changeEventHandler}
                           placeholder="email"
                           name="email" className="col-span-3" />
                     </div>
                     <div className='grid grid-cols-4 items-center gap-4'>
                        <Label htmlFor='phonenumber' className='text-right'>PhoneNumber</Label>
                        <Input id="phonenumber" name="phonenumber"
                           value={inputData.phonenumber}
                           placeholder="8090845845"
                           onChange={changeEventHandler}
                           className="col-span-3" />
                     </div>
                     <div className='grid grid-cols-4 items-center gap-4'>
                        <Label htmlFor='bio' className='text-right'>Bio</Label>
                        <Input id="bio" name="bio"
                           value={inputData.bio}
                           onChange={changeEventHandler}
                           placeholder="Bio"
                           className="col-span-3" />
                     </div>
                     <div className='grid grid-cols-4 items-center gap-4'>
                        <Label htmlFor='skills' className='text-right'>Skills</Label>
                        <Input id="skills" name="skills"
                           value={inputData.skills}
                           onChange={changeEventHandler}
                           placeholder="Skills"
                           className="col-span-3" />
                     </div>
                     <div className='grid grid-cols-4 items-center gap-4'>
                        <Label htmlFor='file' className='text-right'>Resume</Label>
                        <Input id="file" name="file" accept="application/pdf"
                           onChange={filechangeHandler}
                           
                           type="file" className="col-span-3" />
                     </div>

                  </div>
                  <DialogFooter>
                     {
                        Loading ? <Button className="w-full my-4"><Loader2 className='mr-2 h-4 w-4 animate-spin' />Please wait..</Button> : <Button type="submit" className="w-full my-4">Update</Button>
                     }
                  </DialogFooter>
               </form>

            </DialogContent>
         </Dialog>

      </div>
   )
}

export default UpdateDialogProfile
