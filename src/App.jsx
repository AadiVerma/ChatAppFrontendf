import { useNavigate, useParams } from 'react-router-dom';
import { useRef } from 'react';
import './App.css';
import logo from './assets/logo.jpg';
import chatimage from './assets/3156814.jpg'
import Section1 from './Components/Section1';
import Section2 from './Components/Section2';
import Section3 from './Components/Section3';
import Section4 from './Components/Section4';
import Section5 from './Components/Section5';
import Footer from './Components/Section6';
import { IoIosOptions } from "react-icons/io";
import profile from '../src/assets/man.png'
import convertToBase64 from '../src/SignIn/Helper/convert.jsx'
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Contact } from './SignIn/Helper/helper.jsx';
function App() {
  const [FullName, setFullName] = useState();
  const [email, setEmail] = useState();
  const [show, setShow] = useState(false);
  const ref = useRef(null);
  const [mobileNo, setMobileNo] = useState();
  const [subject, setSubject] = useState();
  const [text, setText] = useState();
  const notify = () => toast.error("Login required for access.", {
    position: "top-right",
    autoClose: 1700,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });
  const WrongContact = () => toast.error("Something Went Wrong", {
    position: "top-right",
    autoClose: 1700,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });
  const Success = () => toast.success("Email sent successfully! ", {
    position: "top-right",
    autoClose: 1700,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });
  const LogOut = () => toast.success("Logged out Successfully ", {
    position: "top-right",
    autoClose: 1700,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });
  const sendMail = async () => {
    try {
      await Contact({ FullName, EmailAddress: email, MobileNo: mobileNo, EmailSubject: subject, Message: text });
      Success();
    } catch (error) {
      WrongContact();
    }
  }
  const [click, setClick] = useState(false); 
  const sidebarRef = useRef(null);
  const [File, setFile] = useState(null);
  const [token, setToken] = useState(null);
  const navigate = useNavigate();
  const login = () => {
    navigate("/login");
  }
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setClick(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  useEffect(() => {
    const getting = localStorage.getItem('token');
    return setToken(getting);
  }, [])
  useEffect(() => {
    async function fetchData() {
      const userprofile = localStorage.getItem('Profile');
      if (userprofile == null) {
        return;
      }
      const base64 = await fetch(userprofile)
        .then(response => response.blob())
        .then(blob => convertToBase64(blob));
      setFile(base64);
    }
    fetchData();
  }, []);
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setShow(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
  const handleLogOut = () => {
    localStorage.clear();
    LogOut();
    setShow(false);
  }
  return (
    <div>
      <div className='bg-black px-0 md:px-20 w-[100%] z-50'>
        <div className='flex justify-between  text-center'>
          <img src={logo} className="lg:w-[15%] w-[25%] rounded-lg" />
          <div className='py-10'>
            <ToastContainer />
            <div className='flex lg:hidden'>
              <IoIosOptions className='text-4xl mt-4 mr-4 cursor-pointer' onClick={() => setClick(!click)} />
              {click && (<div
                ref={sidebarRef}
                className="absolute flex w-[55%] right-5 sm:right-0 z-50 flex-col rounded-xl bg-dark-purple p-4 text-white font-semibold shadow-xl shadow-blue-gray-900">
                <nav className="flex min-w-[240px] flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700">
                  <div>
                    <a href="#home"><div className="justify-center text-center font-bold text-lg border-2 rounded-lg border-purple-500 p-3 hover:bg-purple-500 m-2  cursor-pointer">Home</div></a>
                  </div>
                  <div>
                    <a href="#About"><div className="justify-center text-center font-bold text-lg border-2 rounded-lg border-purple-500 p-3 hover:bg-purple-500 m-2  cursor-pointer">About</div></a>
                  </div>
                  <div>
                    <div>
                      <a href="#FAQ"><div className="justify-center text-center font-bold text-lg border-2 rounded-lg border-purple-500 p-3 hover:bg-purple-500 m-2  cursor-pointer">Faq</div></a>
                    </div>
                  </div>
                  <div>
                    <a href="#Contact"><div className="justify-center text-center font-bold text-lg border-2 rounded-lg border-purple-500 p-3 hover:bg-purple-500 m-2  cursor-pointer">Contact</div></a>
                  </div>
                  <div>
                    <a href="#Connect"><div className="justify-center text-center font-bold text-lg border-2 rounded-lg border-purple-500 p-3 hover:bg-purple-500 m-2  cursor-pointer">Connect</div></a>
                  </div>
                  <div>
                    <div className="justify-center text-center font-bold text-lg border-2 rounded-lg border-purple-500 p-3 hover:bg-purple-500 m-2  cursor-pointer" onClick={handleLogOut}>Log Out</div>
                  </div>

                </nav>
              </div>)}
            </div>
            <ul className='lg:flex gap-10 font-bold hidden relative mt-3'>
              <li><span className='text-dark-purple underline underline-offset-8 hover:cursor-pointer text-xl font-bold' ><a href="#home">Home</a></span></li>
              <li className='hover:text-dark-purple hover:underline hover:underline-offset-8 hover:cursor-pointer text-xl font-bold'><a href="#About">About</a></li>
              <li className='hover:text-dark-purple hover:underline hover:underline-offset-8 hover:cursor-pointer text-xl font-bold'><a href="#FAQ">Faq</a></li>
              <li className='hover:text-dark-purple hover:underline hover:underline-offset-8 hover:cursor-pointer text-xl font-bold'><a href="#Contact">Contact</a></li>
              <li className='hover:text-dark-purple hover:underline hover:underline-offset-8 hover:cursor-pointer text-xl font-bold'><a href="#Connect">Connect</a></li>
              {token == null ?
                <button className='bg-purple-900 h-10 w-20 font-bold rounded-lg m-[-5px] text-lg hover:bg-[#42185e]' onClick={login} >Login</button>
                : <div>
                  <img className="h-16 w-16 rounded-full -mt-4 cursor-pointer" src={File || profile} onClick={() => setShow((prev) => !prev)} />
                </div>}
              <div ref={ref} onMouseEnter={() => setShow(true)}>
                {show && <div className='p-5 bg-purple-500 rounded-lg absolute hover:bg-purple-700 cursor-pointer top-14 right-5'>
                  <h2 className='text-white' onClick={handleLogOut}>Log Out</h2>
                </div>}
              </div>
            </ul>
          </div>
        </div>
      </div>
      <section id="home" className='flex flex-wrap lg:flex-nowrap justify-center px-5 gap-8 bg-[#121212]'>
        <Section1 image={chatimage} heading={"CHATTING"} text={"Begin a conversation with someone by clicking the button below to start chatting. 😊"} headingtext={"Let's Chat"} location={`${token == null ? "/" : "/chat"}`} notify={notify} />
        <h1 className="text-center hidden lg:block text-purple-400 text-3xl pt-5 font-bold w-[50%] mt-[6%]">
          Welcome to our platform! Begin your conversation by selecting a chat thread from the  left side. Engage with friends, family, or colleagues effortlessly. Start your conversation now and experience seamless communication. Thank you for choosing our platform!
        </h1>
      </section>
      <section id="About" className='bg-[#121212]'>
        <Section2 />
      </section>
      <section className='bg-[#121212]'>
        <Section3 />
      </section>
      <section id="FAQ" className='bg-[#121212]'>
        <h2 className="font-bold text-5xl text-purple-600">FAQs</h2>
        <div className='lg:pl-44 lg:pr-44 pl-8 pr-8 mt-16'>
          <Section4 question={"What is Connect Hub, and How does it work?"} answer={"Discover the power of social connection with Connect Hub! Our innovative app facilitates global interactions through chat. With spontaneous conversations and creating meaningful connections in a secure and enjoyable environment."} />
          <Section4 question={"Is Connect Hub safe and secure to use ?"} answer={"Absolutely! At Connect Hub, user safety is our top priority. Our platform implements security measures, including data encryption, to protect your personal information"} />
          <Section4 question={"Can I use Connect Hub for free ?"} answer={"Yes, Connect Hub is completely free to use ! Enjoy all our essential features without any charges."} />

          <Section4 question={"Can I control who I connect with on Connect Hub ?"} answer={"Absolutely! Your social connections are in your hands. With the chat feature, you have the freedom to chat with individuals who pique your interest."} />
        </div>
      </section>
      <section id="Contact" className='bg-[#121212]'>
        <Section5 setEmail={setEmail} setFullName={setFullName} setMobileNo={setMobileNo} setSubject={setSubject}
          setText={setText}
          sendMail={sendMail}
          email={email}
          FullName={FullName}
          mobileNo={mobileNo}
          subject={subject}
          text={text}

        />
      </section>
      <section id="Connect" className='bg-black'>
        <Footer />
      </section>
    </div>
  )
}

export default App
