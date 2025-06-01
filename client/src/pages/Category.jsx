import { useEffect, useState } from 'react'
import { CategoryUploadMenu } from '../components/CategoryUploadMenu'
import { Loading } from '../components/Loading'
import { NoData } from '../components/NoData'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import  EditCategory from '../components/EditCategory'
import { ConfirmDelete } from '../components/ConfirmDelete'
import toast from 'react-hot-toast'
import AxiosToastError from '../utils/AxiosToastError'
import { useSelector } from 'react-redux'

export const Category = () => {

  const [isCategoryUploadMenu,setCategoryUploadMenu] = useState(false)

  const [loading,setLoading] = useState(false)

  const [openEdit,setOpenEdit] = useState(false)

  const [openDelete,setOpenDelete] = useState(false)

  const [categoryData,setCategoryData] = useState([])

  const [editData,setEditData] = useState({
    name : "",
    image : ""
  })

  const [deleteData,setDeleteData] = useState({
    _id : ""
  })


  const handleConfirmDelete = async() => {
    try {
      const response = await Axios({
        ...SummaryApi.deleteCategory,
        data : deleteData
      })

      const {data : responseData} = response

      console.log(responseData,response);
      

      if(responseData.success){
        toast.success(responseData.message)
        fetchData()
        setOpenDelete(false)
      }

    } catch (error) {
      AxiosToastError(error)
    }
  }

  const fetchData = async() =>{
      try {
        setLoading(true)
        const response = await Axios({
          ...SummaryApi.getCategory
        })
        const {data: responseData} = response
        console.log(responseData);

        if(responseData.success){
          setCategoryData(responseData.data)
        }
        

      } catch (error) {
        AxiosToastError(error)
      }finally{
        setLoading(false)
      }
    }

  return (
    <section className=''>
      <div className='p-2   bg-white shadow-md flex items-center justify-between'>
        <h2 className='font-semibold'>Category</h2>
        <button onClick={()=>setCategoryUploadMenu(true)} className='text-sm border border-primary-200 hover:bg-primary-200 px-3 py-1 rounded'> Add Category</button>
      </div>

      {
        !categoryData[0] && !loading && (
          <NoData/>
        )
      }
         <div className='p-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2'>
          {
             categoryData.map((category,index)=>{
              return (
                  <div key={category._id} className='w-32 h-56 rounded shadow-md'>
                    <img 
                      src={category.image}
                      alt={category.name} 
                      className='w-full object-scale-down'
                      />
                      <div className='items-center h-9 flex gap-2'>
                        <button className='flex-1 bg-green-100 hover:bg-green-200 text-green-600 font-medium py-1 rounded'
                        onClick={()=>{
                          setOpenEdit(true)
                          setEditData(category)
                        }}
                        >
                          Edit
                        </button>
                        <button className='flex-1 bg-red-100 hover:bg-red-200 text-red-600  font-medium py-1 rounded'
                          onClick={()=>{
                            setOpenDelete(true)
                            setDeleteData(category)
                            }}
                        >
                          Delete
                        </button>
                      </div>
                  </div>
                )
          })
          }
      </div>
       
      {
        loading && (
         <Loading/>
        )
      }

      {
        isCategoryUploadMenu && (
          <CategoryUploadMenu fetchCategory={fetchData} close = {()=> setCategoryUploadMenu(false)} />
        )
      }

      {
        openEdit && (
          <EditCategory data={editData} close = {()=>setOpenEdit(false)} fetchCategory={fetchData} />
        )
      }

      {
        openDelete && (
          <ConfirmDelete 
          close={()=>setOpenDelete(false)}
          cancel={()=>setOpenDelete(false)}
          confirm={handleConfirmDelete}
          />
        )
      }
      
    </section>
  )
}
