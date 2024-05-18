import image from "../assets/20944388.jpg"
export default function Section2(){
    return (
        <div>
            <h1 className="pt-24 font-bold text-5xl text-purple-600">Connecting You Seamlessly:  Chats at Connect Hub</h1>
            <div className="flex flex-wrap lg:flex-nowrap p-[5%] gap-10">
                <img src={image} className="w-4/5 lg:w-2/5 rounded-[15%] shadow-2xl shadow-purple-700 border-8 border-dark-purple ml-[7%] lg:ml-[0%]"/>
                <div>
                    <h2 className="font-semibold text-3xl text-purple-500 underline-offset-8 underline">About Us</h2>
                    <h5 className="text-center text-xl pt-5 font-medium" >Connect Hub is a versatile platform designed to facilitate seamless communication through chat features. With Connect Hub, users can easily connect with friends, family, colleagues, or clients from anywhere in the world. Whether it's for personal catch-ups or professional meetings, Connect Hub provides a user-friendly interface for efficient and effective communication. Our platform prioritizes reliability, security, and user experience, ensuring that users can stay connected effortlessly .</h5>
                </div>
            </div>
        </div>
    )
}