import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { TypeAnimation } from 'react-type-animation';
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import useMobile from '../hooks/useMobile'
export const Search = () => {

    const navigate = useNavigate()
    const location = useLocation()
    const [isMobile] = useMobile()

    const [isSearchPage , setIsSearchPage] = useState(false)
    useEffect(()=>{
        const isSearch = location.pathname === "/search"
        setIsSearchPage(isSearch)
    },[location]) 

    //  const isSearchPage = location.pathname === "/search"
    const redirectToSearchPage = () => {
      navigate("/search")
    }

  return (
    <div  className=' w-full min-w-[300px] lg:min-w-[420px] h-11 lg:h-12 rounded-lg border overflow-hidden flex items-center text-neutral-500 bg-slate-50 group focus-within:border-primary-200'>
  
            <div>
                  {(isMobile && isSearchPage) ? (
                      <Link to={"/"} className='flex justify-center items-center h-full group-focus-within:text-primary-200 m-1 p-2 bg-white rounded-full shadow-md'>
                        <FaArrowLeft size={20}/>
                      </Link>
                  ) : (
                        <button className='flex justify-center items-center p-3 h-full group-focus-within:text-primary-200'>
                          <FaSearch size={22}/>
                        </button>
                  )}
            </div>

              <div className="w-full h-full items-center flex">
                    {
                    !isSearchPage ? ( 
                                      //when i was not in search page
                                        <div onClick={redirectToSearchPage}>
                                   <TypeAnimation
                                  sequence={[
                                    // Same substring at the start will only be typed out once, initially
                                    'Search "Milk"',
                                    1000, // wait 1s before replacing "Mice" with "Hamsters"
                                    'Search "Panner"',
                                    1000,
                                    'Search "Bread"',
                                    1000,
                                    'Search "Sugar"',
                                    1000,
                                    'Search "Mango"',
                                    1000,
                                    'Search "Oil"',
                                    1000,
                                    'Search "Pepsi"',
                                    1000,
                                  ]}
                                  wrapper="span"
                                  speed={50}
                                  repeat={Infinity}
                              />
                                        </div>
                                    ) : 
                                    (
                                      //when i was in search page
                                      <input 
                                          type="text"
                                          placeholder="Search for atta dal and more."
                                          autoFocus
                                          className="bg-transparent w-full h-full outline-none "
                                      />
                                    )
                    }
              </div>

            
    </div>
  )
}
