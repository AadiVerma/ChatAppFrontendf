import { IoMdSearch } from "react-icons/io";
import ChatTemplate from "./ChatsTemplate";
import '../App.css';
export default function Sidebar2({flag,data,currentUser,setCurrentChat,online}) {
    return (
        <div className={`w-[28%] bg-purple-400 min-h-[100vh] ${flag? "block":"hidden"}`}>
            <div className="h-20 bg-purple-800 pt-4">
                <div className="flex bg-purple-400 h-10 ml-2 mr-3 p-2 rounded-xl">
                    <IoMdSearch className="text-white text-2xl mr-2" />
                    <input placeholder="Search..." className="bg-purple-400 text-white outline-none placeholder-white w-[100%]" />
                </div>
            </div>
            <div className="overflow-y-auto max-h-[86vh] scrollbar-track-sky-500">
            {data.map((chat,id)=>(
               <ChatTemplate data={chat} key={id} online={online(chat)} currentUser={currentUser} setClick={setCurrentChat}/>
               
            ))}
            </div>
        </div>
    )
}