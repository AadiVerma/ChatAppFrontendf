export default function Section5({setEmail,setFullName,setMobileNo,setSubject,setText,sendMail,email,FullName,mobileNo,subject,text}){
    const handleSubmission=()=>{
        sendMail();
        setEmail("");
        setFullName("");
        setMobileNo("");
        setSubject("");
        setText("");

    }
 return (
    <div className=" pl-10 sm:pl-36 pr-10 sm:pr-36 pt-20 pb-10">
        <h2 className="font-bold text-5xl mb-20 text-purple-600">Contact</h2>
        <div className="flex justify-center gap-10">
            <input className="h-14 border-4 border-purple-500 bg-transparent rounded-lg w-[40%] ml-[2%] text-white pl-[15px] focus:outline" type="text" value={FullName} id="" placeholder="Full Name" required onChange={(e)=>setFullName(e.target.value)}/>
            <input className="h-14 border-4 border-purple-500 bg-transparent rounded-lg w-[40%] ml-[2%] text-white pl-[15px] focus:outline" type="email" value={email} id="" placeholder="Email Address" required onChange={(e)=>setEmail(e.target.value)}/>
        </div>
        <div className="flex justify-center gap-10 mt-6">
            <input  className="h-14 border-4 border-purple-500 bg-transparent rounded-lg w-[40%] ml-[2%] text-white pl-[15px] focus:outline" type="text" value={mobileNo} id="" placeholder="Mobile Number" onChange={(e)=>setMobileNo(e.target.value)}/>
            <input  className="h-14 border-4 border-purple-500 bg-transparent rounded-lg w-[40%] ml-[2%] text-white pl-[15px] focus:outline" type="text" value={subject} id="" placeholder="Email Subject" required onChange={(e)=>setSubject(e.target.value)}/>
        </div>
        <textarea className="h-36 border-4 border-purple-500 bg-transparent rounded-lg w-[86%] ml-[2%] text-white pl-[15px] focus:outline mt-6 p-5"value={text} placeholder="Your Message" required onChange={(e)=>setText(e.target.value)}/>
        <div className="block justify-center mt-8"><button className="bg-purple-900 w-[50%] h-14 md:w-[15%] rounded-lg m-[-5px] hover:bg-[#42185e]" type="submit" onClick={handleSubmission}>Submit</button></div>
    </div>
 )
}