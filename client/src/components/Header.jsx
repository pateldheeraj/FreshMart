import React from 'react'
import logo from "../assets/logo.png"
import { Search } from './Search'
import { Link } from 'react-router-dom'

export const Header = () => {
  return (
    <header className='sticky top-0 h-20 shadow-md'>
        
        <div className='container flex items-center justify-between mx-auto min-h-full p-2'>
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

                    <div>
                        <Search/>
                    </div>

              {/**Login and Mycart */}      

                    <div>
                          <div>
                            <button>Login</button>
                            <button>Mycart</button>
                          </div>
                    </div>
        </div>

    </header>
  )
}