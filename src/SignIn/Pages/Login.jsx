import { Link, useNavigate } from 'react-router-dom';
import image from '../../assets/logo.jpg';
import { IoIosEye } from "react-icons/io";
import Styles from '../Styles/Login.module.css';
import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import toast, { Toaster } from 'react-hot-toast';
import { LoginValidate } from '../Helper/validate';
import { useAuthStore } from '../store/store';
import { authenticate, getUser, VerifyPassword } from '../Helper/helper';

export default function LogIn() {
    const setUsername = useAuthStore(state => state.setUsername); 
    const [showPassword, setShowPassword] = useState(true);
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validate: LoginValidate,
        validateOnChange: false,
        validateOnBlur: false,
        onSubmit: async (values) => {
            console.log("Submitted values:", values.username, values.password); 
            try {
                
                // First authenticate the user
              
                let loginVerify = await VerifyPassword({ username: values.username, password: values.password });
                   
                // Extract the token from the response
                let { token } = loginVerify.data;
                localStorage.setItem('token', token);
                localStorage.setItem('username', values.username);

                // Get user profile information
                const user = await getUser({ username: values.username });
                if (user.profile) {
                    localStorage.setItem('Profile', user.profile);
                }

                setUsername(values.username);
                toast.success(<b>Successfully Logged In</b>);
                navigate("/");   
            } catch (e) {
                toast.error(<b>Something went wrong</b>);
            }
        },
    });

    return (
        <div className={`container mt-6 mx-auto border-solid border-[2px] border-purple-400 rounded-3xl ${Styles.maindiv}`}>
            <form onSubmit={formik.handleSubmit}>
                <Toaster position='top-center' reverseOrder={false}></Toaster>
                <img className={Styles.image} style={{ height: "100%", width: "35%" }} src={image} />
                <h1 className='font-bold text-[30px] text-purple-600'>Welcome To Connect Hub!</h1>
                <input {...formik.getFieldProps('username')} className='border-b-2 ml-4 border-b-slate-500 px-5 py-4 rounded-xl w-3/4 shadow-sm text-lg text-white focus:outline-none bg-transparent ' type="text" placeholder="Username"></input>
                <br />
                <input {...formik.getFieldProps('password')} className='border-b-2 ml-4 border-b-slate-500 px-5 py-4 rounded-xl w-3/4 shadow-sm text-lg text-white focus:outline-none bg-transparent' type={showPassword ? "password" : "text"} placeholder='Password' />
                <IoIosEye className="cursor-pointer absolute right-[13%]  top-[60%] transform -translate-y-50" onClick={() => setShowPassword(!showPassword)} style={{ fontSize: '22px' }} />       
                <h5 className="ml-[50%]"><Link to='/username'><span className='text-purple-500 font-bold' >Forgot Password ?</span></Link></h5>
                <button type="submit" className='mt-11 border-4 border-purple-600 bg-purple-600 w-3/4 py-4 rounded-lg text-gray-50 text-xl shadow-sm text-center hover:bg-transparent hover:text-purple-400  hover:border-purple-600'>
                    <span className='text-white-500 font-bold'>Log In</span>
                </button>
                <p className='text-[#c3c2c2] mt-2 ml-20 mb-4'>Don't Have an Account ? <Link to="/signUp"><span className='text-purple-500 font-bold' >SignUp here</span></Link></p>
            </form>
        </div>
    );
}
