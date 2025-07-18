import { useEffect, useState } from 'react'
import { useGlobalContext } from '../provider/GlobalProvider'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import toast from 'react-hot-toast'
import AxiosToastError from '../utils/AxiosToastError'
import { useSelector } from 'react-redux'
import {Loading} from './Loading'
import { FaMinus, FaPlus } from 'react-icons/fa'


const AddToCartButton = ({data}) => {
    const [loading,setLoading] = useState(false)
    const {fetchCartProduct,updateCartItem,deleteCartItem} = useGlobalContext()
    const cartItem = useSelector(state=>state.cartItem.cart)
    const [isItemAvailable, setIsItemAvailable] = useState(false)
    const [qty,setQty] = useState(0) 
    const [cartItemDetails,setCartItemsDetails] = useState()
    
    const handleAddCart = async(e)=>{
        e.preventDefault()
        e.stopPropagation()
        try {
            setLoading(true)
            const response = await Axios({
                ...SummaryApi.addToCart,
                data:{
                    productId : data?._id
                }
            })
            const {data : responseData} = response

            if (responseData.success) {
                toast.success(responseData.message)
                if(fetchCartProduct){
                    await fetchCartProduct()
                }
            }

        } catch (error) {
            AxiosToastError(error)
        }finally{
            setLoading(false)
        }
    }
    
    const increaseQty = async(e) => {
        e.preventDefault()
        e.stopPropagation() 
        console.log(cartItemDetails,qty);
        
        const response = await updateCartItem(cartItemDetails?._id,qty+1)
        console.log(response);
        
        if(response.success){
            toast.success("Item added")
       }
    }
    const decreaseQty = async(e) => {
        e.preventDefault()
        e.stopPropagation()

        if(qty === 1){
            const response = await deleteCartItem(cartItemDetails?._id)
            if(response.success){
                toast.success("Item deleted Successfully")
            }
        } else {
            
            const response = await updateCartItem(cartItemDetails?._id,qty-1)
            if (response.success) {
                toast.success("Item Removed")
            }
        }
    }
    useEffect(()=>{
       const product = cartItem.find(item => item?.productId?._id === data?._id)
        if (product) {
            setIsItemAvailable(true)
            setQty(product.quantity)
            setCartItemsDetails(product)
        } else {
            setIsItemAvailable(false)
            setQty(0)
            setCartItemsDetails(null)
        }
        
    },[data,cartItem])

  return (
    <div className='w-full max-w-[150px]'> 
        {
            isItemAvailable ? (
                <div className='flex w-full h-full min-w-20'>
                    <button onClick={decreaseQty} className='bg-green-600 hover:bg-green-700 text-white flex-1 w-full p-1 rounded flex items-center justify-center'><FaMinus/></button>
                    <p className='flex-1 w-full font-semibold px-1 flex items-center justify-center'>{qty}</p>
                    <button onClick={increaseQty} className='bg-green-600 hover:bg-green-700 text-white flex-1 w-full p-1 rounded flex items-center justify-center'><FaPlus/></button>
                </div>
            ):(
                    <button onClick={handleAddCart} className='bg-green-600 rounded px-4 py-1 text-white hover:bg-green-800 w-full h-full'>
                           {loading ? <Loading/> : "Add"}
                    </button>
            )
        }
        
    </div>
  )
}

export default AddToCartButton