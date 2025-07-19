import { Outlet } from 'react-router-dom'
import './App.css'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { Toaster } from 'react-hot-toast'
import { useEffect } from 'react'
import fetchUserDetails from './utils/fetchUserDetails'
import {setUserDetails} from"./store/userSlice"
import {setAllCategory, setAllSubCategory, setLoadingCategory} from './store/productSlice'
import { useDispatch } from 'react-redux'
import SummaryApi from './common/SummaryApi'
import Axios from './utils/Axios'
import AxiosToastError from './utils/AxiosToastError'
import { getCartItems } from './store/cartSlice'
import GlobalProvider from './provider/GlobalProvider'
import { MobileCart } from './components/MobileCart'

function App() {

  const dispatch = useDispatch()

  const fetchUser = async () => {
    const userdata = await fetchUserDetails()
    dispatch(setUserDetails(userdata?.data)) 
  }

  const fetchCategory = async() =>{
    try {
      dispatch(setLoadingCategory(true))
      const response = await Axios({
        ...SummaryApi.getCategory
      })
      const {data: responseData} = response
      
      if(responseData.success){
        dispatch(setAllCategory(responseData?.data))
      } 
    } catch (error) {
      AxiosToastError(error)
    }finally{
      dispatch(setLoadingCategory(false))
    }
  }

   const fetchSubCategory = async() => {
    try {
      const response = await Axios({
          ...SummaryApi.getSubCategory,
      })
      const { data : responseData } = response
      if (responseData.success) {
        dispatch(setAllSubCategory(responseData?.data))
      }
    } catch (error) {
      AxiosToastError(error)
    } 
  }


  useEffect(()=>{
     fetchUser()
     fetchCategory()
     fetchSubCategory()
    //  fetchCartProduct()
  },[])

  return (
    <GlobalProvider>
        <Header/>
          <main className='min-h-[78vh]'>
                <Outlet/>
          </main>
        <Footer/>
        <Toaster/>
        <MobileCart/>
    </GlobalProvider>
    
  )
}

export default App
