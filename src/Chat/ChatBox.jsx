import React, { useEffect, useRef, useState } from "react";
import Image from '../assets/signinimage.png';
import { getuserDataForChat } from "../SignIn/Helper/helper";
import { MdAttachFile } from "react-icons/md";
import { IoIosSend } from "react-icons/io";
import { getMesages, addMessage } from "../SignIn/Helper/helper";
import { format } from 'timeago.js';
import InputEmoji from "react-input-emoji";
import '../App.css';
const ChatBox = ({ chat, currentUser, flag, setSendMessage, recieveMessage,online }) => {
    const [userData, setUserData] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const scroll=useRef();
    const handleChange = (newMessage) => {
        setNewMessage(newMessage);
    };
    useEffect(() => {
        if (recieveMessage && recieveMessage.chatId === chat._id) {
            setMessages(prevMessages => [...prevMessages, recieveMessage]);
        }
    }, [recieveMessage]);
    useEffect(() => {
        const userId = chat?.members?.find((id) => id !== currentUser);
        const getUserData = async () => {
            try {
                const data = await getuserDataForChat({ id: userId });
                setUserData(data);
            } catch (error) {
                console.log(error);
            }
        };

        if (chat) getUserData();
    }, [chat, currentUser]);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const { data } = await getMesages(chat._id);
                setMessages(data);
            } catch (error) {
                console.error(error);
            }
        };

        if (chat) fetchMessages();
    }, [chat]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        const message = {
            senderId: currentUser,
            chatId: chat._id,
            text: newMessage,
        };
        setNewMessage("");
        const recieverId = chat.members.find((id) => id !== currentUser);
        setSendMessage({ ...message, recieverId });
        try {
            await addMessage(message);
            setMessages([...messages, message]);
        } catch (error) {
            console.log(error);
        }
        // send message to server

    };

    useEffect(() => {
        scroll.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);
    
    
    const userName = userData ? (userData[0]?.firstName || userData[0]?.username) : '';

    return (
        <div className={`bg-purple-500 relative min-w-[100%]`}>
            {/* User details */}
            <div className='flex gap-5 bg-purple-600 p-5'>
                {/* User profile image */}
                <img src={userData?.profile ? userData.profile : Image} className='rounded-full w-[5%] bg-purple-500 ' />
                <div className=''>
                    <h1 className='text-md font-semibold'>{userName}</h1>
                    <div className='flex gap-2'>
                        {online && <h2 className='h-2 w-2 rounded-full bg-green-400 mt-3'></h2>}
                        <h2 className='text-sm text-gray-100 mt-1'>{online?"Online":"Offline"}</h2>
                    </div>
                </div>
            </div>

            {/* Messages */}
            {/* #80298c */}
            <div className="overflow-auto h-[86vh] pb-14 scrollbar-track-sky-500">
                {messages.map((message, index) => (
                    <div key={index} className="p-4">
                        <div ref={scroll}  className={`w-full flex ${message.senderId !== currentUser ? "justify-start" : "justify-end"}`}>
                            <div className={` ${message.senderId !== currentUser ? "bg-[#80298c] rounded-br-2xl rounded-tl-2xl rounded-tr-2xl justify-end" : "bg-purple-950 rounded-bl-2xl rounded-tl-2xl rounded-tr-2xl justify-end"} p-3`}>
                                <div className="text-md font-medium">{message.text}</div>
                            </div>
                        </div>
                        <div className={`text-sm font-light flex ${message.senderId !== currentUser ? "justify-start" : "justify-end"}`}>
                            {format(message.createdAt)}
                        </div>
                    </div>
                ))}
            </div>

            {/* Input box */}
            <div className='absolute bottom-0  h-[10%] mt-4 bg-purple-600 w-full flex gap-4 justify-evenly'>
                <div className='flex w-[90%]'>
                    <InputEmoji
                        onChange={handleChange}
                        background="transparent"
                        borderColor="rgba(147 51 234)"
                        placeholderColor="white"
                        placeholder="Your Message Here..."
                        value={newMessage}
                    />
                </div>

                {/* Attach file and send buttons */}
                <div className='flex'>
                    <IoIosSend className='text-3xl mt-5  text-purple-300 cursor-pointer'    onClick={handleSubmit} />
                </div>
            </div>
        </div>
    );
}

export default ChatBox;
