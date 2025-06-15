import React from 'react'
import { priceConverter } from '../utils/priceConverterInRupees'
import { Link } from 'react-router-dom'
import { urlFilter } from '../utils/urlFilter'

export const CardProduct = ({data}) => {
    const url = `/product/${urlFilter(data.name)}-${data._id}`
  return (
    <Link to={url} className='border p-4 max-w-52 lg:min-w-52 grid gap-3 rounded'>
        <div className='min-h-20 max-h-32  rounded'>
            <img
                src={data.image[0]}
                alt={data.name}
                className='w-full h-full object-scale-down '
             />
        </div>
        <div className='p-[1px] w-fit px-2 text-green-600 text-sm bg-green-50 rounded'>
            10min
        </div>
        <div className='font-medium text-ellipsis line-clamp-2'>
            {data.name}
        </div>
        <div className='w-fit'>
            {data.unit}
        </div>
        <div className='flex justify-between items-center gap-3'>
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
