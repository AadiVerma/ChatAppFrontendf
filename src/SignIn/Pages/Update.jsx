import { Link ,useNavigate } from 'react-router-dom';
import profile from '../../assets/man.png';
import { useState} from 'react';
import {useFormik} from 'formik';
import toast,{Toaster} from 'react-hot-toast';
import { ProfileValidate } from '../Helper/validate';
import styles from '../Styles/Login.module.css';
import convertToBase64 from '../Helper/convert.jsx'
import useFetch from '../hooks/fetch.hook.jsx';
import { UpdateUser } from '../Helper/helper.jsx';
export default function Update() {
    const navigate=useNavigate();
    const [{isLoading,apiData,serverError}]=useFetch()
    const [file,setFile]=useState();
    const formik=useFormik({
        initialValues: {
            firstName:apiData?.firstName || '',
            lastName:apiData?.lastName||'',
            email:apiData?.email || '',
            MobileNo:apiData?.MobileNo || '',
            Address:apiData?.Address||'',
            profile:apiData?.profile || '',
        },
        enableReinitialize:true,
        validate:ProfileValidate,
        validateOnBlur:false,
        validateOnChange:false,
        onSubmit: async(values) => {
            values= Object.assign(values,{profile:file || apiData?.profile ||' '})
            
            try {
                await UpdateUser(values);
                toast.success("Successfully updated");
                navigate("/");
            } catch (error) {
                 toast.error(error.response.data.error);
            }
        },
    });
    const OnUpload=async e=>{
        const base64=await convertToBase64(e.target.files[0]);
        setFile(base64);
    };
    function userLogout(){
        localStorage.removeItem('token');
        navigate('/');
    }
    if(isLoading) return <h1 className='text-2xl font-bold'>isLoading...</h1>
    if(serverError) return <h1 className='text-xl text-red-500'>{serverError.message}</h1>
    return (
        <div className={`container mx-auto my-5 py-5 ${styles.maindiv}`} >
        <Toaster position='top-center' reverseOrder={false}></Toaster>
            <div className='flex justify-center items-center h-full'>
                <div className={styles.glass}>
                    <div className='title flex flex-col items-center'>
                        <h4 className='text-5xl font-bold'>Profile</h4>
                        <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
                        You can Update the Details
                        </span>
                    </div>
                    <form className='py-1' onSubmit={formik.handleSubmit}>
                        <div className='profile flex justify-center py-4'>
                          <label htmlFor='profile'>
                          <img className={styles.profile_img} src={file|| apiData?.profile || profile} alt="avatar" />
                          </label>
                          <input onChange={OnUpload} type="file" id="profile" name="profile"/>
                        </div>
                        <div className='textbox flex flex-col items-center gap-6'>
                          <div className='name flex w-3/4 gap-10'>
                          <input {...formik.getFieldProps('firstName')} className='border-b-2 ml-4 border-b-slate-500 px-5 py-4 rounded-xl w-3/4 shadow-sm text-lg text-white focus:outline-none bg-transparent ' type="text" placeholder="First Name"></input>
                          <input {...formik.getFieldProps('lastName')} className='border-b-2 ml-4 border-b-slate-500 px-5 py-4 rounded-xl w-3/4 shadow-sm text-lg text-white focus:outline-none bg-transparent ' type="text" placeholder="Last Name"></input>
                          </div>
                          <div className='name flex w-3/4 gap-10'>
                          <input {...formik.getFieldProps('MobileNo')} className='border-b-2 ml-4 border-b-slate-500 px-5 py-4 rounded-xl w-3/4 shadow-sm text-lg text-white focus:outline-none bg-transparent ' type="text" placeholder="Mobile No"></input>
                          <input {...formik.getFieldProps('email')}  className='border-b-2 ml-4 border-b-slate-500 px-5 py-4 rounded-xl w-3/4 shadow-sm text-lg text-white focus:outline-none bg-transparent ' type="email" placeholder='Email' />
                          </div>
                          <input {...formik.getFieldProps('Address')}  className='border-b-2 ml-4 border-b-slate-500 px-5 py-4 rounded-xl w-3/4 shadow-sm text-lg text-white focus:outline-none bg-transparent ' type="text" placeholder='Address' />
                          <button className="mt-4 border-4 border-purple-600 bg-purple-600 w-3/4 py-4 rounded-lg text-gray-50 text-xl shadow-sm text-center hover:bg-transparent hover:text-purple-400  hover:border-purple-600" type="Submit"><span className='text-white-500 font-bold'>Update</span></button>
                        </div>
                        <div className='text-center py-4'>
                        <p className='text-[#c3c2c2] mt-2 ml-18 mb-4'>Come back later ? <span className='text-purple-500 font-bold cursor-pointer'onClick={userLogout} >Log Out</span></p>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
}