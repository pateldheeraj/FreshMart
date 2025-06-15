import React from 'react'

export const CardLoading = () => {
  return (
    <div className='border p-2 max-w-52 grid gap-3 rounded animate-pulse'>
        <div className='min-h-[20] bg-blue-50 rounded'></div>
        <div className='p-3 w-20 bg-blue-50 rounded'></div>
        <div className='p-3 bg-blue-50 rounded'></div>
        <div className='p-3 w-14 bg-blue-50 rounded'></div>
        <div className='flex justify-between items-center gap-3'>
            <div className='p-3 w-20 bg-blue-50 rounded'></div>
            <div className='p-3 w-20 bg-blue-50 rounded'></div>
        </div>
    </div>
  )
}
