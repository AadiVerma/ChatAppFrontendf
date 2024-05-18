import { useState } from "react";
import { MdOutlineArrowDropDown } from "react-icons/md";

export default function Section4({question , answer}) {
    const [flip, setFlip] = useState(false);

    return (
        <div className="border-2 border-purple-400 rounded-3xl p-5 mt-4 ">
            <div className="flex justify-between cursor-pointer" onClick={() => setFlip(!flip)}>
                <span className="text-purple-600 text-xl font-semibold">{question}</span>
                <MdOutlineArrowDropDown className={`text-4xl ${flip ? "rotate-0" : "-rotate-90"}`} />
            </div>
            <div className={`transition-all duration-500 font-normal text-start text-purple-200 text-lg ease-in-out ${flip ? "h-20 overflow-hidden" : "h-0 overflow-hidden"}`}>
               {answer}
               </div>
        </div>
    );
}
