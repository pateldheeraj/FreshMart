import { useEffect, useState } from "react"
import {Link, useParams} from "react-router-dom"
import SummaryApi from "../common/SummaryApi"
import Axios from "../utils/Axios"
import AxiosToastError from "../utils/AxiosToastError"
import {Loading} from "../components/Loading"
import { CardProduct } from "../components/CardProduct"
import { useSelector } from "react-redux"
import { urlFilter } from "../utils/urlFilter"


export const ProductListPage = () =>{

  const [data,setData] = useState([])
  const [loading,setLoading] =useState(false)
  const [page,setPage] = useState(1)
  const [limit,setLimit] = useState(10)
  const params = useParams()
  const allSubCategory = useSelector(state => state.product.allSubCategory)
  const [displaySubCat,setDisplaySubCat] = useState([])

  const subCategoryName = params.subCategory?.split("-").slice(0, -1).join(" ");
  const categoryId = params.category?.split("-").splice(-1)[0]
  const subCategoryId = params.subCategory?.split("-").splice(-1)[0]

  const fetchProductByIds = async() => {
    try {
      setLoading(true)
      const response = await Axios({
        ...SummaryApi.getProductByCategoryAndSubCategoryId,
        data : {
          categoryId ,
          subCategoryId,
          limit,
          page
        }
      })
       const {data : responseData} = response
   
       if(responseData.success){
        if (responseData.page == 1) {
          setData(responseData.data.data)
        } else {
          setData([...(data || []), ...responseData.data.data])
        }
        setPage(responseData.data.dataCount)
       }
       
    } catch (error) {    
      AxiosToastError(error)
    } finally {
      setLoading(false)
    }
  }  

  useEffect(()=>{
    fetchProductByIds()
  },[params])

  useEffect(()=>{
    const sub = allSubCategory.filter((s)=>{
      const filerData = s.category.some(el=>
         el._id == categoryId
      )
      return filerData ? filerData : null
    })
   setDisplaySubCat(sub)
  },[params,allSubCategory])

  return (
    <section className="sticky top-24 lg:top-20">
      <div className="sticky top-24 lg:top-20 grid grid-cols-[100px_1fr] md:grid-cols-[200px_1fr] lg:grid-cols-[250px_1fr] container mx-auto">

        {/* SubcategoryPage */}
        <div className=" min-h-[85vh] max-h-[85vh] overflow-y-scroll  grid gap-1 shadow-md scrollbarCustom bg-white py-2">
            {
              displaySubCat.map((s,i)=>{
                const link = `/${urlFilter(s?.category[0]?.name)}-${s?.category[0]?._id}/${urlFilter(s.name)}-${s._id}`
                return(
                  <Link
                    to={link}
                     key={s.name+"displaySubCatProductListPgae"}
                     className={`w-full p-2 lg:flex items-center lg:w-full lg:h-16 box-border lg:gap-4 border-b hover:bg-green-100 cursor-pointer ${subCategoryId === s._id ? "bg-green-100" : ""}`} 
                  >
                    <div className="w-fit max-w-28 mx-auto lg:mx-0 bg-white rounded  box-border">
                      <img 
                        src={s.image}
                        alt={s.name} 
                        className=' w-14 lg:h-14 lg:w-12 h-full object-scale-down'
                      />
                    </div>
                    <p className='-mt-6 lg:mt-0 text-xs text-center lg:text-left lg:text-base'>{s.name}</p>
                  </Link>
                )
              })
            }
        </div>

        {/* ProductPage */}
        <div className="sticky top-20">
          <div className="bg-white shadow-md p-4 z-10">
            <h3 className="font-semibold">{subCategoryName}</h3>
          </div>

          <div className='min-h-[80vh] max-h-[80vh] overflow-y-auto relative'>
            <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-3 lg:grid-cols-4 ">
              {
                data.map((p,i)=>{
                  return(
                    <CardProduct 
                      data={p}
                      key={p.name+i+"CardProductinlistPage"}
                    />
                  )
                })
              }
            </div>
          </div>  
          <div>
            {
              loading && <Loading />
            }
          </div>
        </div>

      </div>
    </section>
  )
}
