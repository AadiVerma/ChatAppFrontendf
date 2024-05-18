import { Link ,useNavigate } from 'react-router-dom';
import Styles from '../Styles/Login.module.css';
import {useEffect, useState} from 'react';
import toast,{Toaster} from 'react-hot-toast';
export default function Username() {
    const [username,setUsername]=useState();
    const navigate=useNavigate();

    async function onSubmit(e){
        e.preventDefault();
        localStorage.setItem("username",username);
        navigate("/forgotPassword");
    }
    return (
        <div className={`container mt-20 mx-auto px-10 py-10 pb-1 border-solid border-[2px] border-purple-400 rounded-3xl ${Styles.maindiv}`}>
        <form onSubmit={onSubmit}>
        <Toaster position='top-center' reverseOrder={false}></Toaster>
            <h1 className='font-bold text-[50px] text-purple-600'>Hello Again !</h1>
            <h4 className='font-bold text-[15px] text-purple-400'>Enter Your Username to Recover Your Password</h4>
            <br></br>
            <input onChange={(e)=>setUsername(e.target.value)} className='border-b-2 ml-4 border-b-slate-500 px-5 py-4 rounded-xl w-3/4 shadow-sm text-lg text-white focus:outline-none bg-transparent' type={"text"}  placeholder='Username' />      
            <button type="Submit" className='mt-5 border-4 border-purple-600 bg-purple-600 w-3/4 py-4 rounded-lg text-gray-50 text-xl shadow-sm text-center hover:bg-transparent hover:text-purple-400  hover:border-purple-600'>
            <span className='text-white-500 font-bold'>Generate OTP</span>
            </button>
            <p className='text-[#c3c2c2] mt-2 ml-15 mb-4'>Remember Password ? <Link to="/"><span className='text-purple-500 font-bold' >Login</span></Link></p>
            </form>

        </div>
    );
}