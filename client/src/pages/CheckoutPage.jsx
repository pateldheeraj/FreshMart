import React, { useState } from 'react'
import { priceConverter } from '../utils/priceConverterInRupees'
import { useGlobalContext } from '../provider/GlobalProvider'
import { AddAddress } from '../components/AddAddress'
import { useSelector } from 'react-redux'

export const CheckoutPage = () => {
        const { notDiscountTotalPrice, totalPrice ,totalQty} = useGlobalContext()
        const [isAddAddress,setIsAddAddress] = useState(false)
        const addressList = useSelector(state => state.addresses?.addressList)
        const [selectAddress,setSelectAddress] = useState(0)
        
        const handleOnlinePayment = ()=>{

        }
        const handleCashOnDelivery = ()=>{

        }
  return (
    <section className='bg-blue-50'>
        <div className='container mx-auto p-4 bg-amber-300 flex flex-col lg:flex-row gap-5 justify-between' >
            <div className='w-full'>
                {/*Address*/}
                <h3 className='text-lg font-semibold'>Choose your address</h3>
                <div className='bg-white p-2 grid gap-4'>
                     {
                        addressList.map((address, index) => {
                            return (
                            <label htmlFor={"address" + index} className={!address.status && "hidden"}>
                                <div className='border rounded p-3 flex gap-3 hover:bg-blue-50'>
                                <div>
                                    <input id={"address" + index} type='radio' value={index} onChange={(e) => setSelectAddress(e.target.value)} name='address' />
                                </div>
                                <div>
                                    <p>{address.address_line}</p>
                                    <p>{address.city}</p>
                                    <p>{address.state}</p>
                                    <p>{address.country} - {address.pincode}</p>
                                    <p>{address.mobile}</p>
                                </div>
                                </div>
                            </label>
                            )
                        })
                        }
                <div onClick={()=>setIsAddAddress(true)} className='bg-blue-100 h-16 border-2 border-dashed flex items-center justify-center cursor-pointer'>
                    Add address
                </div>
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
            {
                isAddAddress && <AddAddress close={()=>setIsAddAddress(false)}/>
            }
    </section>
  )
}
