import React from 'react'
import { priceConverter } from '../utils/priceConverterInRupees'
import { useGlobalContext } from '../provider/GlobalProvider'

export const CheckoutPage = () => {
        const { notDiscountTotalPrice, totalPrice ,totalQty} = useGlobalContext()
        const handleOnlinePayment = ()=>{

        }
        const handleCashOnDelivery = ()=>{

        }
  return (
    <section className='bg-blue-50'>
        <div className='container mx-auto p-4 bg-amber-300 flex flex-row gap-5 justify-between' >
            <div className='w-full'>
                {/*Address*/}
                <h3 className='text-lg font-semibold'>Choose your address</h3>
                <div className='bg-blue-100 h-16 border-2 border-dashed flex items-center justify-center cursor-pointer'>
                    Add address
                </div>
            </div>

            <div className='bg-white py-4 px-2 w-full max-w-md '>
                <h3 className='font-semibold'>Summary</h3>
                <div className='flex gap-4 justify-between ml-1'>
                    <p>Items total</p>
                    <p className='flex items-center gap-2'><span className='line-through text-neutral-400'>{priceConverter(notDiscountTotalPrice)}</span><span>{priceConverter(totalPrice)}</span></p>
                </div>
                <div className='flex gap-4 justify-between ml-1'>
                    <p>Quntity total</p>
                    <p className='flex items-center gap-2'>{totalQty} item</p>
                </div>
                <div className='flex gap-4 justify-between ml-1'>
                    <p>Delivery Charge</p>
                    <p className='flex items-center gap-2'>Free</p>
                </div>
                <div className='font-semibold flex items-center justify-between gap-4'>
                    <p >Grand total</p>
                    <p>{priceConverter(totalPrice)}</p>
                </div>

                <div className='w-full flex flex-col gap-4'>
                    <button className='py-2 px-4 bg-green-600 hover:bg-green-700 rounded text-white font-semibold' onClick={handleOnlinePayment}>Online Payment</button>

                    <button className='py-2 px-4 border-2 border-green-600 font-semibold text-green-600 hover:bg-green-600 hover:text-white' onClick={handleCashOnDelivery}>Cash on Delivery</button>
                </div>
            </div>
        </div>
    </section>
  )
}
