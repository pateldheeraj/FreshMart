import React, { useEffect, useState } from 'react'
import { SubcategoryUpload } from '../components/SubcategoryUpload'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import { ShowTable } from '../components/ShowTable'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import AxiosToastError from '../utils/AxiosToastError'

export const SubCategory = () => {
  const [openSubcategoryUpload,setOpenSubcategoryUpload] = useState(false)
  const columnhelper = createColumnHelper()
  const [data,setData] = useState([])
  const [loading,setLoading] = useState(false)

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
        className=' w-8 h-8'
        />
        </div>
      }
    }),
    columnhelper.accessor('category',{
      header : 'Category'
    }),
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
          <SubcategoryUpload close={()=>setOpenSubcategoryUpload(false)}/>
        )
      }
      <div className='overflow-auto w-full max-w-[95vw]'>
            <ShowTable data={data} columns ={columns}/>
      </div>


    </section>
  )
}
