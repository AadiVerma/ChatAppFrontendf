import SideBar1 from "./SideBar1";
import Sidebar2 from "./SideBar2";
import MainPage from "./MainPage";
import { userChats } from "./ChatRequest";
import { useState, useEffect, useRef } from "react";
import { getUser } from "../SignIn/Helper/helper";
import { io } from 'socket.io-client';
import '../App.css';
const Chat = () => {
    const [showMessage, setShowMessage] = useState(true);
    const [chat, setChats] = useState([]);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [user, setUser] = useState({});
    const [sendMessage, setSendMessage] = useState(null);
    const [recieveMessage, setRecieveMessage] = useState(null);
    const [currentChat, setCurrentChat] = useState(null);
    const socket = useRef();
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const username = localStorage.getItem("username");
                const user = await getUser({ username });
                setUser(user);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchData();
    }, []);
    useEffect(() => {
        const getChats = async () => {
            try {
                const { data } = await userChats(user._id);
                setChats(data);
            } catch (error) {
                   console.log(error);
            }
        }
        getChats();
    }, [user._id]);
    useEffect(() => {
        socket.current = io('https://chatappsocketbackend-90oz.onrender.com');
        socket.current.emit("new-user-add", (user._id));
        socket.current.on("get-users", (users) => {
            setOnlineUsers(users);
        })
    }, [user]);
    useEffect(() => {
        if (sendMessage !== null) {
            socket.current.emit('send-message', sendMessage);
        }
    }, [sendMessage]);
    useEffect(() => {
        socket.current.on('recieve-message', (data) => {
            // console.log("here is data",data);
            setRecieveMessage(data);
        });
    });
    const checkOnlineStatus=(chat)=>{
        const chatmembers=chat.members.find((member)=>member!==user._id);
        console.log(chatmembers);
        const online=onlineUsers.find((user)=>user.userId===chatmembers);
        return online?true:false;
    }

    return (
        <div className="flex h-max-[100vh]">
            <SideBar1 setShowMessage={setShowMessage} showMessage={showMessage} />
            <Sidebar2 flag={showMessage} data={chat} currentUser={user._id} setCurrentChat={setCurrentChat} online={checkOnlineStatus}/>
            <MainPage flag={showMessage} setSendMessage={setSendMessage} data={chat} currentUser={user._id} currentChat={currentChat} recieveMessage={recieveMessage}  online={checkOnlineStatus} />
        </div>
    )
}
export default Chat;