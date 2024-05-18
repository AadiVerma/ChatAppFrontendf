import { Link ,useNavigate} from 'react-router-dom';
import { useState } from 'react';
import { IoIosEye } from "react-icons/io";
import image from '../../assets/man.png';
import Styles from '../Styles/Login.module.css';
import toast, { Toaster } from 'react-hot-toast';
import { SignUpValidate } from '../Helper/validate';
import { useFormik } from 'formik';
import { useAuthStore } from '../store/store';
import convertToBase64 from '../Helper/convert.jsx'
import { registeruser } from '../Helper/helper.jsx';
export default function SignUp() {
    const navigate=useNavigate();
    const setUsername=useAuthStore(state=>state.setUsername);
    const [showPassword, setShowPassword] = useState(false);
    const[file,setFile]=useState(null);
    const formik = useFormik({
        initialValues: {
            username: '',
            email:'',
            password: '',
            
        },
        validate:SignUpValidate,
        validateOnChange:false,
        validateOnBlur:false,
        onSubmit: async (values) => {
            setUsername(values.username);
            values= Object.assign(values,{profile:file || ''})
            try {
                 await registeruser(values); 
                toast.success(<b>Successfully signed up</b>);
                navigate('/');
              } catch (error) {
                toast.error(<b>Something went wrong</b>); 
              }
            },
    });
    const OnUpload=async e=>{
        const base64=await convertToBase64(e.target.files[0]);
        setFile(base64);
    }
    return (
        <div className={`container mt-4 mx-auto border-solid border-[2px] border-purple-400 rounded-3xl ${Styles.maindiv}`}>
        <form onSubmit={formik.handleSubmit}>
        <Toaster position='top-center' reverseOrder={false}></Toaster>
             <label htmlFor='profile'><img className={Styles.image} src={file || image} alt="avatar" /></label>
            <input onChange={OnUpload} type="file" id="profile" name="profile"/>
            <h1 className='font-bold text-[30px] text-purple-600'>Let's Create an Account !</h1>
            <input {...formik.getFieldProps('username')}  className='border-b-2 ml-4 border-b-slate-500 px-5 py-4 rounded-xl w-3/4 shadow-sm text-lg text-white focus:outline-none bg-transparent ' type="text" placeholder="Username"></input><br></br>
            <input {...formik.getFieldProps('email')}  className='border-b-2 ml-4 border-b-slate-500 px-5 py-4 rounded-xl w-3/4 shadow-sm text-lg text-white focus:outline-none bg-transparent ' type="email" placeholder="Email"></input><br></br>

            <input {...formik.getFieldProps('password')}  className='border-b-2 ml-4 border-b-slate-500 px-5 py-4 rounded-xl w-3/4 shadow-sm text-lg text-white focus:outline-none bg-transparent' type={showPassword ? "text" : "password"} placeholder='Password' />
            <IoIosEye className="cursor-pointer absolute right-[13%]  top-[69%] transform -translate-y-50" onClick={() => setShowPassword(!showPassword)} style={{ fontSize: '22px' }} />
            <button className='mt-5 border-4 border-purple-600 bg-purple-600 w-3/4 py-4 rounded-lg text-gray-50 text-xl shadow-sm text-center hover:bg-transparent hover:text-purple-400  hover:border-purple-600' type='submit'><span className='text-white-500 font-bold'>Sign Up</span></button>
            <p className='text-[#c3c2c2] mt-2  mb-4'>Already Register? <Link to="/login"><span className='text-purple-500 font-bold' >Login here</span></Link></p>
            </form>
        </div>
    );
}