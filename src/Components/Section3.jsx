import image from '../assets/3947330.jpg'
export default function Section3(){
    return(
        <div className="p-20 pt-1">
            <h1 className="pt-24 font-bold text-5xl text-purple-600">Start Your Chatting for Free Now with Connect Hub!</h1>
            <div className='flex flex-wrap lg:flex-nowrap gap-10 p-[5%]'>
            <h4 className="text-center text-xl pt-[8%] font-medium "> Experience seamless communication with friends, family, and colleagues from anywhere in the world. Our user-friendly platform ensuring you stay connected effortlessly. Connect Hub provides reliable and secure communication tools for everyone. Join us today and experience the power of seamless connectivity!</h4>
            <img src={image} className="w-[90%] lg:w-[40%] mt-10 ml-[6%] lg:ml-[0%] rounded-[10%] shadow-2xl shadow-purple-700 border-8 border-dark-purple"/>
            </div>
        </div>
    )
}