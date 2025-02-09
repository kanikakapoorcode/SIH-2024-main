import React from 'react'
import Insights from './Insights'
import { FaLocationDot } from "react-icons/fa6";
import { FaListUl } from "react-icons/fa";
import BuildingAge from "./BuildingAge" ;
import LabFacalaties from "./LabFacalaties" ;
import Infrastructure from "./Infrastructure" ;

const unidata = [
  {uniname:"graphic era hill university", location:"dehradun,uttarakhand",image: "/src/assets/react.svg",desc:"kwbjlbkjbhlbhfbjlklbfjblrg r bv bhb he hs bhs fd hs s g sfd fd fd zf z d  v v v f hb z vf zv zvmd z "}
]
const Inspect = () => {
  const generateReport = () => {
    
  };
  return (
  <div className='relative p-6 space-y-6 w-full'>
    <div className="pt-[5rem] gap-4  ">
      <div className='p-6 bg-white drop-shadow-md rounded-md flex gap-4 items-center justify-start'>
        <img src={unidata[0].image} alt={unidata[0].uniname} className='w-[240px] h-[240px] rounded-md' />
        <div>
          <h1 className='text-black font-bold text-4xl md:text-5xl uppercase lg:text-6xl'>{unidata[0].uniname}</h1>  
          <p className='text-black font-bold text-2xl md:text-3xl capitalize p-2 gap-4 items-center justify-start flex lg:text-4xl'>
            <FaLocationDot className='p-1' />  
            <p>{unidata[0].location}</p> 
          </p>  
          <p className='text-black font-bold text-2xl md:text-3xl capitalize p-2 gap-4 items-center justify-start flex lg:text-4xl'>
            <FaListUl className=' p-1' />
            <p className='text-2xl'>{unidata[0].desc}</p> 
          </p>  
        </div>
      </div>
      <div >
        <h2 className='uppercase text-3xl md:text-4xl bg-white lg:text-5xl p-4 font-bold text-left'>Overview</h2>
        <Insights />
      </div>
      <div >
        <h2 className='uppercase text-3xl md:text-4xl bg-white lg:text-5xl p-4 font-bold text-left'>Insights</h2>
        <div className='flex flex-col items-start justify-start space-y-4 p-4'>
          <LabFacalaties />
          <BuildingAge />
          <Infrastructure />
          <button
            type="button"
            onClick={generateReport}
            className="inline-flex items-center py-3.5 px-4 text-base font-bold text-center text-black bg-gray-200 rounded-lg focus:ring-4 focus:ring-gray-400 hover:bg-gray-300"
          >
            Generate Report
          </button>
        </div>
      </div>
      </div>
    </div>
  )
}

export default Inspect