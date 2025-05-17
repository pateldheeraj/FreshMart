import React from 'react'
import logo from "../assets/logo.png"

export const Header = () => {
  return (
    <header className='sticky top-0 h-20 shadow-md'>
        
        <div>
             {/**logo */}
                    <div>
                          <img  src={logo}
                                alt="logo"
                                width={170}
                                height={60}
                            />
                    </div>
        </div>

    </header>
  )
}
