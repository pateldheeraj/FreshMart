import { createContext,useContext, useState } from "react";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import { useDispatch, useSelector } from "react-redux";
import { getCartItems } from "../store/cartSlice";
import { useEffect } from "react";
import AxiosToastError from "../utils/AxiosToastError";
import { priceWithDiscount } from "../utils/priceWithDiscount";

const GlobalContext = createContext(null)

const useGlobalContext = ()=> useContext(GlobalContext)

const GlobalProvider = ({children})=>{
    const dispatch = useDispatch()
    const [totalPrice,setTotalPrice] = useState(0)
    const [totalQty,setTotalQty] = useState(0)
    const [notDiscountTotalPrice,setNotDiscountTotalPrice] = useState(0)
    const cartItem = useSelector((state)=> state?.cartItem?.cart)

    const fetchCartProduct = async() => {
        try {
        const response = await Axios({
            ...SummaryApi.getCartProduct,
        })
        const {data : responseData} = response

        if(responseData.success){
           dispatch(getCartItems(responseData?.data))
            
        }
        } catch (error) {
        console.log(error);
        }
    }

    const updateCartItem = async(id,qty) => {
        try {
            const response = await Axios({
                ...SummaryApi.updateCartProduct,
                data : {
                    id : id,
                    qty : qty
                }
            })
            const { data : responseData } = response
            if(responseData.success){
                await fetchCartProduct()
                return responseData
            }
        } catch (error) {
            console.log(error);
            
            AxiosToastError(error)
        }
    } 

    const deleteCartItem = async(_id) => {
        try {
            const response = await Axios({
                ...SummaryApi.deleteCartProduct,
                data : {
                    _id
                }
            })
            const {data : responseData} = response

            if(responseData.success){
                await fetchCartProduct()
                return responseData
            }
        } catch (error) {
            AxiosToastError(error)
        }
    }

    useEffect(()=>{
      const qty =cartItem.reduce((prev,curr)=>{
        return prev + curr.quantity
      },0)
      setTotalQty(qty)
      const tPrice = cartItem.reduce((prev, curr) => {
        const discountedPrice = priceWithDiscount(curr.productId.price, curr.productId.discount);
        return prev + (discountedPrice * curr.quantity);
        }, 0);
        setTotalPrice(tPrice);
        
        const notDiscountPrice = cartItem.reduce((prev,curr)=>{
            return prev + (curr.productId.price * curr.quantity)
        },0)
      setNotDiscountTotalPrice(notDiscountPrice)
    },[cartItem])

    useEffect(()=>{
        fetchCartProduct()   
    },[])

    return(
        <GlobalContext.Provider value={{
            fetchCartProduct,
            updateCartItem,
            deleteCartItem,
            totalPrice,
            totalQty,
            notDiscountTotalPrice
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalProvider
export{
    GlobalContext,
    useGlobalContext
}