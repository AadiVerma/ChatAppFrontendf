import { IoMdSearch } from "react-icons/io";
import ChatTemplate from "./ChatsTemplate";
import '../App.css';
export default function Sidebar2({flag,data,currentUser,setCurrentChat,online}) {
    return (
        <div className={`w-[28%] bg-purple-400 min-h-[100vh] ${flag? "block":"hidden"}`}>
            <div className="h-20 bg-purple-800 pt-3">
                <h2 className="text-lg font-bold">Engage in Conversations with Others</h2>
            </div>
            <div className="overflow-y-auto max-h-[86vh] scrollbar-track-sky-500">
            {data.map((chat,id)=>(
               <ChatTemplate data={chat} key={id} online={online(chat)} currentUser={currentUser} setClick={setCurrentChat} />
               
            ))}
            </div>
        </div>
    )
}