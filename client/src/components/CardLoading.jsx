import React from 'react'

export const CardLoading = () => {
  return (
    <div className='border py-2 lg:p-4 lg:gap-3 min-w-36 lg:max-w-52 grid gap-1 rounded animate-pulse cursor-pointer bg-white'>
        <div className='min-h-24 bg-blue-50 rounded'></div>
        <div className=' p-2 lg:p-3 w-20 bg-blue-50 rounded'></div>
        <div className=' p-2 lg:p-3 bg-blue-50 rounded'></div>
        <div className=' p-2 lg:p-3 w-14 bg-blue-50 rounded'></div>
        <div className='flex justify-between items-center gap-3'>
            <div className=' p-2 lg:p-3 w-20 bg-blue-50 rounded'></div>
            <div className=' p-2 lg:p-3 w-20 bg-blue-50 rounded'></div>
        </div>
    </div>
  )
}
