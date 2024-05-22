import { useNavigate } from 'react-router-dom';
export default function Section1({ image, text, location ,heading ,headingtext,notify}) {
  const navigate=useNavigate();
  const handesubmit=()=>{
    if(location=="/"){
      notify();
    }
   navigate(location);
  }
  return (
    <div className="relative group cursor-pointer z-10 lg:w-[45%] w-[70%]">
      <img
        src={image}
        className="cursor-pointer mt-10 rounded-3xl hover:shadow-xl transition-opacity duration-300 ease-in-out group-hover:opacity-50 hover:shadow-purple-900 border-8 border-dark-purple"
        alt="Section 1"
      />
      <div className='absolute bottom-1/3 h-20 w-[100%] group-hover:opacity-0 bg-purple-500 opacity-90'>
        <p className='text-center justify-center p-6 font-extrabold'>{heading}</p>
      </div>
      <div
        className={"absolute bottom-0  w-[100%] bg-purple-800 h-[90%] md:h-[50%] pt-5 rounded-3xl  text-center transition-all duration-500 z-50 opacity-0 ease-in-out group-hover:opacity-85"}
      >
      <h1 className='text-3xl font-black '>{headingtext}</h1>
        <p className="md:text-xl font-extrabold p-4">{text}</p>
          <button onClick={handesubmit} className="bg-purple-950 p-2 hover:bg-[#39184e] font-extrabold h-16 w-52 rounded-lg cursor-pointer z-50">Click Here</button>
      </div>
    </div>
  );
}
