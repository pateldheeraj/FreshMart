import banner from "../assets/banner.jpg"
import bannerMobile from "../assets/banner-mobile.jpg"
import {useSelector} from "react-redux"
import { urlFilter } from "../utils/urlFilter"
import { Link, useNavigate } from "react-router-dom"
import { CategoryWiseProductDisplay } from "../components/CategoryWiseProductDisplay"

const Home = () => {

  const loadingCategory = useSelector((state)=>state.product.loadingCategory) 
  const allCategory = useSelector((state)=>state.product.allCategory) 
  const allSubCategory = useSelector((state)=>state.product.allSubCategory)
  const navigate = useNavigate()

  const handleRedirectProductListpage = (id,cat)=>{
    const filterData = allSubCategory.find((subCat,i)=>{
      const isCategory = subCat.category.some(el=>el._id == id)
      return isCategory ? true : null
     
    })
    const url = `/${urlFilter(cat)}-${id}/${urlFilter(filterData.name)}-${filterData._id}`
    navigate(url)
  }

  return (
    <section className="bg-white">
      <div className="container mx-auto">

        <div className={`w-full h-full min-h-48 bg-blue-100 rounded ${!banner && "animate-pulse my-2"}`}>
            <img 
              src={banner} 
              alt="banner" 
              className="w-full h-full hidden lg:block"
            />
            <img 
              src={bannerMobile} 
              alt="banner" 
              className="w-full h-full lg:hidden"
            />
        </div>

        <div className="container mx-auto px-4 my-2 grid grid-cols-5 md:grid-cols-8 lg:grid-cols-10 gap-2">
          {
            loadingCategory ? (
              new Array(12).fill(null).map((c,index)=>{
                return(
                  <div key={index+"loadingcategory"} className="bg-white rounded p-4 min-h-36 grid gap-2 shadow animate-pulse">
                    <div  className="bg-blue-100 min-h-24 rounded"></div>
                    <div className="bg-blue-100 h-8 rounded"></div>
                  </div>
                )
              })
            ) : (
              allCategory.map((cat,index)=>{
                 return(
                  <div 
                    key={cat._id+"displayCategory"} 
                    className='w-full h-full'
                    onClick={()=>handleRedirectProductListpage(cat._id,cat.name)}
                  >
                    <div>
                        <img 
                          src={cat.image}
                          className='w-full h-full object-scale-down'
                        />
                    </div>
                  </div>
                )
              })
            )
          }
        </div>

        {/* display data by category */}

        {
          allCategory.map((cat,index)=>(
            <CategoryWiseProductDisplay
              key={index+"CategoryDisplay"}
              id = {cat._id}
              name = {cat.name}
            />
          ))
        }    

      </div>
    </section>
  )
}

export default Home