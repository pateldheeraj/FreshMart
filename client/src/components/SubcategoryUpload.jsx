import { useState } from "react"
import { RxCross1 } from "react-icons/rx"
import { uploadImage } from "../utils/uploadImage"
import { useSelector } from "react-redux"
import Axios from "../utils/Axios"
import SummaryApi from "../common/SummaryApi"
import axios from "axios"
import AxiosToastError from "../utils/AxiosToastError"

export const SubcategoryUpload = ({close}) => {

    const allCategory = useSelector((state)=>state.product.allCategory)
    
    const [data,setData] = useState({
        name : "",
        image : "",
        category : []
    })

    const handleChange = (e)=>{
        const { name, value} = e.target 

        setData((preve)=>{
            return{
                ...preve,
                [name] : value
            }
        })
    }

    const handleUploadSubCategoryImage = async(e) => {
        const file = e.target.files[0]
        if(!file){
            return
        }

        const uploadedImage =  await uploadImage(file)

        const {data : imageResponse } = uploadedImage
        console.log(imageResponse);
        

        
        setData((prev)=> {
            return{
                ...prev,
                image : imageResponse.data.url
            }
        })
    }

    const handleSelectedCategoryRemove = (categoryId)=>{
        const index = data.category.findIndex(el => el._id === categoryId )
        data.category.splice(index,1)
        setData((preve)=>{
            return{
                ...preve
            }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await Axios({
                ...SummaryApi.addSubCategory,
                data : data
            })
            const {data : responseData} = response

            if(responseData.success){
                axios.success(responseData.message)
            }
            if(close){
                    close()
             }
        } catch (error) {
            AxiosToastError(error)
        }
    }

  return (
    <section className="fixed top-0 bottom-0 left-0 right-0 bg-neutral-800/60 flex items-center justify-center p-4">
        <div className="bg-white p-4 w-full rounded max-w-5xl ">
            <div className="flex items-center justify-between gap-3">
                <h1 className="font-semibold">SubCategory</h1>
                <button onClick={close} className='w-fit block ml-auto'>
                <RxCross1 size={15}
                /></button>
            </div>
            <form className='my-3 grid gap-3' onSubmit={handleSubmit}>

                <div className='grid gap-1'>
                    <label htmlFor="uplaodCategoryName">Name</label>
                    <input 
                        type="text"
                        name='name'
                        id='uplaodCategoryName'
                        value={data.name}
                        onChange={handleChange}
                        placeholder='Enter product name'
                        className='p-3 bg-blue-50 border outline-none focus-within:border-primary-200 rounded'
                    />
                </div>

                <div className="grid gap-1">
                    <p>Image</p>
                    <div className="flex flex-col lg:flex-row items-center gap-3">
                        <div className="border h-36 w-full lg:w-36 bg-blue-50 flex items-center justify-center">
                        {
                            data.image ? (
                                <img
                                    alt='subCategory'
                                    src={data.image}
                                    className='w-full h-full object-scale-down'
                                 />
                            ) : (
                               <p className='text-sm text-neutral-400'>No Image</p>
                            )
                        }
                        </div>
                        <label htmlFor="uploadImageInput">
                            <div className='px-4 py-1 border border-primary-100 text-primary-200 rounded hover:bg-primary-200 hover:text-neutral-900 cursor-pointer  '>
                                Upload Image
                            </div>
                            <input
                             type="file"
                             className="hidden"
                             id="uploadImageInput"
                             onChange={handleUploadSubCategoryImage}
                             />
                        </label>
                    </div>
                </div>

                <div className="grid gap-1">
                    <label >
                        Select Category
                    </label>
                    <div className="border focus-within:border-primary-200 rounded">
                        {/*display value**/}
                        <div className="flex flex-wrap gap-2">
                            {
                                data.category.map((category,index)=> {
                                    return (
                                        <p key={category._id+"selectedValue"} className='bg-white shadow-md px-1 m-1 flex items-center gap-2'>
                                            {category.name}
                                            <p className="cursor-pointer hover:text-red-500" onClick={()=>handleSelectedCategoryRemove(category._id)}>
                                                <RxCross1 size={20}/> 
                                            </p>
                                        </p>
                                    )
                                })
                            }
                        </div>
                        {/* displaycategoryoptions */}
                            <select 
                                className="w-full p-2 bg-transparent outline-none border"
                                onChange={(e)=>{
                                    const value = e.target.value
                                    const categoryDetails = allCategory.find((el)=>el._id == value)
                                    setData((prev)=>{
                                        return{
                                            ...prev,
                                            category : [...prev.category , categoryDetails]
                                        }
                                    })
                                }}  
                            >
                                <option value={""} disabled>Select Category</option>
                                {
                                    allCategory.map((category,index)=>{
                                        return(
                                            <option value={category?._id} key={category._id+"subcategory"}>{category?.name}</option>
                                        )
                                    })
                                }
                            </select>
                    </div>
                </div>

                <button
                    className={`px-4 py-2 border
                            ${data?.name && data?.image && data?.category[0] ? "bg-primary-200 hover:bg-primary-100" : "bg-gray-200"}    
                            font-semibold
                    `}
                >
                    Submit
                </button>

            </form>
        </div>
    </section>
  )
}
