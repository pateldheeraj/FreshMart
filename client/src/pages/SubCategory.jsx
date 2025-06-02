import React, { useEffect, useState } from 'react'
import { SubcategoryUpload } from '../components/SubcategoryUpload'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'

export const SubCategory = () => {
  const [openSubcategoryUpload,setOpenSubcategoryUpload] = useState(false)

  const fetchSubCategory = async() => {
    try {

      const response = await Axios({
          ...SummaryApi.getSubCategory,
      })
      const { data : responseData } = response
      console.log(responseData);
      
    } catch (error) {
      
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

        <div>

        </div>

      {
        openSubcategoryUpload && (
          <SubcategoryUpload close={()=>setOpenSubcategoryUpload(false)}/>
        )
      }
    </section>
  )
}
