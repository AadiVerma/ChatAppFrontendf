import axios from 'axios';
import { useEffect,useState } from 'react';
import { getUsername } from '../Helper/helper';
export default function useFetch(query){
    const [getData,setData]=useState({isLoading:false,apiData:undefined,status:null,serverError:null});
    useEffect(()=>{
        const fetchData=async ()=>{
            try {
                setData(prev=>({...prev,isLoading:true}));
                const {username}= await getUsername();
                const response = (!query)? await axios.get(`/api/user/${username}`):await axios.get(`/api/${query}`);
                setData({
                    isLoading: false,
                    apiData: response.data,
                    status: response.status,
                    serverError: null
                });
                setTimeout(() => setData(prev => ({ ...prev, isLoading: false })), 500);
            } catch (error) {
                setData({
                    isLoading: false,
                    apiData: undefined,
                    status: null, 
                    serverError: error
                });
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    },[query])
    return [getData,setData];
}