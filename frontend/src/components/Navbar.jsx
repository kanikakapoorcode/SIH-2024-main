import React, { useState ,useEffect} from 'react'
import {Link} from 'react-router-dom'
import { FaXmark,FaBlog,FaBars} from "react-icons/fa6";
import { LiaUniversitySolid } from "react-icons/lia";
const Navbar = () => {
    const [isMenuOpen,setIsMenuOpen] = useState(false);
    const [isSticky,setIsStickey] = useState(false);
 
    // toggle menu
    const toggleMenu = ()=>{
        setIsMenuOpen(!isMenuOpen);        
    }
    useEffect(()=>{
        const handleScroll = ()=>{
            if(window.scrollY>100){
                setIsStickey(true);
            }
            else {
                setIsStickey(false);
            }
        }

        window.addEventListener("scroll",handleScroll);
        return ()=>{
            window.addEventListener("scroll",handleScroll);
        }
    },[])

    // nav items agr banada loged in ne hai 
    // to ussai yea dhikega 
    const navItems1=[
        {link:"Home",path:"/"},
        {link:"SignIn",path:"/signin"},
        {link:"SignUp",path:"/signup"},        
    ]
    // agr banda inspector hai to ussai yea wla anav bar dhikeg 
    const navItems=[
        {link:"Home",path:"/inspector/insHome"},
        {link:"Inspect",path:"/inspector/inspect"},        
    ]

    //      yea wala university wala kai hoga isko dhek lena   
    // const navItems2=[
     //     {link:"Home",path:"/university/uniHome"},
    //     {link:"Insights",path:"/inshome"},
    //     {link:"Home",path:"/inshome"},        
    // ]

  return (
    <header className='w-full z-20 bg-transparent fixed top-0 left-0 transition-all ease-in duration-300'>
            <nav className={`p-4 lg:px-24 ${isSticky ? "sticky top-0 left-0 right-0 text-white bg-[#0f4b8a]  drop-shadow-xl":"text-black"}`}>
                <div className='flex justify-between items-center text-base'>
                    {/* logo */}
                    <Link to="/" className='text-2xl  flex font-bold uppercase items-center gap-2 '>
                        <LiaUniversitySolid className='inline-block w-12 h-12'/>U.I.W.A</Link>
                    {/* nav items for large devices */}
                    <ul className='md:flex space-x-12 hidden'> 
                        {
                            navItems.map(({link,path})=>
                                <Link key={path} to={path} className='block text-base p-2 rounded-md uppercase font-bold cursor-pointer hover:bg-[#00bbf1]'>{link}</Link>
                            )
                        }
                    </ul>
                    
                    {/* menu button for mobile devices */}

                    <div className='block md:hidden'>
                        <button onClick={toggleMenu} className='text-black focus:outline-none'>
                            { isMenuOpen ? 
                                <FaXmark className={`h-5 w-5 ${isSticky ?"text-white":"text-black"}`} /> : 
                                <FaBars className={`h-5 w-5 ${isSticky ?"text-white":"text-black"}`}  />
                            }
                        </button>
                    </div>                
                </div>
                {/* nav items for sm devices  */}
                <div className={`space-y-4 top-5 px-4 mt-12 py-7 bg-[#0f4b8a] ${isMenuOpen ? "block fixed top-0 right-0 left-0": "hidden" }`}>
                    {
                        navItems.map(({link,path})=>
                            <Link key={path} to={path} className='block text-base text-white uppercase cursor-pointer p-2 rounded-md hover:bg-[#00bbf1]'>{link}</Link>
                        )
                    }
                </div>
            </nav>
        </header>  
    );
  };
  export default Navbar; 