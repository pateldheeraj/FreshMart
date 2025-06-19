import React from 'react'
import { priceConverter } from '../utils/priceConverterInRupees'
import { Link } from 'react-router-dom'
import { urlFilter } from '../utils/urlFilter'

export const CardProduct = ({data}) => {
    const url = `/product/${urlFilter(data.name)}-${data._id}`
  return (
    <Link to={url} className='border p-2 py-2 lg:p-4 min-w-36 lg:min-w-52 grid gap:1 lg:gap-3 rounded cursor-pointer bg-white'>
        <div className='min-h-20 w-full max-h-24 lg:max-h-32  rounded overflow-hidden'>
            <img
                src={data.image[0]}
                alt={data.name}
                className='w-full h-full object-scale-down'
             />
        </div>
        <div className='p-[1px] w-fit px-2 text-green-600 text-xs bg-green-50 rounded'>
            10min
        </div>
        <div className='px-2 lg:px-0 text-sm lg:text-base font-medium text-ellipsis line-clamp-2'>
            {data.name}
        </div>
        <div className='w-fit gap-1 px-2 lg:px-0 text-sm lg:text-base'>
            {data.unit}
        </div>
        <div className='flex justify-between items-center gap-1'>
            <div className='font-semibold'>
                {priceConverter(data.price)}
            </div>
            <div className=''>
                <button className='bg-green-600 rounded px-4 py-1 text-white hover:bg-green-800 w-full h-full'>
                    Add
                </button>
            </div>
        </div>
    </Link>
  )
}
