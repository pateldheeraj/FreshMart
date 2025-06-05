import { useEffect, useState } from 'react'
import { SubcategoryUpload } from '../components/SubcategoryUpload'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import { ShowTable } from '../components/ShowTable'
import { FaPencilAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import {
  createColumnHelper,
} from '@tanstack/react-table'
import AxiosToastError from '../utils/AxiosToastError'
import { ViewImage } from '../components/ViewImage'
import {EditSubCategory} from '../components/EditSubCategory'
import {ConfirmDelete} from '../components/ConfirmDelete'
import toast from 'react-hot-toast'

export const SubCategory = () => {
  const [openSubcategoryUpload,setOpenSubcategoryUpload] = useState(false)
  const columnhelper = createColumnHelper()
  const [data,setData] = useState([])
  const [loading,setLoading] = useState(false)
  const [imageUrl,setImageUrl] = useState("")
  const [openEdit,setOpenEdit] = useState(false)
  const [editData,setEditData] = useState({
    _id : ""
  })
  const [deleteSubData,setDeleteSubdata] = useState({
    _id : ""
  })
  const [openDeleteConfirm , setOpenDeleteConfirm] = useState(false)

  const columns = [
    columnhelper.accessor('name',{
      header : 'Name'
    }),
    columnhelper.accessor('image',{
      header : 'Image',
      cell : ({row}) => {
        return <div className='flex items-center justify-center'>
           <img 
              src={row.original.image} 
              alt={row.original.name}
              className=' w-8 h-8 cursor-pointer'
              onClick={()=>setImageUrl(row.original.image)}
            />
        </div>
      }
    }),
    columnhelper.accessor('category',{
      header : 'Category',
      cell : ({row}) => {
        return (
          <>
            {
              row.original.category.map((c,index)=>(
                <p key={c._id+"table"} className='shadow-sm inline-block px-1'>{c.name}</p>
              ))
            }
          </>
        )
      }
    }),
    columnhelper.accessor('_id',{
      header : "Action",
      cell : ({row}) => {
        return (
          <div className='flex items-center justify-center gap-3'>
            <button onClick={()=>{
              setOpenEdit(true)
              setEditData(row.original)
            }} className='p-2 bg-green-100 rounded-full hover:text-green-600'>
              <FaPencilAlt size={20}/>
            </button>
            <button onClick={()=>{
              setOpenDeleteConfirm(true)
              setDeleteSubdata(row.original)
            }} className='p-2 bg-red-100 rounded-full text-red-400 hover:text-red-600'>
              <MdDelete size={20}/>
            </button>
          </div>
        )
      }
    })
  ]

  const fetchSubCategory = async() => {
    try {
      setLoading(true)
      const response = await Axios({
          ...SummaryApi.getSubCategory,
      })
      const { data : responseData } = response
      if (responseData.success) {
        setData(responseData.data)
      }
    } catch (error) {
      AxiosToastError(error)
    } finally{
      setLoading(false)
    }
  }
  useEffect(()=>{             
    fetchSubCategory()
  },[])

  const handleDeleteSubCategory = async() => {
    try {
      const response = await Axios({
        ...SummaryApi.deleteSubCategory,
        data : deleteSubData
      })
      const {data : deleteSubcategoryData} = response
      if(deleteSubcategoryData.success){
        toast.success(deleteSubcategoryData.message)
        fetchSubCategory()
        setOpenDeleteConfirm(false)
        setDeleteSubdata({
          _id : ""
        })
      }

    } catch (error) {  
      AxiosToastError(error)
    }
  }

  return (
    <section>
      <div className='flex justify-between items-center bg-white shadow-md p-2'>
        <h2 className='font-semibold'>SubCategory</h2>
        <button onClick={()=>{
          setOpenSubcategoryUpload(true)
        }} className=' text-sm border border-primary-200 rounded hover:bg-primary-200 px-3 py-1'>Add SubCategory</button>
      </div>

      {
        openSubcategoryUpload && (
          <SubcategoryUpload fetchData={fetchSubCategory} close={()=>{setOpenSubcategoryUpload(false)}}/>
        )
      }
      <div className='overflow-auto w-full max-w-[95vw]'>
            <ShowTable data={data} columns ={columns}/>
      </div>

      {
        imageUrl && <ViewImage url={imageUrl} close={()=>setImageUrl("")} />
      }

      {
        openEdit && <EditSubCategory fetchData={fetchSubCategory} data={editData} close={()=>setOpenEdit(false)}/>
      }

      {
        openDeleteConfirm && (
          <ConfirmDelete 
            cancel={()=>setOpenDeleteConfirm(false)} 
            close={()=>setOpenDeleteConfirm(false)}
            confirm={handleDeleteSubCategory}
          />
        )
      }
    </section>
  )
}
