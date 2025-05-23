import { BsCart4 } from "react-icons/bs";
import logo from "../assets/logo.png"
import { Search } from './Search'
import { Link, useLocation ,useNavigate} from 'react-router-dom'
import { FaRegUserCircle } from "react-icons/fa";
import useMobile from '../hooks/useMobile'
import {useSelector} from 'react-redux'
import { GoTriangleDown , GoTriangleUp} from "react-icons/go";
import { useState } from "react";
import { UserMenu } from "./UserMenu";

export const Header = () => {

    const [isMobile] = useMobile()
    const location = useLocation()
    const isSearchPage = location.pathname === '/search' 
    const navigate = useNavigate()
    const user = useSelector((state) => state?.user)
    const [openUserMenu,setOpenUserMenu] = useState(false)
    
    const redirectToLoginPage = () => {
      navigate('/login')
    }

    const handleCloseMenu = () =>{
      setOpenUserMenu(false)
    }

    const handleMobileLogin = () =>{
      if(!user._id){
        navigate('/login')
        return
      }
      navigate('/user')
    }

  return (
    <header className=' bg-white sticky top-0 h-24 lg:h-20 shadow-md flex flex-col justify-center gap-1'>
        {!(isSearchPage && isMobile) && 
        (
        <div className='container flex items-center justify-between mx-auto  px-2'>
             {/**logo */}
                    <div className='h-full'>
                        <Link to={"/"} className='h-full justify-center items-center flex'>
                           <img  src={logo}
                                alt="logo"
                                width={170}
                                height={60}
                                className='hidden lg:block'
                            />
                            <img  src={logo}
                                alt="logo"
                                width={170}
                                height={60}
                                className='lg:hidden'
                            />
                        </Link>
                    </div>
              {/**Search Bar */}

                    <div className='hidden lg:block'>
                        <Search/>
                    </div>
                 

              {/**Login and Mycart */}      

                    <div>
                        {/* user icon display on mobile version */}
                        <button className='text-[30px] text-neutral-600 lg:hidden'>
                          <FaRegUserCircle onClick={handleMobileLogin}/>
                        </button>

                        {/* login and my cart will display on desktop verison */}
                        <div className='hidden lg:flex items-center gap-10'>
                          {
                            user?._id ? (
                              <div className="relative">
                                <div onClick={()=>{
                                  setOpenUserMenu(prev => !prev)
                                }} className="flex items-center gap-2 cursor-pointer select-none">
                                  <p>Account</p>
                                  {
                                    openUserMenu ? (
                                      <GoTriangleUp size={25}/>
                                    ) : (
                                      <GoTriangleDown size={25}/>
                                    )
                                  }
                                  
                                </div>
                                {
                                  openUserMenu && (
                                    <div className="absolute right-0 top-12">
                                      <div className="bg-white rounded p-4 lg:shadow-lg min-w-52">
                                        <UserMenu close={handleCloseMenu}/>
                                       </div>
                                    </div>
                                  )
                                }

                              </div>
                            ) : (
                              <button  onClick={redirectToLoginPage} >Login</button>
                            )
                          }
                          
                          <button className="flex items-center gap-2 bg-green-800 hover:bg-green-700 px-3 py-3 rounded text-white">
                            <div className=" animate-bounce">
                               <BsCart4 size={25}/>
                            </div>
                            <div className=" font-semibold">
                              <p>My cart</p>
                            </div>
                          </button>
                        </div>
                    </div>
        </div>
        )
        }
        
        <div className='px-2 mx-auto container lg:hidden'>
               <Search/>
        </div>

    </header>
  )
}