import React from 'react'
import UniGraph from './UniGraph';
import UniRanking from './UniRanking';
import UniSlider from './UniSlider';
import JudgingCriteria from './JudgingCriteria';
import Feedback from './Feedback';

const Inshome = () => {
  return (
    <div className='relative p-6 space-y-6'>
      <div className="pt-[5rem] md:pt-[7rem] gap-4 flex md:flex-row flex-col md:w-full">
        <div className="md:w-1/2 w-full">
        <h2 className='uppercase text-3xl md:text-4xl bg-white lg:text-5xl p-4 font-bold text-center'>Score board</h2>
          <UniGraph />
        </div>
        <div className="md:w-1/2 w-full">
        <h2 className='uppercase text-3xl md:text-4xl bg-white lg:text-5xl p-4 font-bold text-center'>Ranking</h2>
          <UniRanking />
        </div>
      </div>
      <h2 className='uppercase text-3xl md:text-4xl bg-white lg:text-5xl p-4 font-bold text-left'>Universities</h2>
      <UniSlider className="w-full"/>
      <div className='w-full'>
      <h2 className='uppercase text-3xl md:text-4xl bg-white lg:text-5xl p-4 font-bold text-left'>Judging criteria</h2>
      <JudgingCriteria />
      </div> 
      <div className='w-full'>
      <h2 className='uppercase text-3xl md:text-4xl bg-white lg:text-5xl p-4 font-bold text-left'>Feedback Form</h2>
      <Feedback />
      </div>
    </div>
  )
}

export default Inshome

