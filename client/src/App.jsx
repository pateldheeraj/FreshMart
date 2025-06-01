import { Outlet } from 'react-router-dom'
import './App.css'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { Toaster } from 'react-hot-toast'
import { useEffect } from 'react'
import fetchUserDetails from './utils/fetchUserDetails'
import {setUserDetails} from"./store/userSlice"
import {setAllCategory} from './store/productSlice'
import { useDispatch } from 'react-redux'
import SummaryApi from './common/SummaryApi'
import Axios from './utils/Axios'
import AxiosToastError from './utils/AxiosToastError'

function App() {

  const dispatch = useDispatch()

  const fetchUser = async () => {
    const userdata = await fetchUserDetails()
    dispatch(setUserDetails(userdata?.data)) 
  }

  const fetchCategory = async() =>{
    try {
      const response = await Axios({
        ...SummaryApi.getCategory
      })
      const {data: responseData} = response
      console.log("This is APP.js response",responseData);

      if(responseData.success){
        dispatch(setAllCategory(responseData?.data))
      }
      
    } catch (error) {
      AxiosToastError(error)
    }
  }

  useEffect(()=>{
     fetchUser()
     fetchCategory()
  },[])

  return (
    <>
        <Header/>
          <main className='min-h-[78vh]'>
                <Outlet/>
          </main>
        <Footer/>
        <Toaster/>
    </>
    
  )
}

export default App
