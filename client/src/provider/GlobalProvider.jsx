import { createContext,useContext } from "react";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import { useDispatch } from "react-redux";
import { getCartItems } from "../store/cartSlice";
import { useEffect } from "react";
import axios from "axios";
import AxiosToastError from "../utils/AxiosToastError";

const GlobalContext = createContext(null)

const useGlobalContext = ()=> useContext(GlobalContext)

const GlobalProvider = ({children})=>{
    const dispatch = useDispatch()

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
        fetchCartProduct()   
    },[])

    return(
        <GlobalContext.Provider value={{
            fetchCartProduct,
            updateCartItem,
            deleteCartItem
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