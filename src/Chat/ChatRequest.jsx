import axios from 'axios';
axios.defaults.baseURL = 'https://chatappbackend-ul27.onrender.com';
export const userChats=(id)=>axios.get(`/chat/${id}`)
// export const getUsers=()=>axios.get('/api/user');