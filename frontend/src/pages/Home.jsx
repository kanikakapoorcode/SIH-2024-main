import React from 'react'
import { Button } from '../components/Button'
import { BottomWarning } from '../components/BottomWarning'
import { Link } from 'react-router-dom';


const Home = () => {
  return (
    <>
      <div className='bg-[#e8e9eb]  h-screen w-screen relative flex flex-col  items-center justify-center p-4'>
          <div className='bg-white rounded-xl flex flex-col  items-center justify-center px-20  py-8  shadow-md'>
              <div className='uppercase text-3xl text-[#525252] font-bold'>A.i. driven</div>
              <div className='uppercase text-5xl text-[#000000] font-bold'>University Inspection</div>
              <img className='p-4 ' src="/src/assets/uniIcon.jpg" alt="university image" />
              <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
              <Link to="/signin">
              <Button label="Sign in" />
              </Link>
              <BottomWarning label="Don't have an account?" />
              <Link to="/signup">
              <Button label="Sign up" />
              </Link>
              </div>             
          </div>
      </div>
    </>
  )
}
export default Home