import React from 'react'
import { Link } from 'react-router-dom'
import { GoTrophy } from "react-icons/go";


const UniRanking = () => {
    const top3=[
        {uniname:"UNI 1",image:"/src/assets/react.svg",pos:"1"},        
        {uniname:"UNI 2",image:"/src/assets/react.svg",pos:"2"},        
        {uniname:"UNI 3",image:"/src/assets/react.svg",pos:"3"},
    ]
  return (
    <div className='drop-shadow-md rounded-md p-4 flex flex-col bg-[#00bbf1] items-center justify-center text-2xl'>
        <div className='flex items-center'>
            <GoTrophy className="md:h-36 md:w-36 h-12 w-12 text-gray-200" />
            <h2 className='text-white uppercase text-3xl md:text-4xl lg:text-5xl font-bold'>our top 3 !!</h2>
        </div>
       {
        top3.map(({ uniname, image, pos }) => (
            <div className="text-white flex gap-4 items-center p-2" key={uniname}>
                <div className='flex gap-2  items-end'>
                    <p className="text-2xl md:text-5xl font-semibold">{pos}</p> <span className='text-xl md:text-2xl font-bold'>.</span>
                    <p className="text-xl md:text-3xl">{uniname}</p>
                </div>
                <img src={image} className="md:h-[7rem] md:w-[7rem] bg-white rounded-full  h-12 w-12" alt={uniname} />
            </div>
        ))
       }
        
    </div>
  )
}

export default UniRanking