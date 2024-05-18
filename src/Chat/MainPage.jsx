import ChatBox from './ChatBox';
import '../App.css';
export default function MainPage({ flag, currentChat, currentUser, setSendMessage, recieveMessage ,online}) {
    return (
        <div className='w-full bg-purple-700 '>
            {currentChat ? <ChatBox chat={currentChat} currentUser={currentUser} flag={flag} setSendMessage={setSendMessage} recieveMessage={recieveMessage} online={online(currentChat)}/> : <div className='w-full mt-[14%] font-bold text-xl p-[10%]'>
                <h1 className='font-extrabold text-6xl text-purple-950'>Connect Hub</h1>
                <h1>Start chatting with your nearest and dearest by tapping on a chat from your list of contacts. Simply select the person you want to talk to, and you're all set to begin the conversation</h1>
            </div>}

        </div>
    )
}