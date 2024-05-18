import toast from 'react-hot-toast';
import {authenticate} from './helper';
export function SignUpValidate(values){
    const errors = usernameVerify({}, values);
    emailsverify(errors,values);
    passwordverify(errors,values);
    if(Object.keys(errors).length !== 0){
        return errors;
    } 
    return {};
}
export async function LoginValidate(values){
    console.log(values.username);
    const errors = usernameVerify({}, values);
    if(values.username){
        const {status}=await authenticate({username:values.username});
        if(status!==200){
            errors.exist=toast.error('User Dose not Exist...!')
        }
    }
    passwordverify(errors,values);
    return errors;
}
export async function ProfileValidate(values){
    const errors=emailsverify({},values);
    return errors;
   }
function passwordverify(error = {}, values) {
    const specialchars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (!values.password) {
        error.password = toast.error("Password Required...!");
    }
    else if (values.password.includes(" ")) {
        error.password = toast.error("Invalid Password");
    } else if (values.password.length < 4) {
        error.password = toast.error("Password must have more than 4 characters");
    } else if (!specialchars.test(values.password)) {
        error.password = toast.error("Password must have Special Characters");
    }
    return error;
}
export async function resetPasswordValidate(values){
    const error=passwordverify({},values);
    if(values.password!=values.confirm_password){
        error.exist=toast.error("Password not match..") 
    }
    return error;
    }
function usernameVerify(error = {}, values) {
    if (!values.username) {
        error.username = toast.error("Username Required...!");
    }
    else if (values.username.includes(" ")) {
        error.username = toast.error("Invalid Username");
    }
    {}
    return error;
}
function emailsverify(error={},values){
    if(!values.email){
        error.email=toast.error("Email Required...!");
    }else if(values.email.includes(" ")){
        error.email=toast.error("Wrong Email...!");
    }
    return error;
}