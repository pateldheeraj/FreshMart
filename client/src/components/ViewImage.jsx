import React from 'react'
import { RxCross1} from 'react-icons/rx'

export const ViewImage = ({url,close}) => {
  return (
    <div className='fixed top-0 right-0 left-0 bottom-0 bg-neutral-800/70 flex justify-center items-center z-50 p-4'>
        <div className='w-full max-w-md p-4 max-h-[80vh] bg-white'>
            <button onClick={()=> close()} className='ml-auto w-fit block'>
                <RxCross1 size={25}/>
            </button>
            <img 
                src={url} 
                alt="View full image" 
                className='w-full h-full object-scale-down'
            />
        </div>
    </div>
  )
}
