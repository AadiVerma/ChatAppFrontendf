import { useNavigate } from 'react-router-dom';
import Styles from '../Styles/Login.module.css';
import {useEffect, useState} from 'react';
import toast,{Toaster} from 'react-hot-toast';
import { generateOTP ,verifyOTP} from '../Helper/helper';
export default function Recovery() {
    const username=localStorage.getItem('username');
    const [OTP,setOTP]=useState();
    const navigate=useNavigate();
    
    useEffect(()=>{
      const generate = async () => {
        try {
            const otp = await generateOTP(username);
            if (otp) {
                toast.success('OTP has been sent to your email address');
            } else {
                toast.error('Problem While Generating OTP');
            }
        } catch (error) {
            toast.error('Problem While Generating OTP');
        }
    };
       generate();
    },[username]);

    async function onSubmit(e){
      e.preventDefault();
      try {
        let {status}=await verifyOTP({username,code:OTP});
        if(status===201){
          toast.success("Verify Successfully");
          return navigate("/reset");
        }
      } catch (error) {
        return toast.error("Wrong OTP! Check Email Again"); 
      }
     
     
    }
    async function resendOTP(){
        try {
            const OTP = await generateOTP(username); 
            console.log(OTP);
            toast.success("OTP has been sent to your email");
          } catch (error) {
            console.error(error);
            toast.error(<b>Could Not Send it!</b>);
          }
    }
    return (
        <div className={`container mt-20 mx-auto px-14 py-14 border-solid border-[2px] border-purple-400 rounded-3xl ${Styles.maindiv}`}>
        <form onSubmit={onSubmit}>
        <Toaster position='top-center' reverseOrder={false}></Toaster>
            <h1 className='font-bold text-[50px] mt-[-20px] mb-4 text-purple-600'>Recovery !</h1>
            <h3 className='font-bold text-[20px] text-purple-400'>Enter OTP to Recover Password</h3>
            <br></br>
            <h4 className='font-bold text-[13px] text-purple-400'>Enter 6 digit OTP Send to Your email address</h4>
            <input onChange={(e)=>setOTP(e.target.value)} className='border-b-2 mt-8 ml-4 border-b-slate-500 px-5 py-4 rounded-xl w-3/4 shadow-sm text-lg text-white focus:outline-none bg-transparent' type={"text"}  placeholder='OTP' />      
            <button type="Submit" className='mt-5 border-4 border-purple-600 bg-purple-600 w-3/4 py-4 rounded-lg text-gray-50 text-xl shadow-sm text-center hover:bg-transparent hover:text-purple-400  hover:border-purple-600'>
            <span className='text-white-500 font-bold'>Sign In</span>
            </button>
            <p className='text-[#c3c2c2] mt-2 ml-15 mb-4'>Can't Get OTP ?<span className='text-purple-500 font-bold cursor-pointer' onClick={resendOTP}>Resend</span></p>
            </form>

        </div>
    );
}