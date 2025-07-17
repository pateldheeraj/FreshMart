import { useRef, useState } from "react"
import {useParams} from "react-router-dom"
import SummaryApi from "../common/SummaryApi"
import Axios from "../utils/Axios"
import AxiosToastError from "../utils/AxiosToastError"
import { useEffect } from "react"
import { FaArrowLeft,FaArrowRight } from "react-icons/fa";
import { priceConverter } from "../utils/priceConverterInRupees"
import { Divider } from "../components/Divider"
import image1 from "../assets/minute_delivery.png"
import image2 from "../assets/best_prices_offers.png"
import image3 from "../assets/Wide_Assortment.png"
import { priceWithDiscount } from "../utils/priceWithDiscount"

export const DisplayProductPage = () => {

  const [data,setData] = useState({
    name : "",
    image : []
  })
  const [image,setImage] = useState(0)
  const [loading,setLoading] = useState(false)
  const params = useParams()
  const productId = params.product.split("-").slice(-1)[0]
  const imageContainer = useRef()
 
  const fetchProduct = async() =>{
    try {
      setLoading(true)
      const response = await Axios({
        ...SummaryApi.getProductById,
        data :{
          productId
        }
      })
      const {data : responseData} = response
  
      if (responseData.success) {
        setData(responseData.data[0])
      }
      
    } catch (error) {
      console.log(error);
      AxiosToastError(error)
    }finally{
      setLoading(false)
    }
  }

  useEffect(()=>{
    fetchProduct()
  },[params])

  const handleScrollLeft = () =>{
    imageContainer.current.scrollLeft += 100
  }
  const handleScrollRight = () =>{
     imageContainer.current.scrollRight -= 100
  }

  return (
    <section className="container mx-auto p-4 grid lg:grid-cols-2">
        <div className="">
          <div className="bg-white lg:min-h-[65vh] lg:max-h-[65vh] rounded min-h-56 max-h-56 h-full w-full">
            <img 
              src={data.image[image]} 
              alt="ProductImage"
              className="w-full h-full object-scale-down"
             />
          </div>
          <div className="flex items-center justify-center gap-3 my-2">
              {
                data.image.map((i,index)=>{
                  console.log("imageIndex",image,index);
                  
                  return (
                    <div
                      key={index+"productActiveImages"}
                      className={`h-3 w-3 lg:w-5 lg:h-5 rounded-full ${index === image ? "bg-slate-300" : " bg-slate-200"
                      }`}
                    >                  
                    </div>
                  )
                })
              }
          </div>
          <div className="grid relative">
            <div ref={imageContainer} className="flex gap-4 relative z-10 w-full overflow-x-auto scrollbar-none ">
              {
                data.image.map((i,index)=>{                
                  return (
                    <div
                      key={index+"productImages"}
                      className="h-20 w-20 min-h-20 min-w-20 cursor-pointer shadow-md"
                    >      
                      <img 
                        src={i} 
                        alt="images" 
                        className="w-full h-full object-scale-down"
                        onClick={()=>setImage(index)}
                       />            
                    </div>
                  )
                })
              }
            </div>
            <div className=" absolute hidden -ml-3 w-full h-full lg:flex justify-between items-center">
              <button onClick={handleScrollLeft} className="z-10 relative rounded-full p-1 bg-white shadow-lg">
                <FaArrowLeft/>
              </button>
              <button onClick={handleScrollRight} className="z-10 relative rounded-full p-1 bg-white shadow-lg">
                <FaArrowRight/>
              </button>
            </div>
          </div>
          <div>
          </div>
          <div className='my-4  hidden lg:grid gap-3 '>
                <div>
                    <p className='font-semibold'>Description</p>
                    <p className='text-base'>{data.description}</p>
                </div>
                <div>
                    <p className='font-semibold'>Unit</p>
                    <p className='text-base'>{data.unit}</p>
                </div>
                {
                  data?.more_details && Object.keys(data?.more_details).map((element,index)=>{
                    return(
                      <div>
                          <p className='font-semibold'>{element}</p>
                          <p className='text-base'>{data?.more_details[element]}</p>
                      </div>
                    )
                  })
                }
          </div>
        </div>
       
        <div className="p-4 lg:pl-7 text-base lg:text-lg">
          <p className="bg-green-300 w-fit px-2 rounded-full">10 MIN</p>
          <h2 className="text-lg font-semibold lg:text-3xl">{data.name}</h2>
          <p>{data.unit}</p>
          <Divider/>
          <div>
            <p>Price</p>
            <div className="flex gap-2 lg:gap-4 items-center">
              <div className="border border-green-600 rounded px-4 py-2 bg-green-50 w-fit">
               <p className="font-semibold text-lg lg:text-xl">{priceConverter(priceWithDiscount(data.price,data.discount))}</p>
              </div>
                {
                  Boolean(data.discount) && (
                    <p className="line-through">{priceConverter(data.price)}</p>
                  )
                }
                {
                  Boolean(data.discount) && (
                    <p className="font-semibold text-green-600 lg:text-2xl ">{data.discount}% <span className="text-base text-neutral-500">Discount</span></p>
                  )
                }
            </div>
          </div>

          {
            data.stock == 0 ? (
              <p className="font-semibold text-red-500 my-2">Out Of Stock</p>
            ) : (
              <button className="my-4 px-4 py-1 bg-green-600 hover:bg-green-700 rounded text-white">Add</button>
            )
          }    
           
          <h2 className="font-semibold">Why shop from FreshMart?</h2>   
          <div>
            <div className="flex items-center gap-4 my-4" >
              <img src={image1} alt="superfast Delivery" className="w-20 h-20" />
              <div className="text-sm">
                <div className="font-semibold">SuperFast Delivery</div>
                <p>Get product at earliest at the possible to your doorsteps and without any problem at the lowest price and no delivery fees</p>
              </div>
            </div>
            <div className="flex items-center gap-4 my-4" >
              <img src={image2} alt="superfast Delivery" className="w-20 h-20" />
              <div className="text-sm">
                <div className="font-semibold">Best Prices & Offers</div>
                <p>In FreshMart you will get best price and offers comapre to any other platforms and our rivials</p>
              </div>
            </div>
            <div className="flex items-center gap-4 my-4" >
              <img src={image3} alt="superfast Delivery" className="w-20 h-20" />
              <div className="text-sm">
                <div className="font-semibold">Wide Assortments</div>
                <p>Get products from 5000+ Product dealers across the city</p>
              </div>
            </div>
          </div>

        </div>
              
    </section>
  )
}
