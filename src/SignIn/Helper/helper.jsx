import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
axios.defaults.baseURL = 'https://chatappbackend-ul27.onrender.com'

// to  get username from Token
export async function getUsername(){
  const token=localStorage.getItem('token');
  if(!token) return Promise.reject('Cannot Find Token');
  const decodedToken = jwtDecode(token);
  return decodedToken;      
}

export async function authenticate({username}){
  console.log({username});
    try {
        return await axios.post('./api/authenticate',{username});
    } catch (error) {
        return {error:"Username Dosen't Exist...!!"};
    }
}
export async function getMesages(id){
   try {
     const data=await axios.get(`/message/${id}`);
     return data;
   } catch (error) {
     return error;
   }
} 
export async function addMessage(data){
  try {
    await axios.post('/message/',data);
  } catch (error) {
    return error;
  }
}
export async function getuserDataForChat({id}){
  try{
    // console.log(id)
   const response =await axios.get(`/api/user/userId/${id}`);
   if (response.status !== 200) {
    throw new Error(`Request failed with status code: ${response.status}`);
  }
  return response.data;
  }catch (error) {
    console.error('Error fetching user:', error); 
    return { error: 'An error occurred while fetching user data.' };
  }
}
export async function getUser({ username }) {
  try {
    const response = await axios.get(`/api/user/${username}`);

    // Check for successful response status code (typically 200)
    if (response.status !== 200) {
      throw new Error(`Request failed with status code: ${response.status}`);
    }
    return response.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    return { error: 'An error occurred while fetching user data.' }; 
  }
}


export async function registeruser(credentials){
    try {
        const {data:{msg},status}=await axios.post('/api/register',credentials);
        if(status===201){
          return Promise.resolve(msg);
        }
        
    } catch (error) {
        return Promise.reject({error});
    }
}
export async function VerifyPassword({username,password}){
  try {
   if(username){
        const data= await axios.post('/api/login',{username:username,password:password});
        return Promise.resolve(data);
   }
  } catch (error) {
    return Promise.reject({error:"Password Doesn't Match....!"});
  }
}
export async function UpdateUser(response){
    try {
     
        const token=localStorage.getItem('token');

        const data=await axios.put('/api/updateUser',response,{headers:{"Authorization":`Bearer ${token}`}});
        localStorage.setItem("Profile",response.profile);
        return Promise.resolve({data});
    } catch (error) {
        return Promise.reject({error:"Couldn't update user"});
    }
}
export async function generateOTP(username){
    try {
       const {data:{code},status} =await axios.get('/api/generateOTP',{params:{username}});
       if(status===201){
          const {email}=await getUser({username});
          let text=`Your password recovery OTP is ${code}. Verify and recover your Password`;
          await axios.post('/api/registerMail',{username,userEmail:email,text,subject:"Password recovery OTP"});
       }
       return Promise.resolve(code);
    } catch (error) {
        return Promise.reject({error});
    }
}
export async function Contact({FullName,EmailAddress,MobileNo,EmailSubject,Message}){
    try{
     await axios.post('/api/contact',{username:FullName,userEmail:EmailAddress,subject:EmailSubject,text:Message});
     return Promise.resolve({msg:"Message Sent Successfully"});
    }
    catch(error){
      return Promise.reject({error});
    }
}
export async function verifyOTP({username,code}){
  try {
    const {data,status}=await axios.get('/api/verifyOTP',{params:{username:username,code:code}});
    return {data,status};
  } catch (error) {
    return Promise.reject({error});
  }
}
export async function resetPassword({username,password}){
  try {
    const {data,status}=await axios.put('/api/resetPassword',{username:username,password:password});
    return Promise.resolve({data,status});
  } catch (error) {
    return Promise.reject({error});
  }
} 