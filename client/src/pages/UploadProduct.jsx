import { useState } from "react"
import { FaCloudUploadAlt } from "react-icons/fa";
import { uploadImage } from "../utils/uploadImage";
import {Loading} from '../components/Loading'
import {ViewImage} from '../components/ViewImage'
import { MdDelete } from "react-icons/md";

export const UploadProduct = () => {
  
  const [data,setData] = useState({
    name : "",
    image : [],
    categoryId : [],
    subCategoryId : [],
    unit : "",
    stock : "",
    price : "",
    discount : "",
    description : "",
    more_details : {},
  })

  const [loading,setLoading] = useState(false)

  const [viewImageURL,setViewImageURL] = useState("")

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

        </form>
      </div>
      {
        viewImageURL && <ViewImage url={viewImageURL} close={()=>setViewImageURL("")}/>
      }
    </section>
  )
}
