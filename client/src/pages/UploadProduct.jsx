import { useState } from "react"
import { FaCloudUploadAlt } from "react-icons/fa";
import { uploadImage } from "../utils/uploadImage";
import {Loading} from '../components/Loading'
import {ViewImage} from '../components/ViewImage'
import { MdDelete } from "react-icons/md";
import {useSelector} from 'react-redux'
import { IoClose } from "react-icons/io5";
import { AddFieldComponent } from "../components/AddFieldComponent";


export const UploadProduct = () => {
  
  const [data,setData] = useState({
    name : "",
    image : [],
    category : [],
    subCategory : [],
    unit : "",
    stock : "",
    price : "",
    discount : "",
    description : "",
    more_details : {},
  })

  const [loading,setLoading] = useState(false)

  const [viewImageURL,setViewImageURL] = useState("")

  const [selectedCategory,setSelectedCategory] = useState("")

  const [selectedSubCategory,setSelectedSubCategory] = useState("")

  const [fieldName ,setFieldName] = useState("")

  const [openAddFields,setOpenMoreFields] = useState(false)

  const allCategory = useSelector(state=>state.product.allCategory)

  const allSubCategory = useSelector(state=>state.product.allSubCategory)

  console.log(allSubCategory);
  

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

  return (
    <section className=''>
      <div className='p-2   bg-white shadow-md flex items-center justify-between'>
        <h2 className='font-semibold'>Upload Product</h2>     
      </div>
      <div className="grid">
        <form className="grid gap-2">
          <div className="grid gap-1">
            <label htmlFor="name">Name</label>
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
            <label htmlFor="name">Description</label>
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
            <p>Image</p>
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
              <label>Category</label>
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
                            <option value={c?._id}>{c.name}</option>
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
              <label>SubCategory</label>
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
                            <option value={c?._id}>{c.name}</option>
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
            <label htmlFor="unit">Unit</label>
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
            <label htmlFor="stock">Number of Stock</label>
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
            <label htmlFor="price">Price</label>
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
            <label htmlFor="discount">Discount</label>
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
          <div 
            onClick={()=>setOpenMoreFields(true)}
            className=" hover:bg-primary-200 bg-white py-1 px-3 w-32 text-center font-semibold border border-primary-200 hover:text-neutral-900 cursor-pointer rounded"
          >
            Add Fields
          </div>
        </form>
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
