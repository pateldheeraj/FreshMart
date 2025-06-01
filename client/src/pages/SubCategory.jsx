import React, { useState } from 'react'
import { SubcategoryUpload } from '../components/SubcategoryUpload'

export const SubCategory = () => {
  const [openSubcategoryUpload,setOpenSubcategoryUpload] = useState(false)
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
    </section>
  )
}
