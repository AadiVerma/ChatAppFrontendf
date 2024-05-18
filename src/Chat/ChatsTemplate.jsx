import { getuserDataForChat } from '../SignIn/Helper/helper';
import Image from '../assets/signinimage.png'
import { useState,useEffect } from 'react';
export default function ChatTemplate({data,currentUser,setClick,online}) {
  console.log(online);
    const [userdata,setUserData]=useState({});
    useEffect(()=>{
        const userId=data.members.find((id)=>id!==currentUser);
        const getUserData=(async()=>{
          try {
            const data=await getuserDataForChat({id:userId});
            setUserData(data);
            // console.log(data);
          } catch (error) {
            console.error(error);
          }
        })
        getUserData();
    },[currentUser,data])
    return (
        <div className='flex justify-start border-b-2 pt-[3%] pb-[0%]  gap-5 pl-[5%]' onClick={()=>setClick(data)}>
            <img src={userdata?.profile?userdata.profile:Image} className='rounded-full w-[23%] bg-purple-500 mb-[4%]'/>
            <div className='text-start'>
                <h1 className='text-lg font-bold text-gray-900'>{userdata[0]?.firstName || userdata[0]?.username}</h1>
                <div className='flex gap-1'>
                  <h2 className='text-sm'>{online?"Online":"Offline"}</h2>
                 {online &&  <div className='h-2 w-2 rounded-full bg-green-400 mt-2'></div>}
                </div>
            </div> 
        </div>
    )
}