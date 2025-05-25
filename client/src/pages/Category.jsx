import React, { useState } from 'react'
import { CategoryUploadMenu } from '../components/CategoryUploadMenu'

export const Category = () => {
  const [isCategoryUploadMenu,setCategoryUploadMenu] = useState(false)
  return (
    <section>
      <div className='p-2   bg-white shadow-md flex items-center justify-between'>
        <h2 className='font-semibold'>Category</h2>
        <button onClick={()=>setCategoryUploadMenu(true)} className='text-sm border border-primary-200 hover:bg-primary-200 px-3 py-1 rounded'> Add Category</button>
      </div>
      {
        isCategoryUploadMenu && (
          <CategoryUploadMenu close = {()=> setCategoryUploadMenu(false)} />
        )
      }
    </section>
  )
}
