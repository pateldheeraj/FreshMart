import { useEffect, useRef, useState } from "react"
import AxiosToastError from "../utils/AxiosToastError"
import { Link } from 'react-router-dom'
import Axios from "../utils/Axios"
import SummaryApi from "../common/SummaryApi"
import { CardLoading } from "./CardLoading"
import { CardProduct } from "./CardProduct"
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

export const CategoryWiseProductDisplay = ({name,id}) => {

    const [data,setData] = useState([])
    const [loading,setLoading] = useState(false)

   const fetchProductByCategoryId = async() =>{
    try { 
        setLoading(true)
        const response = await Axios({
            ...SummaryApi.getProductByCategory,
            data : {
                id 
            }
        })
        const {data : responseData} = response
       if(responseData.success){
        setData(responseData.data)
       }
        
    } catch (error) {
        AxiosToastError(error)
    } finally{
        setLoading(false)
    }
   }

    useEffect(() => {
        fetchProductByCategoryId()
    },[])

    const cardCountNumber = new Array(9).fill(null)
    const containerRef = useRef()

    const handleLeftScroll = () =>{
        containerRef.current.scrollLeft += 200
    }
    const handleRightScroll = () =>{
        containerRef.current.scrollLeft -= 200
    }

  return (
    <div>
        <div className="flex justify-between items-center container mx-auto p-4 gap-4">        
            <h3 className="font-semibold text-lg md:text-xl">{name}</h3>
            <Link to="" className="text-green-600 hover:text-green-400">See All</Link>
        </div>
         <div className='relative flex items-center '>
            <div className="container mx-auto flex items-center gap-4 md:gap-6 lg:gap-8 px-4 overflow-hidden" ref={containerRef}>
            {   
                loading &&
                cardCountNumber.map((_,index)=>{
                    return <CardLoading key={index+"CardSkeleton"}/>
                })
            }

            {
                data.map((p,index)=>{
                    return <CardProduct data={p} key={index+"CardProductdisplay"}/>
                })
            }

            </div>

            <div className='w-full left-0 right-0 container mx-auto  px-2  absolute hidden lg:flex justify-between'>
                    <button onClick={handleLeftScroll} className='z-10 relative bg-white hover:bg-gray-100 shadow-lg text-lg p-2 rounded-full'>
                        <FaAngleLeft />
                    </button>
                    <button onClick={handleRightScroll} className='z-10 relative  bg-white hover:bg-gray-100 shadow-lg p-2 text-lg rounded-full'>
                        <FaAngleRight />
                    </button>
            </div>
         </div>
    </div>
  )
}
