import { IoIosEye } from "react-icons/io";
import { useState } from 'react';
import Styles from '../Styles/Login.module.css';
import { resetPasswordValidate } from '../Helper/validate';
import { useFormik } from 'formik';
import toast,{Toaster} from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import { resetPassword } from "../Helper/helper";
export default function Reset() {
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword1, setShowPassword1] = useState(false);
    const navigate=useNavigate();
    const formik=useFormik({
        initialValues: {
            password: '',
            confirm_password: '',
        },
        validate:resetPasswordValidate,
        validateOnBlur:false,
        validateOnChange:false,
        onSubmit: async (values) => {
            try {
                const username = localStorage.getItem('username');
                const { status } = await resetPassword({ username: username, password: values.password });
                if (status === 201) {
                    toast.success("Reset Successfully...!");
                } else {
                    toast.error("Something went wrong...!");
                }
                localStorage.removeItem("username");
                navigate("/");
            } catch (error) {
                console.error(error);
                toast.error("Could not Reset...!");
            }
        },
        
    });
    return (
        <div className={`container mt-20 mx-auto px-1 py-10 pb-20 border-solid border-[2px] border-purple-400 rounded-3xl ${Styles.maindiv}`}>
        <form onSubmit={formik.handleSubmit}>
        <Toaster position='top-center' reverseOrder={false}></Toaster>
            <h1 className='font-bold text-[50px] text-purple-600'>Reset Password !</h1>
            <h4 className='font-bold text-[15px] text-purple-400'>Enter New Password</h4>
            <br></br>
            <input {...formik.getFieldProps('password')}  className='border-b-2 ml-4 border-b-slate-500 px-5 py-4 rounded-xl w-3/4 shadow-sm text-lg text-white focus:outline-none bg-transparent' type={showPassword ? "text" : "password"} placeholder='Password' />
            <input {...formik.getFieldProps('confirm_password')}  className='border-b-2 ml-4 border-b-slate-500 px-5 py-4 rounded-xl w-3/4 shadow-sm text-lg text-white focus:outline-none bg-transparent' type={showPassword1 ? "text" : "password"} placeholder='Confirm' />
            <IoIosEye className="cursor-pointer absolute right-[13%]  top-[41%] transform -translate-y-50" onClick={() => setShowPassword(!showPassword)} style={{ fontSize: '22px' }} /> 
            <IoIosEye className="cursor-pointer absolute right-[13%]  top-[55%] transform -translate-y-50" onClick={() => setShowPassword1(!showPassword1)} style={{ fontSize: '22px' }} /> 
            <button type="Submit" className='mt-5 border-4 border-purple-600 bg-purple-600 w-3/4 py-4 rounded-lg text-gray-50 text-xl shadow-sm text-center hover:bg-transparent hover:text-purple-400  hover:border-purple-600'>
            <span className='text-white-500 font-bold'>Reset</span>
            </button>
            </form>

        </div>
    );
}