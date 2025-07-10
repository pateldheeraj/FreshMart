import { useState } from "react"
import { FaCloudUploadAlt } from "react-icons/fa"
import { IoClose } from "react-icons/io5"
import { useSelector } from "react-redux"
import { Loading } from "./Loading"
import { MdDelete } from "react-icons/md";
import { uploadImage } from "../utils/uploadImage";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError"
import toast from "react-hot-toast"
import { ViewImage } from "./ViewImage"
import { AddFieldComponent } from "./AddFieldComponent"

export const EditProduct = ({close,data:productData,fetchProductData}) => {

    const [loading,setLoading] = useState(false)

    const [viewImageURL,setViewImageURL] = useState("")

    const [selectedCategory,setSelectedCategory] = useState("")

    const [selectedSubCategory,setSelectedSubCategory] = useState("")

    const [fieldName ,setFieldName] = useState("")

    const [openAddFields,setOpenMoreFields] = useState(false)

    const allCategory = useSelector(state=>state.product.allCategory)

    const allSubCategory = useSelector(state=>state.product.allSubCategory)
    console.log(productData);
    
    const [data,setData] = useState({
        name : productData.name,
        image : productData.image,
        category : productData.category,
        subCategory : productData.subCategory,
        unit : productData.unit,
        stock : productData.stock,
        price : productData.price,
        discount : productData.discount,
        description : productData.description,
        more_details : productData.more_details || {},
      })
    const handleDeleteImage = (index) => {
        data.image.splice(index,1)
        setData((
        prev
        )=>{
        return{
            ...prev
        }
        })
  }

  const handleOnChange = (e) => {
    const {name,value} = e.target 
    setData((prev)=>{
      return{
        ...prev,
        [name] : value
      }
    })
  }

  const handleUploadImage = async(e) =>{
    const file = e.target.files[0]
    if (!file) {
      return
    }

    setLoading(true)

    const uploadedImage =  await uploadImage(file)

    const {data : imageResponse } = uploadedImage

    setData((prev)=> {
        return{
            ...prev,
            image : [...prev.image,imageResponse.data.url]
        }
    }) 

    setLoading(false)

  }

  const handleRemoveCategory = (index) =>{
    data.category.splice(index,1)
      setData((
        prev
      )=>{
        return{
          ...prev
        }
      })
  }

  const handleRemoveSubCategory = (index) =>{
    data.subCategory.splice(index,1)
      setData((
        prev
      )=>{
        return{
          ...prev
        }
      })
  }

  const handleAddField = () =>{
    setData((prev)=>{
      return{
        ...prev,
        more_details : {
          ...prev.more_details,
          [fieldName] : ""
        }
      }
    })
    setFieldName("")
    setOpenMoreFields("")
  }

  const handleSubmit = async(e) =>{
    e.preventDefault()
    try {
        console.log(productData._id);
        
      const response = await Axios({
        ...SummaryApi.editProduct,
        data : {
            productId : productData._id,
            dataPro : data
        }
      })
        
      const {data : responseData} = response

      if(responseData.data){
        toast.success(responseData.message)
        fetchProductData()
        close()
      }
      
    } catch (error) {
      AxiosToastError(error)
    }
    
  }  
  return (
    <section className="fixed top-0 bottom-0 left-0 right-0 p-4 bg-neutral-800/60 flex items-center justify-center overflow-y-auto">
        <div className="max-w-4xl p-4 rounded w-full bg-white mt-auto ">
            <div className="flex items-center justify-between">
                <h1 className='font-semibold'>Update Product</h1>
                <button onClick={close} className='w-fit block ml-auto'>
                    <IoClose size={25}/>
                </button>
            </div>
            <div className="grid">
                <form className="grid gap-4" onSubmit={handleSubmit}>
                    <div className="grid gap-1">
                    <label htmlFor="name" className='font-medium' >Name</label>
                    <input 
                        id="name"
                        type="text" 
                        placeholder="Enter Product Name"
                        onChange={handleOnChange}
                        name="name"
                        value={data.name}
                        required
                        className="bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded "
                    />
                    </div>
                    <div className="grid gap-1">
                    <label className='font-medium' htmlFor="description">Description</label>
                    <textarea 
                        id="description"
                        type="text" 
                        placeholder="Enter Product Description"
                        onChange={handleOnChange}
                        name="description"
                        value={data.description}
                        required
                        multiple
                        rows={3}
                        className="bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded resize-none"
                    />
                    </div>
                    <div>
                    <p className='font-medium'>Image</p>
                    <div>
                        <label id="productImage" className="bg-blue-50 h-24 border rounded flex justify-center items-center cursor-pointer">
                        <div className="flex items-center text-center justify-center flex-col">
                            {
                            loading ? (
                                <Loading/>
                            ) :  (
                                <>
                                <FaCloudUploadAlt size={35}/>
                                <p>Upload Image</p>
                                </>
                            )
                            }
                            
                        </div>
                        <input 
                            type="file"
                            id="productImage"
                            className="hidden"
                            accept="image/*"
                            onChange={handleUploadImage}
                        />
                        </label>
                        <div className="flex flex-wrap gap-4">
                        {
                            data.image.map((img,index)=>{
                            return(
                                <div key={img+index} className="h-20 mt-1 w-20 min-w-20 bg-blue-50 border relative group ">
                                <img src={img} alt={img} className="w-full h-full cursor-pointer object-scale-down"
                                onClick={()=>setViewImageURL(img)}
                                />
                                <div onClick={()=>handleDeleteImage(index)} className="absolute bottom-0 right-0 p-1 bg-red-600 hover:bg-red-700 rounded text-white cursor-pointer hidden group-hover:block">
                                    <MdDelete/>
                                </div>
                                </div>
                            )
                            })
                        }
                        </div>
                    </div>
                    </div>
                    <div className="grid gap-1">
                    <div>
                        <label className='font-medium'>Category</label>
                        <select 
                        className="bg-blue-50 p-2 border rounded w-full" 
                        value={selectedCategory}
                        onChange={(e)=>{
                            const value = e.target.value
                            const category = allCategory.find(el=>el._id === value)
                            setData((prev)=>{
                            return{
                                ...prev ,
                                category : [...prev.    category,category]
                            }
                            })
                            setSelectedCategory("")
                        }}  
                        >
                        <option value="">Select Category</option>
                        {
                            allCategory.map((c,index)=>{
                            return(
                                    <option key={c._id+index+'selectcategory'} value={c?._id}>{c.name}</option>
                                    )
                            })
                        }
                        </select>
                        <div className="flex flex-wrap gap-3">
                        {
                            data.category.map((c,index)=>{
                            return(
                                <div 
                                key={c._id+index+"productsection"}
                                className='text-sm flex items-center gap-1 bg-blue-50 mt-2'
                                >
                                <p>{c.name}</p>
                                <div        className='hover:text-red-500 cursor-pointer'
                                    onClick={()=>handleRemoveCategory(index)}>
                                    <IoClose size={20}/>
                                </div>
                                </div>
                            )
                            })
                        }
                        </div>
                    </div>
                    </div>
                    <div className="grid gap-1">
                    <div>
                        <label className='font-medium'>SubCategory</label>
                        <select 
                        className="bg-blue-50 p-2 border rounded w-full" 
                        value={selectedSubCategory}
                        onChange={(e)=>{
                            const value = e.target.value
                            const subCategory = allSubCategory.find(el=>el._id === value)
                            setData((prev)=>{
                            return{
                                ...prev ,
                                subCategory : [...prev.    subCategory,subCategory]
                            }
                            })
                            setSelectedSubCategory("")
                        }}  
                        >
                        <option value="">Select SubCategory</option>
                        {
                            allSubCategory.map((c,index)=>{
                            return(
                                    <option key={c._id+index+"selectSubCategory"} value={c?._id}>{c.name}</option>
                                    )
                            })
                        }
                        </select>
                        <div className="flex flex-wrap gap-3">
                        {
                            data.subCategory.map((c,index)=>{
                            return(
                                <div 
                                key={c._id+index+"productsection"}
                                className='text-sm flex items-center gap-1 bg-blue-50 mt-2'
                                >
                                <p>{c.name}</p>
                                <div        className='hover:text-red-500 cursor-pointer'
                                    onClick={()=>handleRemoveSubCategory(index)}>
                                    <IoClose size={20}/>
                                </div>
                                </div>
                            )
                            })
                        }
                        </div>
                    </div>
                    </div>
                    <div className="grid gap-1">
                    <label className='font-medium' htmlFor="unit">Unit</label>
                    <input 
                        id="unit"
                        type="text" 
                        placeholder="Enter Product unit"
                        onChange={handleOnChange}
                        name="unit"
                        value={data.unit}
                        required
                        className="bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded "
                    />
                    </div>
                    <div className="grid gap-1">
                    <label className='font-medium' htmlFor="stock">Number of Stock</label>
                    <input 
                        id="stock"
                        type="text" 
                        placeholder="Enter Product stock"
                        onChange={handleOnChange}
                        name="stock"
                        value={data.stock}
                        required
                        className="bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded "
                    />
                    </div>
                    <div className="grid gap-1">
                    <label className='font-medium' htmlFor="price">Price</label>
                    <input 
                        id="price"
                        type="number" 
                        placeholder="Enter Product price"
                        onChange={handleOnChange}
                        name="price"
                        value={data.price}
                        required
                        className="bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded "
                    />
                    </div>
                    <div className="grid gap-1">
                    <label className='font-medium' htmlFor="discount">Discount</label>
                    <input 
                        id="discount"
                        type="number" 
                        placeholder="Enter Product discount"
                        onChange={handleOnChange}
                        name="discount"
                        value={data.discount}
                        required
                        className="bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded "
                    />
                    </div>
                    {/* add more fields */}
        
                    {
                    Object?.keys(data?.more_details)?.map((k,index)=>{
                        return(
                            <div key={index+k+"addmorefields"} className='grid gap-1'>
                            <label htmlFor={k} className='font-medium'>{k}</label>
                            <input 
                                id={k}
                                type='text'
                                value={data?.more_details[k]}
                                onChange={(e)=>{
                                    const value = e.target.value 
                                    setData((preve)=>{
                                    return{
                                        ...preve,
                                        more_details : {
                                            ...preve.more_details,
                                            [k] : value
                                        }
                                    }
                                    })
                                }}
                                required
                                className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded'
                            />
                            </div>
                        )
                    })
                    }
        
        
                    <div 
                    onClick={()=>setOpenMoreFields(true)}
                    className=" hover:bg-primary-200 bg-white py-1 px-3 w-32 text-center font-semibold border border-primary-200 hover:text-neutral-900 cursor-pointer rounded"
                    >
                    Add Fields
                    </div>
                    <button className="bg-primary-100 rounded w-full p-2 hover:bg-primary-200 font-semibold">
                    Submit
                    </button>
                </form>
            </div>
        </div>
        {
            viewImageURL && <ViewImage url={viewImageURL} close={()=>setViewImageURL("")}/>
        }
    
        {
            openAddFields && (
                <AddFieldComponent 
                close={()=>setOpenMoreFields(false)}
                value={fieldName}
                onChange={(e)=>setFieldName(e.target.value)}
                submit={handleAddField}
                />
            )
        }
    </section>
  )
}
