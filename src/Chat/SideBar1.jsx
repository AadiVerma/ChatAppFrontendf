import Image from '../assets/man.png';
import { useEffect ,useState } from 'react';
import { IoPersonSharp } from "react-icons/io5";
import { IoMdNotifications } from "react-icons/io";
import { MdOutlineMessage } from "react-icons/md";
import convertToBase64 from '../SignIn/Helper/convert.jsx'
import { IoIosSettings } from "react-icons/io";
import { MdLogout } from "react-icons/md";
import {useNavigate} from 'react-router-dom';
export default function SideBar1({setShowMessage,showMessage}){
  const navigate=useNavigate();
  const [File, setFile] = useState(null);
  useEffect(() => {
    async function fetchData() {
      const userprofile = localStorage.getItem('Profile');
      if (userprofile == null) {
        return;
      }
      const base64 = await fetch(userprofile)
        .then(response => response.blob())
        .then(blob => convertToBase64(blob));
      setFile(base64);
    }
    fetchData();
  }, []);
  const handleUpdate=()=>{
    navigate('/update'); 
  }
  const handlelogout=()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/');
  }
    return (
      <div className='min-h-[100vh] bg-purple-950 w-[10%] '>
     <img src={File || Image} className='rounded-full w-[50%] bg-purple-500 mb-10 ml-[20%] mt-2'/>
       <div className='mt-32 gap-10 flex-col-reverse'>
       <IoPersonSharp className='text-3xl mb-20 ml-[30%] hover:text-purple-400 active:text-purple-400 cursor-pointer' onClick={handleUpdate}/>
       <MdOutlineMessage className='text-3xl mb-20 ml-[30%] hover:text-purple-400 active:text-purple-400 cursor-pointer' onClick={()=>{setShowMessage(!showMessage)}}/>
       <MdLogout className='text-3xl ml-[30%] mb-32 hover:text-purple-400 active:text-purple-400 cursor-pointer' onClick={handlelogout}/>
      </div>
       
      </div>  
    )
}