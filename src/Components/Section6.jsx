import image from '../assets/logo.jpg';
import { FaSquareInstagram } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaGithubSquare } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaCopyright } from "react-icons/fa";
export default function Footer(){
    return (
        <div className='justify-center content-center'>
            <img src={image} className='ml-[26%] md:ml-[40%] mb-[4%] md:mb-0 w-[50%] md:w-[20%]' />
            <h2 className="font-bold text-4xl -mt-9 text-purple-600">Connect Hub</h2>
            <div className='flex justify-center mt-5 gap-5 mb-5'>
                <a href="https://www.instagram.com/aditya946verma/" target='_blank'>
                <FaSquareInstagram className='text-6xl text-purple-500 hover:text-black hover:bg-purple-700 hover:rounded-lg cursor-pointer'/>
                </a>
                <a href="https://www.linkedin.com/in/aditya-verma-a12457260/" target='_blank'>
                <FaLinkedin className='text-6xl text-purple-500  hover:text-black hover:bg-purple-700 hover:rounded-lg cursor-pointer'/>
                </a>
                <a href="https://github.com/AadiVerma" target="_blank">
                <FaGithubSquare className='text-6xl text-purple-500  hover:text-black hover:bg-purple-700 hover:rounded-lg cursor-pointer'/>
                </a>
                <a href="https://twitter.com/KaplishAditya" target='_blank'>
                <FaSquareXTwitter className='text-6xl text-purple-500  hover:text-black hover:bg-purple-700 hover:rounded-lg cursor-pointer'/>
                </a>
            </div>
            <div className='flex justify-center gap-2 mt-5 text-purple-200 mb-5'>
                <FaCopyright className='mt-1'/>
                <h5>2024 Connect Hub</h5>
            </div>
        </div>
    )
}